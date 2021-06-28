<template>
  <div class="tw-text-center tw-mb-10">
    <h1 class="tw-font-bold tw-text-3xl tw-text-gray-900">SIGN IN</h1>
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
      <div class="tw-flex -tw-mx-3">
        <div class="tw-w-full tw-px-3 tw-mb-5">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >Phone No.</label
          >
          <div class="tw-flex tw-flex-wrap">
            <div
              class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              <i
                class="mdi mdi-cellphone tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
              ></i>

              <Field
                type="text"
                required
                v-model="tel"
                name="tel"
                class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                placeholder="08033443344"
                @keydown="error = false"
              />
            </div>
            <ErrorMessage
              name="tel"
              class="tw-block tw-text-red-500 tw-text-sm"
            />
          </div>
        </div>
      </div>
      <div class="tw-flex -tw-mx-3">
        <div class="tw-w-full tw-px-3 tw-mb-5">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >Password</label
          >
          <div class="tw-flex tw-flex-wrap">
            <div
              class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              <i
                class="mdi mdi-lock-outline tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
              ></i>

              <Field
                type="password"
                v-model="password"
                required
                class="password tw-w-full tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                placeholder="************"
                @keydown="error = false"
                name="password"
              />
            </div>
            <ErrorMessage
              name="password"
              class="tw-block tw-text-red-500 tw-flex-grow tw-text-sm"
            />
          </div>
        </div>
      </div>
      <div class="tw-flex -tw-mx-3">
        <div class="tw-w-full tw-px-3 tw-mb-5">
          <button
            :disabled="loading"
            :class="buttonStyleClass(meta.valid)"
            class="tw-block tw-w-full max-w-xs tw-mx-auto tw-text-white tw-rounded-lg tw-px-3 tw-py-3 tw-font-semibold"
          >
            <span v-if="loading"
              >Signing in <span class="mdi mdi-star mdi-spin tw-text-xl"></span>
            </span>
            <span v-else class="animate-spin"
              >LOGIN
              <span
                class="mdi mdi-arrow-right-bold mdi-rotate-270"
                :class="{}"
              ></span>
            </span>
          </button>
          <div class="tw-m-4 tw-text-gray-800">
            Don't have an account?
            <router-link
              to="/user/register"
              class="tw-font-bold tw-text-blue-800"
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
      tel: yup
        .string()
        .required()
        .matches(
          /^[+]?(234)?0?[7-9][0-1][0-9]{8}$/,
          "Phone number format is not valid"
        ),
      password: yup
        .string()
        .required()
        .min(8),
    });
    return {
      schema,
      tel: "",
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
          "tw-bg-indigo-300  tw-cursor-not-allowed": true,
        };
      }
      return {
        "tw-bg-indigo-500 focus:bg-indigo-700 hover:bg-indigo-700": true,
      };
    },
    login: function() {
      this.error = false;
      //console.log("submitting to server");
      if (this.loading) return false;
      this.loading = true;
      this.errorMessages = [];
      let loginData = { tel: this.tel, password: this.password };
      //store.dispatch("login", loginData);
      this.axios
        .post(process.env.VUE_APP_APIURL + "/login", loginData)
        .then((response) => {
          console.log("User signed in response received from server!");
          this.loading = false;
          //console.log(response.data);
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
          console.log(response.data);
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
<style lang="scss" scoped>
input:not([type]),
input[type="text"]:not(.browser-default),
input[type="password"]:not(.browser-default) {
  background-color: #fff;
  border: 2px solid rgba(229, 231, 235, var(--tw-border-opacity));
  border-radius: 0.5rem;
  padding-left: 2.5rem;
  width: 100%;
}
</style>
