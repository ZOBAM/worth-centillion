import router from "../router";

var mutations = {
  checkLogin(state) {
    let currentUser = localStorage.getItem('userData');
    if (currentUser && JSON.parse(currentUser)) {
      currentUser = JSON.parse(currentUser);
      state.user = currentUser.user;
      state.accessToken = currentUser.access_token;
      state.isLoggedIn = true;
    }
    console.log("mutate check login");
    console.log(state.isLoggedIn);
  },
  setUser(state, data) {
    state.isLoggedIn = true;
    state.user = data.user;
    //alert(data);
    console.log("data from set user function");
    console.log(data.user);
    state.accessToken = data.access_token;
    localStorage.setItem('userData', JSON.stringify(data));
    if (data.user.email_verified_at) {
      router.push("/userarea");
    }else{
      router.push("/verify_email");
    }
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