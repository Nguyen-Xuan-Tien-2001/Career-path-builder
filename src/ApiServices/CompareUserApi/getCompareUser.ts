import httpClient from "../../utils/axiosInstance.tsx";
import useAxiosFunction from "../../hook/useAxiosFunction";

export const getCompareUser = () => {
  const {
    response: getCompareUserResponse,
    error: getCompareUserError,
    loading: getCompareUserIsLoading,
    axiosFetch: getCompareUserRefetch,
  } = useAxiosFunction();

  const callgetCompareUserRefetch = (pathId:any,reviewId:any,userid1:any,userid2:any) => {
    const getCompareUser = `/AllReviewResultUser/getUserCompare?pathid=${pathId}&reviewid=${reviewId}&userid1=${userid1}&userid2=${userid2}`;
    getCompareUserRefetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getCompareUser,
      requestConfig: { },
    });
  };

  return {
    getCompareUserResponse,
    getCompareUserIsLoading,
    getCompareUserError,
    callgetCompareUserRefetch,
  };
};
