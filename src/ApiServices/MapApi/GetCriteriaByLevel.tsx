import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance";

interface dataRespone {
  response: object;
  isLoading: boolean;
  error: object;
  refetch: () => object;
}

export const GetCriteriaByLevelId = (levelId: any) => {
  const getCriteriaByLevelUrl = `/Criteria_Levels/GetCriteriaByLevelId?levelId=${
    levelId ? levelId : 1
  }`;

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
