import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

const GetAllReview = () => {
    const API_URL = "/ReviewPeriod/getAllReviewPeriod";

    const token = localStorage.getItem("token");
    return axios.get(API_URL, {
        baseURL: API_BASE_URL,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    });
};

export default GetAllReview;
