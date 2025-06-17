import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="relative w-12 h-12">
            {/* Background circle */}
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            {/* Spinning circle */}
            <div className="absolute inset-0 border-4 border-transparent border-t-[#2196F3] rounded-full animate-[spin_1s_linear_infinite]"></div>
        </div>
    );
};

export default Loader; 