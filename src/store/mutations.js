import router from "../router";

var mutations = {
  checkLogin(state) {
    let currentUser = localStorage.getItem("userData");
    if (currentUser && JSON.parse(currentUser)) {
      currentUser = JSON.parse(currentUser);
      state.user = currentUser.user;
      state.accessToken = currentUser.access_token;
      state.isLoggedIn = true;
    }
    /* console.log("mutate check login");
    console.log(state.isLoggedIn); */
  },
  setUser(state, data) {
    state.isLoggedIn = true;
    state.user = data.user;
    //alert(data);
    /* console.log("data from set user function");
    console.log(data.user); */
    state.accessToken = data.access_token;
    localStorage.setItem("userData", JSON.stringify(data));
    if (data.user.tel_verified == 1) {
      router.push("/userarea");
    } else {
      router.push("/verify/tel");
    }
  },
  setStateProps(state, data) {
    for (let fieldName in data) {
      if (fieldName.indexOf("user_") != -1) {
        let varName = fieldName.replace("user_", "");
        /* console.log(
          "Var name is: " + varName + " and field name is: " + fieldName
        ); */
        if (varName in state.user) {
          state.user[varName] = data[fieldName];
          let currentUser = localStorage.getItem("userData");
          currentUser = JSON.parse(currentUser);
          currentUser.user[varName] = data[fieldName];
          localStorage.setItem("userData", JSON.stringify(currentUser));
        }
      } else {
        if (fieldName in state) {
          state[fieldName] = data[fieldName];
        }
      }
    }
    /* state[data.name] = data.value;
    if (data.type == "user") {
      state.user[data.name] = data.value;
      let currentUser = localStorage.getItem("userData");
      currentUser = JSON.parse(currentUser);
      currentUser.user[data.name] = data.value;
      localStorage.setItem("userData", JSON.stringify(currentUser));
    } */
  },
  logoutUser(state) {
    localStorage.removeItem("userData");
    state.isLoggedIn = false;
  },
};
export { mutations };
