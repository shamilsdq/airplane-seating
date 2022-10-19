const BASE_URL = "http://127.0.0.1:3000/api/";

const generateSeating = async (payload) => {
    const url = `${BASE_URL}/seating`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return response.json();
};

const seatingApi = { generateSeating };

export default seatingApi;
