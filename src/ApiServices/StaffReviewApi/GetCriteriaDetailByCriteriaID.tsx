import axios from "axios";

import { API_BASE_URL, headers } from "../../utils/config.ts";

const GetCriteriaDetailByCriteriaID = (criteriaid: number) => {
    const token = localStorage.getItem("token");
    const API_URL = `/CriteriaByCapacity/getCriteriaDetailByCriteriaID`;

    return axios.get(API_URL, {
        baseURL: API_BASE_URL,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
        params: {
            criteriaid: criteriaid,
        },
    });
};

export default GetCriteriaDetailByCriteriaID;
