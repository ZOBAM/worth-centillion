import axios from 'axios';

const actions = {
    increment(context, age){
        context.commit('increaseAge', age)
        alert('about to login');
    },
    login({commit, state}, credentials){
        axios.post(state.loginURL, credentials).then(response => {
          console.log('User signed in!');
          commit('setUser', {data: response.data});
          //this.bearerToken = response.data.access_token;
          console.log(response.data.access_token);
        }).catch(error => console.log(error)); // credentials didn't match
    }
}
export {actions};