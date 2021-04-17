import axios from "axios";
import { state } from "./state";
//axios.defaults.headers.common['Authorization'] = "Bearer 41|cZiiK8k3WHhxAdSAXO8JlW5ebbn6of143T17FiNK";

const actions = {
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
  fetchData({ commit }) {
    //get ads from the server
    commit("setStateProps", { name: "adsIsLoading", value: true });
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
        commit("setStateProps", { name: "ads", value: response.data.ads });
        commit("setStateProps", { name: "adsIsLoading", value: false });
        totalAdsCount = response.data.total_ads_count;
        if (localStorage.getItem("lastTotalAdsCount") === null) {
          //alert("No lastCount in storage");
          localStorage.setItem("lastTotalAdsCount", totalAdsCount);
        } else {
          //alert(localStorage.getItem('lastTotalAdsCount'));
        }
        //alert(totalAdsCount);
        setState("states");
        setState("categories");
      });
    //if stored ads counts has changed, re-fetch states to reflect current ads distributions
    function setState(data) {
      if (
        state[data] == null ||
        totalAdsCount != localStorage.getItem("lastTotalAdsCount")
      ) {
        //console.log(`${data} at the moment is null or doesn't match`);
        let localData = localStorage.getItem(data);
        if (
          localData &&
          JSON.parse(localData) &&
          totalAdsCount == localStorage.getItem("lastTotalAdsCount")
        ) {
          //console.log(`getting ${data} form local storage`);
          localData = JSON.parse(data);
          commit("setStateProps", { name: data, value: localData });
        } else {
          //console.log(`getting ${data} form server`);
          axios
            .get(process.env.VUE_APP_APIURL + "/ads/get_" + data)
            .then(function(response) {
              commit("setStateProps", {
                name: data,
                value: response.data[data],
              });
              localStorage.setItem(data, JSON.stringify(response.data[data]));
              localStorage.setItem("lastTotalAdsCount", totalAdsCount);
            });
        }
      }
    }
  },
};
export { actions };
