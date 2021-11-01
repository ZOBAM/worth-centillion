import { createApp } from "vue";
import App from "./App.vue";
//import "./index.css";
import router from "./router";
import store from "./store";
import Primevue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import ScrollPanel from "primevue/scrollpanel";
import  Paginator from "primevue/paginator";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "./style.css";
import axios from "axios";
import VueAxios from "vue-axios";

let tokenChecks = 0;
//setting intervals to retrieve access token from local storage because a direct check for login status always returns FALSE
let intervalVar = setInterval(() => {
  tokenChecks++;
  if (store.state.accessToken) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + store.state.accessToken;
    clearInterval(intervalVar);
  } else if (tokenChecks > 10) {
    clearInterval(intervalVar);
  }
}, 100);
axios.defaults.withCredentials = true;

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Primevue)
  .use(ToastService)
  .component("Toast", Toast)
  .component("ScrollPanel", ScrollPanel)
  .component("Paginator", Paginator)
  .mount("#app");
//command to compile tailwind css for production
//NODE_ENV=production npx tailwindcss -i ./src/index.css -o ./src/style.css --watch --jit --purge="./src/**/*.vue"
