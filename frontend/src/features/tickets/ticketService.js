import axios from "axios";

const API_URL = "/api/tickets/";

//Get user tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

const ticketService = {
    getTickets
};

export default ticketService;
