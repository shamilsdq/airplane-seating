import { Field } from "formik";
import React from "react";

const Input = ({ name, type, label }) => (
    <Field name={name}>
        {({ field }) => (
            <div className="flex flex-col gap-1">
                <label htmlFor={name} className="ml-2 text-gray-600">
                    {label}
                </label>
                <input
                    id={name}
                    type={type}
                    {...field}
                    className="px-4 py-2 rounded border w-full"
                />
            </div>
        )}
    </Field>
);

export default Input;
