import axios from "axios";
import { Toaster } from "../components/toast/Toaster";
// import { isEmpty } from 'lodash';
// import { useAuth } from "hooks";

/**
 * set baseurl for all axios request
 */
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = false; // to allow cookie to api request
axios.defaults.timeout = 300 * 1000; // Max timeout

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log("came in side api config");
    // console.log('request interceptors', config.url);
    // Do something before request is sent
    // const userInfo = useAuth(); // get the latest token

    /**
     * For Lambda URL don't send the authorization token to server
     */
    try {
      // if (
      //   !isEmpty(userInfo) &&
      //   !config?.url?.includes(process.env.REACT_APP_API_WMS_GRN_OA_URL)
      // ) {
      // const token = userInfo?.access;
      // config.headers.authorization = `Bearer ${token}`;
      // }
    } catch (error) {
      console.log("catch", error);
    }

    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) =>
    // console.log('response interceptors', response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  (error) =>
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error    
    Promise.reject(error)
);

export default axios;
