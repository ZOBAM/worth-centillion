import router from "../router";

var mutations = {
  checkLogin(state) {
    let currentUser = localStorage.getItem('userData');
    if (currentUser && JSON.parse(currentUser)) {
      currentUser = JSON.parse(currentUser);
      state.user = currentUser.data.user;
      state.userToken = currentUser.data.access_token;
      state.isLoggedIn = true;
    }
    console.log("mutate check login");
    console.log(state.isLoggedIn);
  },
  setUser(state, data) {
    state.isLoggedIn = true;
    state.user = data.user;
    state.userToken = data.access_token;
    localStorage.setItem('userData', JSON.stringify(data));
    router.push("/userarea");
  },
  setStateProps(state, data) {
    state[data.name] = data.value;
    /* switch (data.name) {
      case 'state':
        state.state = data.value;
        break;
      case 'lga':
        state.lga = data.value;
        break;
      case 'category':
        state.category = data.value;
        break;
      case 'subcategory':
        state.subcategory = data.value;
    } */
  },
  logoutUser(state) {
    localStorage.removeItem('userData');
    state.isLoggedIn = false;
  }
};
export { mutations };