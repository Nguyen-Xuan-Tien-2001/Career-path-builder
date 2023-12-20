import useAxios from "../../hook/useAxios.tsx";

import httpClient from "../../utils/axiosInstance";

export const GetListAssessorByReviewId = (reviewId: number) => {
  const getListAssessorByReviewIdUrl = `/Assessor/GetListAssessorByReviewId?reviewId=${reviewId}`;

  const {
    response: getListAssessorByReviewIdResponse,
    isLoading: getListAssessorByReviewIdIsLoading,
    error: getListAssessorByReviewIdError,
    refetch: getListAssessorByReviewIdRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getListAssessorByReviewIdUrl,
    requestConfig: {},
  });

  return {
    getListAssessorByReviewIdResponse,
    getListAssessorByReviewIdIsLoading,
    getListAssessorByReviewIdError,
    getListAssessorByReviewIdRefetch,
  };
};
