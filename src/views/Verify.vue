<template>
  <div class="about pt-24">
    <div class="p-0 gradient">
      <!-- <loading v-if="adsIsLoading"></loading> -->
      <div class="p-4 bg-white text-gray-800">
        <h2
          class="capitalize text-indigo-800 text-center bg-gray-100 p-2 text-2xl font-bold"
        >
          {{ title }}
        </h2>
        <p v-if="type == 'email'">
          Hmm, Thanks for signing up! Before continuing, please verify your
          {{ type }} by clicking on the link we emailed to you? If you didn't
          receive the email, we will gladly send you another.
        </p>
        <div class="">
          <p
            v-if="data && data.status == 1"
            class="text-center text-green-800 p-4"
          >
            {{ data.message }}
          </p>
          <p v-else>
            Hmm, Thanks for signing up! Before continuing, please verify your
            {{ type }} ({{ user.tel }}) by entering the 5 digits CODE sent to
            your phone and clicking on the <strong>Verify</strong> button below.
            If you didn't receive the SMS, we will gladly send you another one.
          </p>
          <div class="w-1/2 m-auto text-center input-field">
            <label for="verification_code">Enter Code:</label>
            <input
              type="number"
              name="verification_code"
              id=""
              v-model="verificationCode"
              class="rounded-md ml-3 mr-2"
              @keydown="error = false"
            />
            <Button
              class="rounded-md"
              :loading="loading"
              @click="verify('tel')"
            >
              Verify
            </Button>
            <span v-if="error" class="text-red-600 block text-center">{{
              errorMessage
            }}</span>
          </div>
        </div>
        <button
          @click="resend('tel')"
          v-if="!reachedResendLimit"
          class="border-blue-700 border-2 text-gray-500 p-2 rounded-lg m-auto block mt-8 cursor-pointer hover:bg-blue-900 hover:text-gray-50 text-sm"
        >
          Resend Verification Code
        </button>
        <div v-if="reachedResendLimit" class="text-red-600 text-center p-4">
          {{ resendLimitMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Button from "@/components/Button";
import router from "../router";
import store from "../store";
// import Loading from "@/components/Loading.vue";

export default {
  components: {
    Button,
    // Loading,
  },
  data() {
    return {
      title: "Verify your Phone No. To Continue",
      type: "",
      verificationCode: "",
      loading: false,
      error: false,
      errorMessage: "",
      reachedResendLimit: false,
      resendLimitMessage: null,
      data: null,
      //wrongCode: false,
    };
  },
  computed: {
    ...mapState(["accessToken", "user"]),
  },
  methods: {
    resend() {
      alert(this.accessToken);
      this.axios
        .post(
          process.env.VUE_APP_APIURL + "/verify/resend_tel_code",
          { name: "Dzb" },
          {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          }
        )
        .then((response) => {
          if (response.data.status == 2) {
            this.reachedResendLimit = true;
            this.resendLimitMessage = response.data.message;
          } else if (response.data.status == 1) {
            this.data = response.data;
          }
        })
        .catch(() => {
          alert("Sorry, an error occurred on the Server. Try again later.");
        });
    },
    verify(type) {
      this.loading = true;
      if (this.verificationCode.length != 5) {
        this.error = true;
        this.errorMessage = "Code must be 5 digits";
        this.loading = false;
        return;
      }
      this.axios
        .post(
          process.env.VUE_APP_APIURL + "/verify/" + type,
          {
            code: this.verificationCode,
          },
          {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          }
        )
        .then((response) => {
          if (response.data.status == 1) {
            store.dispatch("setProps", {
              user_tel_verified: response.data.status,
            });
            router.push("/userarea");
          } else if (response.data.status == -1) {
            this.error = true;
            this.errorMessage = response.data.message;
          }
        })
        .catch(() => {
          alert("An error occurred on the server. Try again later.");
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  created() {
    if (this.$route.params.type == "tel") {
      this.title = "Verify your Phone No. To Continue";
      this.type = "Phone No.";
    } else if (this.$route.params.type == "email") {
      this.title = "Verify your Email to continue";
      this.type = "Email Address";
    }
  },
};
</script>
<style lang="scss" scoped></style>
