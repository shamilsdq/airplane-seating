import React, { useState } from "react";

import seatingApi from "../../apis/seating";

import Form from "./Form";
import Seats from "./Seats";

const Home = () => {
    const [seatingData, setSeatingData] = useState();

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const data = await seatingApi.generateSeating(values);
            setSeatingData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="h-screen w-screen flex">
            <section className="flex-auto overflow-auto">
                <Form onSubmit={handleSubmit} />
            </section>
            <section className="w-2/3 flex-auto bg-gray-200 overflow-auto">
                <Seats seating={seating} />
            </section>
        </div>
    );
};

export default Home;
