import { useState, useEffect, useCallback } from "react";
interface IResponse {
  data: [];
  status: string;
  message: string;
  errorcode: number;
}
const useAxiosFunction = () => {
  const [response, setResponse] = useState<IResponse>();
  const [error, setError] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<any>();

  const axiosFetch = useCallback(async (configObj: any) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const res = await axiosInstance({
        method: method.toLowerCase(),
        url: url,
        data: requestConfig ? requestConfig.data : null,
        signal: ctrl.signal,
        params: requestConfig ? requestConfig.params : null,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse(res.data);
      setError(0);
    } catch (err: any) {
      setError(err.response);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return { response, error, loading, axiosFetch };
};

export default useAxiosFunction;
