
import React, { useState, useCallback } from 'react';
import { generateImages, generatePrompts } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageGallery from './components/ImageGallery';
import Spinner from './components/Spinner';

const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [currentPrompts, setCurrentPrompts] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (file: File) => {
        setOriginalImage(file);
        setGeneratedImages([]);
        setCurrentPrompts([]);
        setError(null);
        const reader = new FileReader();
        reader.onloadend = () => {
            setOriginalImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleGenerateClick = useCallback(async () => {
        if (!originalImage) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);
        setCurrentPrompts([]);

        try {
            setLoadingMessage("Generating creative ideas...");
            const newPrompts = await generatePrompts();
            setCurrentPrompts(newPrompts);

            setLoadingMessage("AI is creating new realities...");
            const newImages = await generateImages(originalImage, newPrompts);
            setGeneratedImages(newImages);
        } catch (err) {
            console.error(err);
            const message = err instanceof Error ? err.message : "An unknown error occurred";
            setError(`Failed to generate images. ${message}. Please try again later.`);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [originalImage]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <p className="text-center text-lg text-gray-400 mb-8 max-w-2xl">
                        Upload your photo and let our AI create five stunning new versions. Your face and figure are preserved while we transform the world around you.
                    </p>

                    <ImageUploader onImageUpload={handleImageUpload} imagePreview={originalImagePreview} />

                    {error && (
                        <div className="mt-6 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div className="mt-8">
                        <button
                            onClick={handleGenerateClick}
                            disabled={!originalImage || isLoading}
                            className="px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-indigo-600/30"
                        >
                            {isLoading ? 'Generating...' : '✨ Generate New Personas'}
                        </button>
                    </div>

                    {isLoading && (
                        <div className="mt-12 text-center w-full flex flex-col items-center">
                           <Spinner />
                           <p className="text-gray-400 mt-4 animate-pulse">{loadingMessage}</p>
                        </div>
                    )}
                    
                    {generatedImages.length > 0 && !isLoading && (
                       <ImageGallery originalImage={originalImagePreview} generatedImages={generatedImages} prompts={currentPrompts} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
