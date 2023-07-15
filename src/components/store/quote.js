import { API } from "./../api";

const Quote_URL = "quotes";
export const postQuoteDetail = (quoteData) => async () => {
  const CREDENTIALS = {
    url: Quote_URL,
    method: "post",
    data: quoteData
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};
