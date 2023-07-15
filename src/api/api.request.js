// import { message as toaster } from "antd";
import { isEmpty } from "lodash";
import qs from "qs";
import axios from "./api.config";
import { store } from "./../store";
import { hideLoader, showLoader } from "./../store/appSlice";

const STATUS = [200, 204];

class ApiRequestClass {
  constructor() {
    if (ApiRequestClass._instance) {
      return ApiRequestClass._instance;
    }
    ApiRequestClass._instance = this;
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   * @param {boolean} showLoader
   * @param {string} method - must be a lowercase, it's axios get, post, delete, patch methods
   * @param {object} queryParams
   */
  async common({
    url,
    data = {},
    showLoading = true,
    method = "get",
    queryParams = {},
    setErrors = undefined,
    config,
  }) {
    if (showLoading) {
      this.handleShowLoader();
    }

    try {
      const URL = this.addQueryParamsWithUrl(url, queryParams);
      const response = await axios[method](URL, data, config);
      if (response.status === 204) {
        throw new Error("No data available to download!");
      }
      if (
        !STATUS.includes(response?.data.status) &&
        url === process.env.REACT_APP_CASHIER_API_URL
      ) {
        this.handleErrors({
          response: response?.data,
          data: response?.data?.data,
          message: response?.data?.data,
          ...response?.data,
        });
        return Promise.reject(response?.data);
      }
      return Promise.resolve(response.data);
    } catch (error) {
      this.handleErrors(error, setErrors);
      return Promise.reject(error);
    } finally {
      this.handleHideLoader();
    }
  }

  addQueryParamsWithUrl(url, queryParams) {
    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === null && delete queryParams[key]
    );
    return url + qs.stringify(queryParams, { addQueryPrefix: true });
  }

  handleErrors(error, setErrors) {
    if (error) {
      try {
        // console.log('error handled', error);
        const { data } = error.response;
        // console.log('error data', data);
        const { status } = error.response;
        // console.log('error status', status);
        const checkNetworkError = JSON.stringify(error);
        const NetworkError = "Network Error";

        if (checkNetworkError.includes(NetworkError)) {
          // toaster.error(NetworkError);
          console.log(NetworkError);
          return false;
        }
        if (status === 500) {
          // toaster.error(error.message);
          console.log(error.message);
        } else if (status === 400) {
          if (data?.error?.form_error) {
            this.handle422Error(data?.error, setErrors);
          }
          // toaster.error(data?.error?.message || data?.error || "Data Error");
          console.log(data?.error?.message || data?.error || "Data Error");
        } else if (status === 401) {
          this.handle401Error();
        } else if (status === 422) {
          /**
           * 422 error is form validation error
           */
          this.handle422Error(data?.error, setErrors);
        } else {
          this.handleCommonErrors(data);
        }
      } catch (e) {
        if (error.toString().includes("No data available")) {
          // toaster.info(error.toString());
          console.log(error.toString());
        } else if (error.toString().includes("timeout")) {
          // toaster.error("API Timeout");
          console.log("API Timeout");
        } else {
          // toaster.error("Something went wrong please try again");
          console.log("Something went wrong please try again");
          console.log("Unhandled error", e);
        }
      }
    }
    return null;
  }

  handle401Error() {
    /**
     * 401 is authentication error like session failure
     */
    // toaster.error("Error: 401");
    console.log("Error: 401");
    // toaster.error("Login expired, Please Login");
    setTimeout(() => {
        console.log('Redirect to Page')
    }, 3000);
  }

  handleCommonErrors(data) {
    let error = "404 - Resource Not Found";
    if (data?.error?.message) {
      error = data?.error?.message;
    }
    // toaster.error(error);
    console.log(error);
  }

  handleShowLoader() {
    store.dispatch(showLoader());
  }

  handleHideLoader() {
    store.dispatch(hideLoader());
  }

  handle422Error(data, setErrors) {
    const serverErrors = data;
    if (!isEmpty(serverErrors) && setErrors) {
      setErrors({
        [serverErrors?.key]: serverErrors?.message,
      });
      return data;
    }
    return null;
  }
}

export const API = new ApiRequestClass();
