<template>
  <div class="text-center mb-10">
    <h1 class="font-bold text-3xl text-gray-900">SIGN IN</h1>
    <p>Enter your credentials to login</p>
  </div>
  <Form
    action=""
    @submit="login()"
    :validation-schema="schema"
    v-slot="{ meta }"
  >
    <div>
      <error-alert v-if="error" :messages="errorMessages"></error-alert>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Email</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
            </div>
            <Field
              type="email"
              required
              v-model="email"
              name="email"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="johnsmith@example.com"
              @keydown="error = false"
              :rules="isRequired"
            />
            <ErrorMessage name="email" class="block text-red-500 text-sm" />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Password</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
            </div>
            <Field
              type="password"
              v-model="password"
              required
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="************"
              @keydown="error = false"
              name="password"
            />
            <ErrorMessage
              name="password"
              class="block text-red-500 flex-grow text-sm"
            />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <button
            :disabled="loading"
            :class="buttonStyleClass(meta.valid)"
            class="block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
          >
            <span v-if="loading"
              >Signing in <span class="mdi mdi-star mdi-spin text-xl"></span>
            </span>
            <span v-else class="animate-spin"
              >LOGIN
              <span
                class="mdi mdi-arrow-right-bold mdi-rotate-270"
                :class="{}"
              ></span>
            </span>
          </button>
          <div class="m-4 text-gray-800">
            Don't have an account?
            <router-link to="/user/register" class="font-bold text-blue-800"
              >Sign Up</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import store from "../../store";
import { mapState } from "vuex";
import ErrorAlert from "../ErrorAlert.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    ErrorAlert,
    Field,
    Form,
    ErrorMessage,
  },
  data: function() {
    const schema = yup.object({
      email: yup
        .string()
        .required()
        .email(),
      password: yup
        .string()
        .required()
        .min(8),
    });
    return {
      schema,
      email: "",
      password: "",
      loading: false,
      error: false,
      errorMessages: [],
    };
  },
  computed: {
    ...mapState(["user", "isLoggedIn"]),
  },
  methods: {
    buttonStyleClass(valid) {
      //alert("valid: "+ valid);
      if (this.loading || !valid) {
        return {
          "bg-indigo-300  cursor-not-allowed": true,
        };
      }
      return {
        "bg-indigo-500 focus:bg-indigo-700 hover:bg-indigo-700": true,
      };
    },
    isRequired(value) {
      if (value && value.trim()) {
        alert(value.length);
        if (value.length > 5) {
          return "Email too long";
        }
        return true;
      }

      return "This is required";
    },
    login: function() {
      this.error = false;
      //console.log("submitting to server");
      if (this.loading) return false;
      this.loading = true;
      this.errorMessages = [];
      let loginData = { email: this.email, password: this.password };
      //store.dispatch("login", loginData);
      this.axios
        .post(process.env.VUE_APP_APIURL + "/login", loginData)
        .then((response) => {
          console.log("User signed in response received from server!");
          this.loading = false;
          console.log(response.data);
          if (response.data.message) {
            //console.log(response.data.message);
            this.errorMessages.push(
              "The provided credentials are not correct. Please check and try again."
            );
            this.error = true;
            return false;
          }
          store.dispatch("login", response.data);
          //this.bearerToken = response.data.access_token;
          //console.log(response.data);
        })
        .catch(() => {
          this.loading = false;
          this.errorMessages.push(
            "An error ocurred from the server. Please check and try again."
          );
          this.error = true;
          //console.log(error);
        }); // credentials didn't match
    },
  },
};
</script>
