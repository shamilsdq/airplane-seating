import React, { useState } from "react";
import Form from "./Form";

const Home = () => {
    const [seating, setSeating] = useState();

    const handleSubmit = () => {
        setSeating([]);
    };

    return (
        <div className="h-screen w-screen flex">
            <section className="w-1/3 flex-auto">
                <Form onSubmit={handleSubmit} />
            </section>
            <section className="w-2/3 flex-auto bg-gray-200 overflow-auto">
                <Seats seating={seating} />
            </section>
        </div>
    );
};

export default Home;
