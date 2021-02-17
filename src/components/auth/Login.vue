<template>
  <div class="text-center mb-10">
    <h1 class="font-bold text-3xl text-gray-900">LOGIN</h1>
    <p>Enter your credentials to login</p>
  </div>
  <form action="" @submit.prevent = "login()">
    <div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Email</label>
          <div class="flex">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
            </div>
            <input
              type="email" required v-model = "email"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="johnsmith@example.com"
            />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Password</label>
          <div class="flex">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
            </div>
            <input
              type="password" v-model = "password" required
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="************"
            />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <button
            class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>

import store from "../../store";
import { mapState, mapActions } from "vuex";

export default {
    name: "Register",
    data: function(){
        return{
            email: '',
            password: '',
        }
    },
    compuuted: {
    ...mapActions(["login"]),
    ...mapState(["user", "isLoggedIn"]),
  },
    methods: {
        login: function () {
          let loginData = {email: this.email, password: this.password};
          store.dispatch("login", loginData);
        },
    }
};
</script>