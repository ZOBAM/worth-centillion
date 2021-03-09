<template>
  <div class="about pt-24">
    <div class="p-0 gradient">
      <!-- <loading v-if="adsIsLoading"></loading> -->
      <div class="p-4 bg-white text-gray-800">
        <h2 class="capitalize text-indigo-800 text-center bg-gray-100 font-bold p-2"> Verify your email to continue</h2>
        <p>Hmm,
          Thanks for signing up! Before continuing, please verify your email address by clicking on the link we emailed to you? If you didn't receive the email, we will gladly send you another.
        </p>
        <button 
          @click="resendEmail()"
          class="bg-blue-700 text-red-50 p-2 rounded-lg m-auto block mt-4 cursor-pointer hover:bg-blue-900 text-sm"
        >Resend Verification Email</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import Loading from "@/components/Loading.vue";

export default {
  components: {
    // Loading,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["accessToken"])
  },
  methods: {
    resendEmail(){
      alert(this.accessToken);
      this.axios.get(process.env.VUE_APP_APIURL+"/resend_verification_main",{headers:{'Authorization': `Bearer ${this.accessToken}`}}).then(response => {
          console.log('User resend from server!');
          console.log(response.data);
        })
    },
  },
};
</script>
<style lang="scss" scoped>

</style>