
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    imagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    
    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImageUpload(file);
        }
    }, [onImageUpload]);

    return (
        <div className="w-full max-w-lg">
            <label 
                htmlFor="image-upload" 
                className={`flex justify-center items-center w-full h-64 px-4 transition bg-gray-800 border-2 ${isDragging ? 'border-indigo-400' : 'border-gray-600'} border-dashed rounded-xl cursor-pointer hover:border-indigo-500 relative overflow-hidden group`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {imagePreview ? (
                    <>
                        <img src={imagePreview} alt="Preview" className="object-cover w-full h-full rounded-lg" />
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <UploadIcon className="w-10 h-10 text-white mb-2" />
                             <span className="text-lg font-semibold text-white">Choose a different photo</span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <UploadIcon className="w-12 h-12 mb-3"/>
                        <span className="font-semibold text-lg">Click to upload or drag & drop</span>
                        <p className="text-sm">PNG, JPG, or WEBP</p>
                    </div>
                )}
                <input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </label>
        </div>
    );
};

export default ImageUploader;
