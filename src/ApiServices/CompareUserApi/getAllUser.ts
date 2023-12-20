import useAxios from "../../hook/useAxios.tsx";
import httpClient from "../../utils/axiosInstance.tsx";


export const getAllUser = () => {
  const getAllUser = `/Staff/getAllStaff`;
  const {
    response: getAllUserResponse,
    isLoading: getAllUserIsLoading,
    error: getAllUserError,
    refetch: getAllUserRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllUser,
    requestConfig: {},
  });

  return {
    getAllUserResponse,
    getAllUserIsLoading,
    getAllUserError,
    getAllUserRefetch,
  };
};
