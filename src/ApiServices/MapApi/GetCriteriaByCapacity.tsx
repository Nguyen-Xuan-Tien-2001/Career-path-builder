import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance";

export const GetCriteriaByCapacityId = () => {
  const getCriteriaByCapacityUrl = `/CriteriaByCapacity/getAllCriterialByCapacity?capacityid=1`;

  const {
    response: getCriteriaByCapacityResponse,
    isLoading: getCriteriaByCapacityIsLoading,
    error: getCriteriaByCapacityError,
    refetch: getCriteriaByCapacityRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getCriteriaByCapacityUrl,
    requestConfig: {},
  });

  return {
    getCriteriaByCapacityResponse,
    getCriteriaByCapacityIsLoading,
    getCriteriaByCapacityError,
    getCriteriaByCapacityRefetch,
  };
};
