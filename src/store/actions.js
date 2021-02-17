import axios from 'axios';
//axios.defaults.headers.common['Authorization'] = "Bearer 41|cZiiK8k3WHhxAdSAXO8JlW5ebbn6of143T17FiNK";

const actions = {
    login({commit}, credentials){
        axios.post(process.env.VUE_APP_APIURL+"/login", credentials).then(response => {
          console.log('User signed in!');
          commit('setUser', {data: response.data});
          //this.bearerToken = response.data.access_token;
          console.log(response.data);
        }).catch(error => console.log(error)); // credentials didn't match
    },
    checkLogin({commit}){
        commit('checkLogin');
    },
    logout({commit}){
        commit('logoutUser');
    },
    setProps({commit}, data){
        commit('setStateProps', data);
    }
}
export {actions};