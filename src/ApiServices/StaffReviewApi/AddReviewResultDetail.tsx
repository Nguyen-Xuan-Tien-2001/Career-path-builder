import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

interface IReviewResultDetail {
    accessorid: number;
    criteriaid: number;
    note: string;
    point: number;
    reviewresultid: number;
}

const AddReviewResultDetail = (data: IReviewResultDetail[]) => {
    const token = localStorage.getItem("token");
    const API_URL = `/ReviewResultDetail/addReviewResultDetail`;

    return axios.post(API_URL, data, {
        baseURL: API_BASE_URL,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    });
};

export default AddReviewResultDetail;
