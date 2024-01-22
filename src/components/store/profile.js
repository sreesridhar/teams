// import { isEmpty, uniqBy } from "lodash";
import { API } from "./../api";

const Profile_URL = "profile";
export const getProfileDetails = () => async () => {
  const CREDENTIALS = {
    url: Profile_URL,
    method: "get",
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};
