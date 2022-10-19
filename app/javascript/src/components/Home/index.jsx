import React, { useState } from "react";

import seatingApi from "../../apis/seating";

import Form from "./Form";
import Seats from "./Seats";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [seatingData, setSeatingData] = useState();

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        setIsLoading(true);
        try {
            const data = await seatingApi.generateSeating(values);
            setSeatingData(data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="h-screen w-screen flex">
            <section className="flex-auto overflow-auto">
                <Form onSubmit={handleSubmit} />
            </section>
            <section className="w-2/3 flex-auto flex bg-gray-200 overflow-auto">
                <Seats data={seatingData} isLoading={isLoading} />
            </section>
        </div>
    );
};

export default Home;
