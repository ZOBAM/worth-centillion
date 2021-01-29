var mutations = {
    increaseAge(state, age) {
      state.age += age.age;
    },
    setUser(state, data){
      state.isLoggedIn = true;
      state.user = data.user;
      state.userToken = data.access_token;
    }
  };
  export {mutations};