import React, { createRef } from 'react';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from '../../button';

interface CropComponentProps {
    imageSrc: string;
    onConfirm: (croppedImage: string) => void;
    onCancel: () => void
}

export const Demo: React.FC<CropComponentProps> = ({ imageSrc, onCancel, onConfirm }) => {
    const cropperRef = createRef<ReactCropperElement>();

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            onConfirm(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
    };

    return (
        <div className="min-h-96 flex flex-col sm:p-4">
            <h2 className="font-semibold">
                Crop your picture
            </h2>
            <div className="w-full my-6">
                <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={1}
                    aspectRatio={1}  
                    src={imageSrc}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={false}
                />
            </div>
            <div className="flex space-x-4 sm:w-96 w-full mx-auto mt-auto">
                <Button variant="secondary" onClick={onCancel} fullWidth>Cancel</Button>
                <Button variant="primary" onClick={getCropData} fullWidth>Confirm</Button>
            </div>
        </div>
    );
};

export default Demo;
