import React from 'react';
import { CircularProgress } from '@mui/material';
import { FaSpinner } from 'react-icons/fa';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 fixed top-0 left-0 z-10 w-full h-full">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <FaSpinner className="text-5xl text-blue-500 animate-spin" />
                </div>
                <div>
                    Please wait...
                </div>
            </div>
        </div>
    );
};

export default Loading;
