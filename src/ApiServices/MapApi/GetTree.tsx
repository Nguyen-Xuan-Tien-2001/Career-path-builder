import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance.tsx";

export const GetTree = () => {
  const getTreeUrl = `/Level/getTreeLevel?pathid=1`;

  const {
    response: getTreeResponse,
    isLoading: getTreeIsLoading,
    error: getTreeError,
    refetch: getTreeRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getTreeUrl,
    requestConfig: {},
  });

  return {
    getTreeResponse,
    getTreeIsLoading,
    getTreeError,
    getTreeRefetch,
  };
};
