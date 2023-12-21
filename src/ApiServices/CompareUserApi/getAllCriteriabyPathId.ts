import useAxios from "../../hook/useAxios.tsx";
import httpClient from "../../utils/axiosInstance.tsx";


export const getAllCriteriabyPathId = () => {
  const getAllCriteria = `/CriteriaByCapacity/getAllCriterialByPath?pathid=1`;
  const {
    response: getAllCriteriaResponse,
    isLoading: getAllCriteriaIsLoading,
    error: getAllCriteriaError,
    refetch: getAllCriteriaRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllCriteria,
    requestConfig: {},
  });

  return {
    getAllCriteriaResponse,
    getAllCriteriaIsLoading,
    getAllCriteriaError,
    getAllCriteriaRefetch,
  };
};
