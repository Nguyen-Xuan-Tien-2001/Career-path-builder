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
    const GetReviewByPathUrl = `/ReviewPeriod/GetAllReviewPeriodByPathId?id=${pathid}`;
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
