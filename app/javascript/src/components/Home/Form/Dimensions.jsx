import React from "react";
import { FieldArray, useFormikContext } from "formik";

import Input from "./Input";
import { NEW_DIMENSION } from "./constants";

const Dimensions = () => {
    const { values } = useFormikContext();

    return (
        <FieldArray
            name="dimensions"
            render={(helper) => (
                <div className="flex flex-col border rounded">
                    <h4 className="border-b p-5 font-semibold">SEAT BLOCKS</h4>
                    {values.dimensions.map((_, index) => (
                        <div className="flex gap-5 items-end border-b p-3 pb-5">
                            <Input
                                name={`dimensions.${index}.rows`}
                                type="number"
                                label="Rows"
                            />
                            <Input
                                name={`dimensions.${index}.columns`}
                                type="number"
                                label="Columns"
                            />
                            <button
                                type="button"
                                onClick={() => helper.remove(index)}
                                className="px-4 py-2 rounded bg-gray-200 text-red-500 hover:bg-gray-400 border"
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={() => helper.push({ ...NEW_DIMENSION })}
                        className="m-5 bg-gray-200 py-2 px-6 rounded hover:bg-gray-400 border"
                    >
                        Add new Seat block
                    </button>
                </div>
            )}
        />
    );
};

export default Dimensions;
