import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm6-5.291a4 4 0 11-8 0 4 4 0 018 0zm6 0a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4z"
        />
      </svg>
      <span className="text-white text-xl">Loading...</span>
    </div>
  );
}

export default Loading;
