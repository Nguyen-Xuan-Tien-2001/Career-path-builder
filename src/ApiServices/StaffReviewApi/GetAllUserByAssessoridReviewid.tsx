import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

const GetAllUserByAssessoridReviewid = (
    assessorid: number,
    reviewid: number
) => {
    const token = localStorage.getItem("token");
    const API_URL = `/Assessor/getAllUserByAssessorIDReviewID`;

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

export default GetAllUserByAssessoridReviewid;
