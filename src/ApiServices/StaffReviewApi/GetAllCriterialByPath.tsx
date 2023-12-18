import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

const GetAllReview = (pathid: number) => {
    const API_URL = "/CriteriaByCapacity/getAllCriterialByPath";

    const token = localStorage.getItem("token");
    return axios.get(API_URL, {
        baseURL: API_BASE_URL,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
        params: {
            pathid: pathid,
        },
    });
};

export default GetAllReview;
