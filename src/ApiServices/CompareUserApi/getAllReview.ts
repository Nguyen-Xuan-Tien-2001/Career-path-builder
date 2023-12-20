import useAxios from "../../hook/useAxios.tsx";
import httpClient from "../../utils/axiosInstance.tsx";


export const getAllReview = () => {
  const getAllReview = `/ReviewPeriod/getAllReviewPeriod`;
  const {
    response: getAllReviewResponse,
    isLoading: getAllReviewIsLoading,
    error: getAllReviewError,
    refetch: getAllReviewRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllReview,
    requestConfig: {},
  });

  return {
    getAllReviewResponse,
    getAllReviewIsLoading,
    getAllReviewError,
    getAllReviewRefetch,
  };
};
