import useAxiosFunction from "../../hook/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";

export const AddAssessorService = () => {
  const {
    response: addAssessorResponse,
    error: addAssessorError,
    loading: addAssessorIsLoading,
    axiosFetch: addAssessorRefetch,
  } = useAxiosFunction();

  const callAddAssessorRefetch = (data: {}) => {
    const addAssessorUrl = "/Assessor/addAssessor";
    addAssessorRefetch({
      axiosInstance: httpClient,
      method: "POST",
      url: addAssessorUrl,
      requestConfig: { data: data },
    });
  };

  return {
    addAssessorResponse,
    addAssessorIsLoading,
    addAssessorError,
    callAddAssessorRefetch,
  };
};
