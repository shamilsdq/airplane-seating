import React from "react";

const Loader = () => (
    <div className="w-full h-full flex space-x-4 justify-center items-center animate-pulse">
        <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
    </div>
);

export default Loader;
