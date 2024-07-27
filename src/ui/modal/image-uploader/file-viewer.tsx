import React, { useState, useMemo } from 'react';
import Radio from '../../radio';
import Button from '../../button';
import { useModal } from "../../modal/context";
import cropIcon from '../../../assets/crop.svg';
import closeIcon from '../../../assets/close.svg';
import deleteIcon from '../../../assets/delete.svg';
import ProgressBar from '../../progress-bar';

interface FileListProps {
    files: FileList | null;
    onCrop: (index: number) => void;
    onDelete: (index: number) => void;
    onSelect: (index: number) => void;
    onCancel: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadStatus: File[];
    loading: boolean;
}

const FileList: React.FC<FileListProps> = ({ files, onCrop, onDelete, onSelect, onCancel, uploadStatus, loading }) => {
    const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
    const { closeModal } = useModal();

    const hasFiles = useMemo(() => {
        return Boolean(files && Array.from(files).length)
    }, [files])

    const handleCancel = () => {
        onCancel();
        closeModal();
    }

    return (
        <div className="w-full">
            <ul className="divide-y divide-gray-200 overflow-y-auto max-h-[12rem]">
                {files && Array.from(files).map((file, index) => (
                    <li key={file.name} className="p-4 flex items-center text-gray-600">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-20 h-20 rounded object-cover"
                            onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                        />

                        <div className="ml-4 flex-1">
                            <div className="sm:w-48 w-32 overflow-hidden whitespace-nowrap text-ellipsis">
                                <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            </div>

                            <div className="text-sm text-gray-500 mb-2">{(file.size / 1024).toFixed(1)}KB</div>

                            {
                                // uploadStatus?.find(_ => _ === file.name) ?
                                //     <ProgressBar fileName={file.name}
                                //         duration={parseInt("" + Math.random() * 10)} />
                                //     :
                                <div className="flex space-x-2 text-sm">
                                    <button onClick={() => onCrop(index)} className="hover:underline flex items-center space-x-2"><img src={cropIcon} alt="" /> <span className="lg:block hidden text-nowrap">Crop Image</span> </button>
                                    <span>•</span>
                                    <button onClick={() => onDelete(index)} className="hover:underline flex items-center space-x-2"><img src={deleteIcon} alt="" /> <span className="lg:block hidden text-nowrap">Delete Image</span>  </button>
                                </div>
                            }
                        </div>
                        {
                            // uploadStatus?.find(_ => _ === file.name) ?
                            //     <div onClick={() => onDelete(index)}>
                            //         <img src={closeIcon} alt="" />
                            //     </div>
                            //     :
                            <Radio name="selectedFile" value={String(index)} checked={selectedFileIndex === index} onChange={() => setSelectedFileIndex(index)} />
                        }
                    </li>
                ))}

                {uploadStatus.map((file, index) => (
                    <li key={file.name} className="p-4 flex items-center text-gray-600">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-20 h-20 rounded object-cover"
                            onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                        />
                        <div className="ml-4 flex-1">

                            <div className="text-sm text-gray-500 mb-2">{(file.size / 1024).toFixed(1)}KB</div>
                            {
                                <ProgressBar fileName={file.name}
                                    duration={parseInt("" + Math.random() * 10)} />

                            }
                        </div>
                        {
                            <div onClick={() => onDelete(index)}>
                                <img src={closeIcon} alt="" />
                            </div>
                        }
                    </li>
                ))}

            </ul>
            {
                hasFiles &&
                <div className="p-4 flex justify-between space-x-4">
                    <Button fullWidth variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button fullWidth
                        disabled={loading}
                        onClick={() => onSelect(selectedFileIndex)}
                        variant="primary">
                        Select image
                    </Button>
                </div>
            }
        </div>
    );
};

export default FileList;