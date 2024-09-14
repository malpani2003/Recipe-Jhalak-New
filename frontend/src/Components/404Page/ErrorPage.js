// src/Components/404Page/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold text-red-600">Oops!</h1>
        <p className="mt-3 text-gray-700">
          It seems there was an issue with the server. Please try again later.
        </p>
        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
