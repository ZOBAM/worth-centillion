import axios from "axios";
import router from "../router";
import { state } from "./state";
//axios.defaults.headers.common['Authorization'] = "Bearer 41|cZiiK8k3WHhxAdSAXO8JlW5ebbn6of143T17FiNK";

const actions = {
  moveToDestination({ commit }) {
    router.push(state.destinationURL);
    commit("setStateProps", { name: "destinationURL", value: null });
  },
  login({ commit }, data) {
    commit("setUser", data);
  },
  checkLogin({ commit }) {
    commit("checkLogin");
  },
  logout({ commit }) {
    commit("logoutUser");
  },
  setProps({ commit }, data) {
    commit("setStateProps", data);
  },
  messages({ commit }, payload) {
    commit("setStateProps", { messageLoading: true });
    let initialMessagesCount = state.user.messages.length;
    axios
      .post(process.env.VUE_APP_APIURL + "/messages", payload)
      .then((response) => {
        let data = response.data;
        /* console.log(data.ad_chats);
        console.log(data.messages); */
        //console.log("data.user_id: " + payload.user_id);
        commit("setStateProps", { messageLoading: false });
        commit("setStateProps", data);
        if (payload.user_id == undefined) {
          commit("setStateProps", { messageSuccess: true });
          setTimeout(() => {
            commit("setStateProps", { messageSuccess: false });
          }, 3500);
        }
        if (state.user.messages.length != initialMessagesCount) {
          let lastMessage = state.user.messages[state.user.messages.length - 1];
          if (state.user.id == lastMessage.receiver_id) alert("New message");
        }
        //alert("Message successfully sent to seller");
      })
      .catch(() => {
        console.log("An error occurred on the server. Please try again.");
        //console.log(error);
      });
  },
  favorites({ commit }, payload) {
    if (payload.type == "delete") {
      let userFavs = state.user.favorites.filter((item) => {
        return item.id != payload.adID;
      });
      commit("setStateProps", {
        user_favorites: userFavs,
      });
    }
  },
  fetchData({ commit }) {
    //get ads from the server
    commit("setStateProps", { adsIsLoading: true });
    let urlPostfix = "";
    let urlPara = "";
    let totalAdsCount = null;
    if (state.category) {
      urlPostfix += `/${state.category}`;
      urlPostfix += state.subcategory ? `/${state.subcategory}` : "";
    }
    if (state.state) {
      urlPara += `?state=${state.state}`;
      urlPara += state.lga ? `&lga=${state.lga}` : "";
    }
    //alert(process.env.VUE_APP_APIURL+"/ads"+urlPostfix+urlPara);
    axios
      .get(process.env.VUE_APP_APIURL + "/ads" + urlPostfix + urlPara)
      .then(function(response) {
        //console.log(response.data);
        commit("setStateProps", response.data);
        commit("setStateProps", { adsIsLoading: false });
        let cacheNum = localStorage.getItem("cacheNum");
        if (response.data.clear_cache != cacheNum) {
          alert("clearing all cache");
          localStorage.removeItem("categories");
          commit("logoutUser");
          localStorage.setItem("cacheNum", response.data.clear_cache);
        }
        setState("states");
        setState("categories");
      });
    //if stored ads counts has changed, re-fetch states to reflect current ads distributions
    function setState(data) {
      axios
        .get(process.env.VUE_APP_APIURL + "/ads/get_" + data)
        .then(function(response) {
          commit("setStateProps", { data: response.data[data] });
          localStorage.setItem(data, JSON.stringify(response.data[data]));
          localStorage.setItem("lastTotalAdsCount", totalAdsCount);
        });
    }
  },
};
export { actions };
