import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance.tsx";

export const GetAllPath = () => {
  const getAllPathUrl = "/getAllPath";

  const {
    response: getAllPathResponse,
    isLoading: getAllPathIsLoading,
    error: getAllPathError,
    refetch: getAllPathRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllPathUrl,
    requestConfig: {},
  });

  return {
    getAllPathResponse,
    getAllPathIsLoading,
    getAllPathError,
    getAllPathRefetch,
  };
};
