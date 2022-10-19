import React from "react";

const Block = ({ data }) => (
    <div className="flex flex-col space-y-2">
        {data?.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-2">
                {row?.map((cell, cellIndex) => {
                    const color = cell ? "bg-green-300" : "bg-gray-500";
                    return (
                        <div
                            key={cellIndex}
                            className={`w-12 h-12 flex justify-center items-center ${color}`}
                        >
                            {cell}
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
);

export default Block;
