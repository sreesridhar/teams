// import { isEmpty, uniqBy } from "lodash";
import { API } from "./../api";

const PROPERTIES_URL = "properties";
const CONSTANTS_URL = "constants";
const LOCALITIES_URL = "localities";
export const getPropertiesLists = (queryParams = {}) => async () => {
  const CREDENTIALS = {
    url: PROPERTIES_URL,
    method: "get",
    queryParams,
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};

// export const getPropertiesDistrictList = (workspace,type,district) => async () => {
//   const CREDENTIALS = {
//     url: `${PROPERTIES_URL}?workspaceType=${workspace}&propertyType=${type}&district=${district}`,
//     method: "get",
//   };
//   const res = await Promise.all([API.common(CREDENTIALS)]);
//   return res;
// };

// export const getParamPropertiesLists = (workType, type, location) => async () => {
//   let queryURL;
//   console.log(workType, type, typeof location ,'API key')
//   // if((workType !== undefined && workType !== 'undefined')  && (type !== undefined && type !== 'undefined') && (location !== undefined && location !== 'undefined'))
//    if(workType === undefined && type !== undefined && location !== undefined )
//   queryURL = `${PROPERTIES_URL}?propertyType=${type}&locationName=${location}`

//   else if(workType !== undefined && type === undefined && location !== undefined )
//   queryURL = `${PROPERTIES_URL}?workspaceType=${workType}&locationName=${location}`

//   else if(workType !== undefined && type !== undefined && location === undefined)
//   queryURL = `${PROPERTIES_URL}?workspaceType=${workType}&propertyType=${type}`

//   else if(workType !== undefined  && type === undefined && location === undefined)
//   queryURL = `${PROPERTIES_URL}?workspaceType=${workType}`

//   else if(workType === undefined && type !== undefined && location === undefined )
//   queryURL = `${PROPERTIES_URL}?propertyType=${type}`

//   else if(workType === undefined && type === undefined && location !== undefined)
//   queryURL = `${PROPERTIES_URL}?locationName=${location}`
  
//   else
//   queryURL = `${PROPERTIES_URL}?workspaceType=${workType}&propertyType=${type}&locationName=${location}`

//   const CREDENTIALS = {
//     url: queryURL,
//     method: "get",
//   };
//   const res = await Promise.all([API.common(CREDENTIALS)]);
//   return res;
// };

export const getPropertiesForSaleLists =
  ({ isFeatured = false }) =>
  async () => {
    const CREDENTIALS = {
      url: `${PROPERTIES_URL}?isFeatured=${Boolean(isFeatured)}`,
      method: "get",
    };
    const res = await Promise.all([API.common(CREDENTIALS)]);
    return res;
  };

export const getPropertieDetailById = (id) => async () => {
  const CREDENTIALS = {
    url: `${PROPERTIES_URL}/${id}`,
    method: "get",
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};

export const getPropertieDetailBySlug = (slug) => async () => {
  const CREDENTIALS = {
    url: `${PROPERTIES_URL}/view/${slug}`,
    method: "get",
  };
  const res = await Promise.all([API.common(CREDENTIALS)]);
  return res;
};

// export const getPropertiesForSaleListss =
//   (pageNo=0,pageCount=10) =>
//   async () => {
//     const CREDENTIALS = {
//       url: `${PROPERTIES_URL}?page=${pageNo+1}&pageSize=${pageCount}`,
//       method: "get",
//     };
//     const res = await Promise.all([API.common(CREDENTIALS)]);
//     return res;
//   };

  export const getDropdownConstant =
  () =>
  async () => {
    const CREDENTIALS = {
      url: `${CONSTANTS_URL}?all=true`,
      method: "get",
    };
    const res = await Promise.all([API.common(CREDENTIALS)]);
    return res;
  };

  export const getLocalities =
  () =>
  async () => {
    const CREDENTIALS = {
      url: `${LOCALITIES_URL}?all=true`,
      method: "get",
    };
    const res = await Promise.all([API.common(CREDENTIALS)]);
    return res;
  };