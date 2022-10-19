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
        <div className="flex w-full h-full overflow-auto">
            <Info data={data} />
            <div className="min-h-full mx-auto my-auto flex flex-col justify-center">
                <div className="min-h-full flex items-start space-x-8 mx-auto my-auto pt-16 p-5">
                    {data.seating?.map((block, blockIndex) => (
                        <div
                            key={blockIndex}
                            className="flex flex-col space-y-2"
                        >
                            {block?.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex space-x-2">
                                    {row?.map((cell, cellIndex) => (
                                        <Cell
                                            key={cellIndex}
                                            passenger={cell}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Seats;
