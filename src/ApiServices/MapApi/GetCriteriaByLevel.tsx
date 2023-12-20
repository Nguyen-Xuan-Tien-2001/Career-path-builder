import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance";

export const GetAllCV = () => {
  const getAllCVUrl = "/CV/getall";

  const {
    response: getCriteriaByLevelResponse,
    isLoading: getCriteriaByLevelIsLoading,
    error: getCriteriaByLevelError,
    refetch: getCriteriaByLevelRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getCriteriaByLevelUrl,
    requestConfig: {},
  });

  return {
    getAllCVResponse,
    getAllCVIsLoading,
    getAllCVError,
    getAllCVRefetch,
  };
};
