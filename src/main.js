import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
//import "materialize-css";
//import "materialize-css/dist/css/materialize.css";
import axios from 'axios';
import VueAxios from 'vue-axios';

//console.log(store.state);
//axios.defaults.headers.common['Authorization'] = "Bearer 17|byQyAjKMbrk1HM4Ka0S6D7dJBNoNSEQtTdEX4pAi";
//axios.defaults.withCredentials = true;
createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
