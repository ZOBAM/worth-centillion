import { createApp } from "vue";
import App from "./App.vue";
//import "./index.css";
import router from "./router";
import store from "./store";
import "materialize-css/dist/css/materialize.css";
import "materialize-css";
import "./style.css";
import axios from "axios";
import VueAxios from "vue-axios";

let intervalVar = setInterval(() => {
  console.log("this is access token " + store.state.accessToken);
  if (store.state.accessToken) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + store.state.accessToken;
    clearInterval(intervalVar);
  }
}, 100);
axios.defaults.withCredentials = true;
createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
//command to compile tailwind css for production
//NODE_ENV=production npx tailwindcss -i ./src/index.css -o ./src/style.css --watch --jit --purge="./src/**/*.vue"
