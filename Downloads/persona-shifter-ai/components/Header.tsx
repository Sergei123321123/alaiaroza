
import React from 'react';
import { CameraIcon } from './icons/CameraIcon';

const Header: React.FC = () => {
    return (
        <header className="py-6 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
            <div className="container mx-auto px-4 flex items-center justify-center">
                <CameraIcon className="w-10 h-10 text-indigo-400 mr-4" />
                <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                    Persona Shifter AI
                </h1>
            </div>
        </header>
    );
};

export default Header;
