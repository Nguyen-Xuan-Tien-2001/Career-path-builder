import useAxios from "../../hook/useAxios.tsx";
import useAxiosFunction from "../../hook/useAxiosFunction.tsx";

import httpClient from "../../utils/axiosInstance.tsx";

export const AddReviewPeriodService = () => {
  const {
    response: addReviewPeriodResponse,
    error: addReviewPeriodError,
    loading: addReviewPeriodIsLoading,
    axiosFetch: addReviewPeriodRefetch,
  } = useAxiosFunction();

  const callReviewPeriodRefetch = (data: {}) => {
    const addReviewPeriodlUrl = "/ReviewPeriod/addReviewPeriod";
    addReviewPeriodRefetch({
      axiosInstance: httpClient,
      method: "POST",
      url: addReviewPeriodlUrl,
      requestConfig: { data: data },
    });
  };

  return {
    addReviewPeriodResponse,
    addReviewPeriodIsLoading,
    addReviewPeriodError,
    callReviewPeriodRefetch,
  };
};
