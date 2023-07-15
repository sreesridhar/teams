// import { isEmpty, uniqBy } from "lodash";
import { API } from "./../api";

const Enquiry_URL = "enquires";
export const postEnquiryDetail = (contactData) => async () => {
  const CREDENTIALS = {
    url: Enquiry_URL,
    method: "post",
    data: contactData
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};
