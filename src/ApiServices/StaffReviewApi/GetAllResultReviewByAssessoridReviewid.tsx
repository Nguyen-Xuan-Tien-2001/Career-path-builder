import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

const GetAllResultReviewByAssessoridReviewid = (
    assessorid: number,
    reviewid: number
) => {
    const token = localStorage.getItem("token");
    const API_URL = `/AllReviewResultUser/getAllReviewResultByAssessoridReviewid`;

    return axios.get(API_URL, {
        baseURL: API_BASE_URL,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
        params: {
            assessorid: assessorid,
            reviewid: reviewid,
        },
    });
};

export default GetAllResultReviewByAssessoridReviewid;
