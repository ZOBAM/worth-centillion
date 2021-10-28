import axios from "axios";

export default async function http(url, payload = false) {
  let responseData;
  if (!payload) {
    responseData = await axios.get(process.env.VUE_APP_APIURL + url);
  } else {
    axios.post(process.env.VUE_APP_APIURL + url, payload).then((response) => {
      responseData = response;
    });
  }

  return responseData;
}
