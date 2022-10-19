import React, { useState } from "react";

const Info = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <div className="absolute top-0 right-0 p-3 flex flex-col gap-3 items-end">
            <button
                onClick={toggleExpanded}
                className="bg-gray-800 text-white px-4 py-2 text-sm"
            >
                {isExpanded ? "HIDE INFO" : "SHOW INFO"}
            </button>

            {isExpanded && (
                <ul className="bg-white rounded border shadow-md py-5 space-y-3">
                    <li className="flex justify-between px-5">
                        <span className="mr-5">Remaining seats</span>
                        <span>{data.remaining_seats}</span>
                    </li>
                    <li className="flex justify-between px-5">
                        <span className="mr-5">Remaining people</span>
                        <span>{data.remaining_people}</span>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Info;
