import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance";

export const GetCriteriaByLevelId = (levelId: any) => {
  const getCriteriaByLevelUrl = `/Criteria_Levels/GetCriteriaByLevelId?levelId=${levelId}`;

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
    getCriteriaByLevelResponse,
    getCriteriaByLevelIsLoading,
    getCriteriaByLevelError,
    getCriteriaByLevelRefetch,
  };
};
