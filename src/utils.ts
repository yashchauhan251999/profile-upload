import { axiosInstance as axios } from "./axiosInstacne";

export async function urlToFile(url: string, id: number): Promise<File | undefined> {
    try {
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = response.data as Blob;
        return new File([blob], id.toString(), { type: blob.type });
    } catch (error) {
        console.error('Error fetching file:', error);
    }
}

function renameFile(originalFile: File, newName: string) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified
    });
}

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    return axios.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((res => {
        return renameFile(file, res.data.id);
    }));
};

export const addUploadStatus = (file: File, setUploadStatus: React.Dispatch<React.SetStateAction<File[]>>) => {
    setUploadStatus(old => [...old, file]);
}


export const removeUploadStatus = (file: File, setUploadStatus: React.Dispatch<React.SetStateAction<File[]>>) => {
    setUploadStatus(old => old.filter(_ => _.name !== file.name));
}


export const addtoFileState = (file: File, setFiles: React.Dispatch<React.SetStateAction<FileList | null>>) => {
    setFiles(
        oldFiles => {
            const newFiles = new DataTransfer();
            [...(oldFiles || []), file].forEach((file) => newFiles.items.add(file));
            return newFiles.files
        }
    );
}