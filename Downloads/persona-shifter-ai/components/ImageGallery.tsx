
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ImageGalleryProps {
    originalImage: string | null;
    generatedImages: string[];
    prompts: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ originalImage, generatedImages, prompts }) => {
    return (
        <div className="mt-16 w-full">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 mr-3 text-purple-400" />
                Your New Personas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {originalImage && (
                     <div className="rounded-xl overflow-hidden shadow-lg border-2 border-indigo-500/50">
                        <img src={originalImage} alt="Original" className="w-full h-auto object-cover" />
                        <div className="p-4 bg-gray-800">
                            <h3 className="font-bold text-lg">Original Photo</h3>
                        </div>
                    </div>
                )}
                {generatedImages.map((image, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-lg border border-gray-700 group">
                        <img src={image} alt={`Generated ${index + 1}`} className="w-full h-auto object-cover" />
                         <div className="p-4 bg-gray-800">
                            <h3 className="font-bold text-lg text-gray-200">Persona #{index + 1}</h3>
                            <p className="text-sm text-gray-400 mt-1 truncate group-hover:whitespace-normal">{prompts[index]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
