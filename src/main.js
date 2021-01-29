import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
//import "materialize-css";
//import "materialize-css/dist/css/materialize.css";
import axios from 'axios';
import VueAxios from 'vue-axios';

//axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = "Bearer 41|cZiiK8k3WHhxAdSAXO8JlW5ebbn6of143T17FiNK";
createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
