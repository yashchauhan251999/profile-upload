import { useState, useRef, useEffect, memo } from 'react';
import { useModal } from "../context";

import uploadIcon from '../../../assets/upload.svg';
import closeIcon from '../../../assets/close.svg';
import FileViewer from './file-viewer';
import { axiosInstance as axios, useAxiosLoader } from '../../../axiosInstacne';
import Crop from './crop';
import { useProfile } from '../../../context/profileContext';
import { addtoFileState, addUploadStatus, removeUploadStatus, uploadFile, urlToFile } from '../../../utils';
import { FileResource } from './types';
interface ImageUploaderProps {
    maxFiles?: number;
    maxSizeMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = memo(({ maxFiles = 5, maxSizeMB = 5 }) => {
    const [error, setError] = useState({ message: "", description: "" });

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { closeModal } = useModal();

    const [files, setFiles] = useState<FileList | null>(null);

    // const [loading, setLoading] = useState(false);

    const loading = useAxiosLoader()

    const toUrl = (index: number) => URL.createObjectURL([...(files as FileList)][index]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [uploadStatus, setUploadStatus] = useState<File[]>([]);

    const { setProfile } = useProfile();

    const handleOnSelect = (index: number) => {
        setProfile(toUrl(index));
        closeModal();
    }

    const handleUpload = (fileList: FileList) => {
        [...fileList].map(file => {
            addUploadStatus(file, setUploadStatus);
            uploadFile(file).then((uploadedFile) => {
                addtoFileState(uploadedFile, setFiles);
            }).then(() => {
                removeUploadStatus(file, setUploadStatus);
            })
        });
    }

    useEffect(() => {
        axios.get('/images').then(({ data }) => {
            setFiles(null);
            return data;
        }).then(data => {
            return Promise.all<File>(data.map((file: FileResource) => {
                return urlToFile(`${import.meta.env.VITE_image_service}/image/${file.id}`, file.id).then(file => {
                    addtoFileState(file as File, setFiles);
                })
            }))
        })
    }, []);

    // useEffect(() => {
    //     const newUploadStatus = { ...uploadStatus };
    //     files && [...files].forEach(file => {
    //         newUploadStatus[file.name] = newUploadStatus[file.name] || 0;
    //     });
    // }, [files]);

    useEffect(() => {
        if (files && files.length > maxFiles) {
            setError({ message: `You may only upload up to ${maxFiles} images.`, description: "Remove one or more to upload more images." });
            return;
        }
        setError({ message: "", description: "" });
    }, [files, maxFiles]);

    const handleFiles = (files: FileList) => {
        const invalidFiles = Array.from(files).filter(file => file.size > maxSizeMB * 1024 * 1024);
        if (invalidFiles.length > 0) {
            setError({
                message: `Each image must be smaller than ${maxSizeMB}MB.`,
                description: 'reduce file size and then try again'
            });
            return;
        }
        setError({ message: "", description: "" });
        handleUpload(files);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDelete = (index: number) => {
        if (files) {
            const file = [...files][index];
            axios.delete(`/image/${file.name}`).then(() => {
                const newFiles = new DataTransfer();
                Array.from(files)
                    .filter((_, i) => i !== index)
                    .forEach((file) => newFiles.items.add(file));
                setFiles(newFiles.files);
            });
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const [isCropMode, setIsCropMode] = useState(false);

    const [cropIndex, setCropIndex] = useState(0);

    const onCrop = (image: string) => {
        fetch(image)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], [...(files as FileList)][cropIndex].name, { type: "image/png" })
                const newFiles = new DataTransfer();
                if (files) {
                    Array.from(files)
                        .forEach((oldFile, index) => {
                            newFiles.items.add(index === cropIndex ? file : oldFile)
                        });
                    setFiles(newFiles.files);
                    setIsCropMode(false);
                }
            });
    }

    if (isCropMode) {
        return <Crop
            onConfirm={onCrop} imageSrc={toUrl(cropIndex)}
            onCancel={() => setIsCropMode(false)}
        />
    }

    return (
        <div className="flex flex-col sm:p-4">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-xl">Upload image(s)</h2>
                <button onClick={closeModal} className="text-gray-950 hover:text-gray-800">
                    <img src={closeIcon} alt="" />
                </button>
            </div>
            <p className="mt-1 mb-4 text-left text-gray-500 text-sm">You may upload up to {maxFiles} images</p>
            {
                error.message
                    ?
                    <div
                        className="mt-4 w-full bg-gray-100 border border-gray-300 h-20 border-1 flex flex-col rounded items-center justify-center cursor-pointer"
                    >
                        <p className="mt-2 text-red-500">{error.message}</p>
                        <p className="mt-2 text-sm text-gray-500">{error.description}</p>
                    </div>
                    :
                    <div
                        className="mt-4 w-full bg-gray-100  h-40 border-1  border-gray-400 rounded flex items-center justify-center cursor-pointer"
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            multiple
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            disabled={loading}
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                                if (e.target.files) handleFiles(e.target.files);
                            }}
                        />
                        <div className="text-center flex flex-col items-center">
                            <img src={uploadIcon} alt="" className={`text-center h-12 w-12 ${loading ? 'animate-bounce' : ''}`} />
                            {
                                loading ?
                                    <p className='text-gray-600 text-sm'>
                                        Loading...
                                    </p>
                                    :
                                    <>
                                        <p className="mt-2 text-gray-600">Click or drag and drop to upload</p>
                                        <p className="text-sm text-gray-500 ">PNG, or JPG (Max {maxSizeMB}MB)</p>
                                    </>
                            }
                        </div>
                    </div>
            }
            <FileViewer
                uploadStatus={uploadStatus}
                files={files}
                onCrop={(index) => { setIsCropMode(true), setCropIndex(index) }}
                onSelect={handleOnSelect}
                onDelete={handleDelete}
                onCancel={() => { setFiles(null) }}
                loading={loading}
            />
        </div>
    );
});

export default ImageUploader;