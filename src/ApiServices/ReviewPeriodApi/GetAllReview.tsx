import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance.tsx";

export const GetAllReview = () => {
  const getAllReviewUrl = "/ReviewPeriod/getAllReviewPeriod";

  const {
    response: getAllReviewResponse,
    isLoading: getAllReviewIsLoading,
    error: getAllReviewError,
    refetch: getAllReviewRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllReviewUrl,
    requestConfig: {},
  });

  return {
    getAllReviewResponse,
    getAllReviewIsLoading,
    getAllReviewError,
    getAllReviewRefetch,
  };
};
