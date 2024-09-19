import React from 'react';

function Newsletter() {
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Deliciousness to Your Inbox</h1>
      <p className="text-lg mb-6 text-center text-gray-600">Enjoy weekly handpicked recipes and recommendations.</p>
      <form className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email address"
          className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
