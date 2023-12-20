import useAxiosFunction from "../../hook/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";

export const GetReviewByPathService = () => {
  const {
    response: GetReviewByPathResponse,
    error: GetReviewByPathError,
    loading: GetReviewByPathIsLoading,
    axiosFetch: GetReviewByPathRefetch,
  } = useAxiosFunction();

  const callGetReviewByPathRefetch = (pathid:number) => {
    const GetReviewByPathUrl = `/ReviewPeriod/GetAllReviewPeriodByPathId?id=${pathid}`;
    GetReviewByPathRefetch({
      axiosInstance: httpClient,
      method: "GET",
      url: GetReviewByPathUrl,
      requestConfig: { },
    });
  };

  return {
    GetReviewByPathResponse,
    GetReviewByPathIsLoading,
    GetReviewByPathError,
    callGetReviewByPathRefetch,
  };
};
