// import { isEmpty, uniqBy } from "lodash";
import { API } from "./../api";

const Contact_URL = "contacts";
export const postContactDetail = (contactData) => async () => {
  const CREDENTIALS = {
    url: Contact_URL,
    method: "post",
    data: contactData
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};
export const postMoreDetail = (contactData) => async () => {
  const CREDENTIALS = {
    url: `${Contact_URL}/news-letter`,
    method: "post",
    data: contactData
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};


