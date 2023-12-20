import useAxios from "../../hook/useAxios.tsx";
import useAxiosFunction from "../../hook/useAxiosFunction.tsx";

import httpClient from "../../utils/axiosInstance.tsx";

export const UpdateReviewPeriodService = () => {
  const {
    response: updateReviewPeriodResponse,
    error: updateReviewPeriodError,
    loading: updateReviewPeriodIsLoading,
    axiosFetch: updateReviewPeriodRefetch,
  } = useAxiosFunction();

  const callUpdateReviewPeriodRefetch = (data: {}) => {
    const updateReviewPeriodlUrl = "/ReviewPeriod/updateReviewPeriod";
    updateReviewPeriodRefetch({
      axiosInstance: httpClient,
      method: "POST",
      url: updateReviewPeriodlUrl,
      requestConfig: { data: data },
    });
  };

  return {
    updateReviewPeriodResponse,
    updateReviewPeriodIsLoading,
    updateReviewPeriodError,
    callUpdateReviewPeriodRefetch,
  };
};
