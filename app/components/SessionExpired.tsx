import React from "react";

const SessionExpired = () => {
  const handleLoginRedirect = () => {
    location.href = "/signin";
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center h-screen w-full bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md text-center">
        <h1 className="text-2xl font-bold mb-4">Session Expired</h1>
        <p className="mb-6">
          Your session has expired. Please log in again to continue.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpired;
