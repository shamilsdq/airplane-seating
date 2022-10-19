import React from "react";
import { Formik } from "formik";

import Input from "./Input";
import Dimensions from "./Dimensions";

import { INITIAL_FORM_VALUES } from "./constants";

const Form = ({ onSubmit }) => {
    return (
        <Formik onSubmit={onSubmit} initialValues={INITIAL_FORM_VALUES}>
            {({ handleSubmit, isSubmitting }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 max-w-md mx-auto p-5 my-5"
                >
                    <Input
                        type="number"
                        name="count"
                        label="number of people"
                    />
                    <Dimensions />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
                    >
                        Generate Seating
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default Form;
