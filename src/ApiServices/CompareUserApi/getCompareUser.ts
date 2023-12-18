import useAxios from "../../hook/useAxios.tsx";
import httpClient from "../../utils/axiosInstance.tsx";

export const getCompareUser = (pathId: any,
  reviewId: any,
  userId1: any,
  userId2: any,) => {
  const getCompareUser = `/AllReviewResultUser/getUserCompare?pathId=${pathId}&&reviewId=${reviewId}&&userId1=${userId1}&&userId2=${userId2}`;
  const {
    response: getCompareUserResponse,
    isLoading: getCompareUserIsLoading,
    error: getCompareUserError,
    refetch: getCompareUserRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getCompareUser,
    requestConfig: {},
  });

  return {
    getCompareUserResponse,
    getCompareUserIsLoading,
    getCompareUserError,
    getCompareUserRefetch,
  };
};
