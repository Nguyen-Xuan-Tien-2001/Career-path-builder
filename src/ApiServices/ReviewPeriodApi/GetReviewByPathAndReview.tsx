import useAxiosFunction from "../../hook/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";

export const GetReviewByPathAndReviewService = () => {
  const {
    response: GetReviewByPathAndReviewResponse,
    error: GetReviewByPathAndReviewError,
    loading: GetReviewByPathAndReviewIsLoading,
    axiosFetch: GetReviewByPathAndReviewRefetch,
  } = useAxiosFunction();

  const callGetReviewByPathAndReviewRefetch = (pathid:number) => {
    const GetReviewByPathUrl = `/ReviewPeriod/GetAllReviewPeriodByReviewId?reviewid=3&pathid=2`;
    GetReviewByPathAndReviewRefetch({
      axiosInstance: httpClient,
      method: "GET",
      url: GetReviewByPathUrl,
      requestConfig: { },
    });
  };

  return {
    GetReviewByPathAndReviewResponse,
    GetReviewByPathAndReviewIsLoading,
    GetReviewByPathAndReviewError,
    callGetReviewByPathAndReviewRefetch,
  };
};
