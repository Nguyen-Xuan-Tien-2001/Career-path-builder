import useAxios from "../../hook/useAxios.tsx";
import httpClient from "../../utils/axiosInstance.tsx";


export const getAllInformationUserId = (staffId:any,pathId: any,reviewId: any) => {
  const getAllInformationUserId = `/AllReviewResultUser/getAllReviewResultUserByKey?staffId=${staffId}&&pathId=${pathId}&&reviewId=${reviewId}`;
  const {
    response: getAllUserInfResponse,
    isLoading: getAllUserInfIsLoading,
    error: getAllUserInfError,
    refetch: getAllUserInfRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllInformationUserId,
    requestConfig: {},
  });

  return {
    getAllUserInfResponse,
    getAllUserInfIsLoading,
    getAllUserInfError,
    getAllUserInfRefetch,
  };
};
