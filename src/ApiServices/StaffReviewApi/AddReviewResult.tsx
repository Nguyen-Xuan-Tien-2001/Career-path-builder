import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

interface IReviewResult {
    assessmenttime: string;
    reviewresult: number;
    reviewid?: number;
    userid?: number;
}

const AddReviewResult = (data: IReviewResult) => {
    const token = localStorage.getItem("token");
    const API_URL = `/ReviewResult/addReviewResult`;

    return axios.post(API_URL, data, {
        baseURL: API_BASE_URL,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    });
};

export default AddReviewResult;
