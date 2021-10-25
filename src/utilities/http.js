import axios from "axios";

export default function http(method, url, payload = false) {
  alert("getting response from server");
  let responseData;
  if (method == "get") {
    axios.get(process.env.VUE_APP_APIURL + url).then((response) => {
      responseData = response;
    });
  } else {
    axios.post(process.env.VUE_APP_APIURL + url, payload).then((response) => {
      responseData = response;
    });
  }

  return responseData;
}
