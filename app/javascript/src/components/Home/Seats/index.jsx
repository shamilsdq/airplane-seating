import React from "react";

import Loader from "./Loader";
import Empty from "./Empty";
import Cell from "./Cell";
import Info from "./Info";

const Seats = ({ data, isLoading }) => {
    if (isLoading) {
        return <Loader />;
    } else if (!data) {
        return <Empty />;
    }

    return (
        <div className="w-full h-full flex justify-center items-center overflow-auto relative">
            <Info data={data} />

            <div className="flex items-start space-x-8 mt-16 w-full h-full p-5">
                {data.seating?.map((block, blockIndex) => (
                    <div key={blockIndex} className="flex flex-col space-y-2">
                        {block?.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex space-x-2">
                                {row?.map((cell, cellIndex) => (
                                    <Cell key={cellIndex} passenger={cell} />
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Seats;
