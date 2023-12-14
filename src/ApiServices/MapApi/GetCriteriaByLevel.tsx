import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance";

export const GetAllCV = () => {
  const getAllCVUrl = "/CV/getall";

  const {
    response: getAllCVResponse,
    isLoading: getAllCVIsLoading,
    error: getAllCVError,
    refetch: getAllCVRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllCVUrl,
    requestConfig: {},
  });

  return {
    getAllCVResponse,
    getAllCVIsLoading,
    getAllCVError,
    getAllCVRefetch,
  };
};
