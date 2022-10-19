import React from "react";

const Cell = ({ passenger }) => {
    const color = passenger ? "bg-green-300" : "bg-gray-500";
    return (
        <div className={`w-12 h-12 flex justify-center items-center ${color}`}>
            {passenger}
        </div>
    );
};

export default Cell;
