import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

const GetAllReviewDetailByUserId = (userid: number | undefined) => {
    const token = localStorage.getItem("token");
    const API_URL = `/ReviewResult/getAllReviewDetailByUserId`;

    return axios.get(API_URL, {
        baseURL: API_BASE_URL,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
        params: {
            id: userid,
        },
    });
};

export default GetAllReviewDetailByUserId;
