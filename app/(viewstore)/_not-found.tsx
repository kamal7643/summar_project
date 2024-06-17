import React from 'react';
import { Button } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';

const NotFound: React.FC = () => {
  
    const handleGoHome = () => {
      location.href="/";
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AiOutlineHome />} 
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  };
  
  export default NotFound;