import useAxiosFunction from "../../hook/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";

export const AddCriteriaToLevelService = () => {
  const {
    response: addCriteriaToLevelResponse,
    error: addCriteriaToLevelError,
    loading: addCriteriaToLevelIsLoading,
    axiosFetch: addCriteriaToLevelRefetch,
  } = useAxiosFunction();

  const callAddCriteriaToLevelRefetch = (data: {}) => {
    const addCriteriaToLevelUrl = "/Criteria_Levels/addListCriteriaToLevel";
    addCriteriaToLevelRefetch({
      axiosInstance: httpClient,
      method: "POST",
      url: addCriteriaToLevelUrl,
      requestConfig: { data: data },
    });
  };

  return {
    addCriteriaToLevelResponse,
    addCriteriaToLevelIsLoading,
    addCriteriaToLevelError,
    callAddCriteriaToLevelRefetch,
  };
};
