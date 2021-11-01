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
      <div class="flex mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Phone No.</label>
          <div class="flex flex-wrap">
            <div class="relative w-full flex items-center justify-center">
              <i
                class="mdi mdi-cellphone absolute block left-0 -ml-6 w-10 pl-1 text-center pointer-events-none"
              ></i>
              <Field
                type="text"
                required
                v-model="tel"
                name="tel"
                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="08033443344"
                @keydown="error = false"
              />
            </div>
            <ErrorMessage name="tel" class="block text-red-500 text-sm" />
          </div>
        </div>
      </div>
      <div class="flex mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Password</label>
          <div class="flex flex-wrap">
            <div class="relative w-full flex items-center justify-center">
              <i
                class="mdi mdi-lock-outline absolute block left-0 -ml-6 w-10 pl-1 text-center pointer-events-none"
              ></i>
              <Field
                type="password"
                v-model="password"
                required
                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="************"
                @keydown="error = false"
                name="password"
              />
            </div>
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
          "bg-indigo-300  cursor-not-allowed": true,
        };
      }
      return {
        "bg-indigo-500 focus:bg-indigo-700 hover:bg-indigo-700": true,
      };
    },
    login: function() {
      this.error = false;
      if (this.loading) return false;
      this.loading = true;
      this.errorMessages = [];
      let loginData = { tel: this.tel, password: this.password };
      //store.dispatch("login", loginData);
      this.axios
        .post(process.env.VUE_APP_APIURL + "/login", loginData)
        .then((response) => {
          this.loading = false;
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
        })
        .catch(() => {
          this.loading = false;
          this.errorMessages.push(
            "An error ocurred from the server. Please check and try again."
          );
          this.error = true;
        }); // credentials didn't match
    },
  },
};
</script>
<style lang="scss" scoped></style>
