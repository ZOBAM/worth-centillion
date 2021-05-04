import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
//import "materialize-css";
//import "materialize-css/dist/css/materialize.css";
import axios from "axios";
import VueAxios from "vue-axios";

setTimeout(() => {
  //console.log("this is access token " + store.state.accessToken);
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + store.state.accessToken;
}, 100);
axios.defaults.withCredentials = true;
createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
