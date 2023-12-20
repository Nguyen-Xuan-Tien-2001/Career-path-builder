import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://localhost:44349/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default httpClient;
