import useAxios from "../../hook/useAxios.tsx";
import httpClient from "../../utils/axiosInstance.tsx";


export const getAllReviewResultUserId = (staffId:any,reviewId: any) => {
  const getAllReviewResultUserId = `/AllReviewResultUser/getAllReviewResultUserId?staffId=${staffId}&&reviewId=${reviewId}`;
  const {
    response: getAllResponse,
    isLoading: getAllIsLoading,
    error: getAllError,
    refetch: getAllRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllReviewResultUserId,
    requestConfig: {},
  });

  return {
    getAllResponse,
    getAllIsLoading,
    getAllError,
    getAllRefetch,
  };
};
