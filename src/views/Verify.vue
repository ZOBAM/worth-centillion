<template>
  <div class="about tw-pt-24">
    <div class="tw-p-0 gradient">
      <!-- <loading v-if="adsIsLoading"></loading> -->
      <div class="tw-p-4 tw-bg-white tw-text-gray-800">
        <h2
          class="tw-capitalize tw-text-indigo-800 tw-text-center tw-bg-gray-100 tw-p-2 tw-text-2xl tw-font-bold"
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
            class="tw-text-center tw-text-green-800 tw-p-4"
          >
            {{ data.message }}
          </p>
          <p v-else>
            Hmm, Thanks for signing up! Before continuing, please verify your
            {{ type }} by entering the 5 digits CODE sent to your phone and
            clicking on the <strong>Verify</strong> button below. If you didn't
            receive the SMS, we will gladly send you another one.
          </p>
          <div class="tw-w-1/2 tw-m-auto tw-text-center input-field">
            <label for="verification_code">Enter Code:</label>
            <input
              type="number"
              name="verification_code"
              id=""
              v-model="verificationCode"
              class="tw-rounded-md tw-ml-3 tw-mr-2"
              @keydown="error = false"
            />
            <Button
              class="tw-rounded-md"
              :loading="loading"
              @click="verify('tel')"
            >
              Verify
            </Button>
            <span
              v-if="error"
              class="tw-text-red-600 tw-block tw-text-center"
              >{{ errorMessage }}</span
            >
          </div>
        </div>
        <button
          @click="resend('tel')"
          v-if="!reachedResendLimit"
          class="tw-border-blue-700 tw-border-2 tw-text-gray-500 tw-p-2 tw-rounded-lg tw-m-auto tw-block tw-mt-8 tw-cursor-pointer hover:tw-bg-blue-900 hover:tw-text-gray-50 tw-text-sm"
        >
          Resend Verification Code
        </button>
        <div
          v-if="reachedResendLimit"
          class="tw-text-red-600 tw-text-center tw-p-4"
        >
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
          //console.log(response.data);
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
              name: "tel_verified",
              value: response.data.status,
              type: "user",
            });
            router.push("/userarea");
          } else if (response.data.status == -1) {
            this.error = true;
            this.errorMessage = response.data.message;
          }
          //console.log(response.data);
        })
        .catch(() => {
          alert("An error occured on the server. Try again later.");
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
