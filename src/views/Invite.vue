<template>
  <div class="bg-gray-100 p-4">
    <h1 class="text-blue-700 font-bold text-3xl text-center my-8">
      Invite & Earn Bonus
    </h1>
    <article class=" max-w-[54rem] m-auto">
      <section class="bg-blue-100 flex justify-between text-center">
        <div
          @click="setTab('sms')"
          class="p-2 border-2 border-blue-600 w-1/3 cursor-pointer"
          :class="{ 'bg-blue-200': currentTab == 'sms' }"
        >
          Text/SMS
        </div>
        <div
          @click="setTab('email')"
          class="p-2 border-2 border-blue-600 w-1/3 cursor-pointer"
          :class="{ 'bg-blue-200': currentTab == 'email' }"
        >
          Email
        </div>
        <div
          @click="setTab('share')"
          class="p-2 border-2 border-blue-600 w-1/3 cursor-pointer"
          :class="{ 'bg-blue-200': currentTab == 'share' }"
        >
          Share Link
        </div>
      </section>
      <section class="bg-gray-200 p-2">
        <p class="p-2 bg-white w-5/6 m-auto text-center">
          <span v-if="currentTab != 'share'"
            >A message will be sent to the contact you provide below. You can
            check the preview of the sent message after providing the contact
            details below.</span
          >
          <span v-else>
            Copy the link below and share it with anyone you want to invite. Ask
            them to follow the link and register and when they do, you will earn
            points.
          </span>
        </p>
        <div
          v-if="inviteReport"
          id="report"
          class="p-4 mt-6 text-center"
          :class="{
            'bg-green-200': status == 1,
            'bg-red-200': status == 2,
            'bg-blue-200': status == 0,
          }"
        >
          {{ inviteReport }}
        </div>
        <Form @submit="invite" :validation-schema="schema" class="my-8">
          <div class="overflow-hidden">
            <label for="tel" class="ml-4">{{ inputLabel }}</label>
            <Field
              type="text"
              :name="inputName"
              :placeholder="inputPlaceholder"
              style="padding-left:1rem; background-color: white"
              class="w-full bg-white rounded-2xl"
              v-model="inputValue"
              id="inputField"
              @keyup="resistLinkChange"
            />
            <ErrorMessage
              :name="inputName"
              class="block text-red-500 text-sm"
              v-if="currentTab != 'share'"
            />
          </div>
          <div class="mt-4 center">
            <Button :loading="loading">
              {{ currentTab == "share" ? copyClue : "Invite" }}
            </Button>
          </div>
        </Form>
        <div v-if="currentTab != 'share'" class="">
          <div class="bg-blue-200 text-right px-2 py-1 text-xs">
            Invite Message Preview
          </div>
          <div class="bg-blue-200 px-2 pb-2">
            <p
              class="bg-gray-50 p-2 rounded-2xl overflow-x-auto"
              v-if="loadingPreview"
            >
              Loading . . .
            </p>
            <p
              class="bg-gray-50 p-2 rounded-2xl overflow-x-auto"
              v-html="previewMsg"
              v-else
            ></p>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//import { mapState } from "vuex";
//import { computed } from "@vue/runtime-core";
import store from "../store";
import Button from "../components/Button.vue";
import setTitle from "../utilities/setTitle";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
//import gsap from "gsap";

export default {
  name: "Invite",
  components: { Field, Form, ErrorMessage, Button },
  data() {
    const schema = yup.object({
      tel: yup
        .string()
        .required()
        .matches(
          /^[+]?(234)?0?[7-9][0-1][0-9]{8}$/,
          "Phone number format is not valid"
        )
        .label("Phone number"),
      email: yup

        .string()
        .required()
        .email(),
    });
    return {
      schema,
    };
  },
  setup() {
    const route = useRoute();
    const user = store.state.user;
    const loadingPreview = ref(false);
    const currentTab = ref("sms");
    const inputLabel = ref("Phone No.");
    const inputPlaceholder = ref("enter phone number");
    const inputName = ref("tel");
    const inputValue = ref("");
    const referralLink = ref("Loading . . .");
    const copyClue = ref("Copy Link");
    const previewMsg = ref("");
    const loading = ref(false);
    const inviteReport = ref("");
    const status = ref(0);

    const resistLinkChange = () => {
      //alert("Changing input");
      if (currentTab.value == "share") {
        setTimeout(() => {
          inputValue.value = referralLink.value;
        }, 500);
      }
    };
    const setTab = (tab) => {
      if (currentTab.value != tab) {
        currentTab.value = tab;
        inputValue.value = "";
        switch (currentTab.value) {
          case "share":
            inputLabel.value = "Your Referral Link";
            inputPlaceholder.value = "";
            inputValue.value = referralLink.value;
            inputName.value = "share";
            break;
          case "email":
            inputLabel.value = "Email Address";
            inputPlaceholder.value = "enter email address";
            inputName.value = "email";
            break;
          default:
            inputLabel.value = "Phone No.";
            inputPlaceholder.value = "enter phone number";
            inputName.value = "tel";
        }
      }
    };
    const invite = (values) => {
      //console.log(values[inputName.value]);
      if (currentTab.value == "share") {
        let inputField = document.getElementById("inputField");
        inputField.select();
        inputField.setSelectionRange(0, 99999);
        document.execCommand("copy");
        copyClue.value = "Copied";
        setTimeout(() => (copyClue.value = "Copy Link Again"), 3000);
        /* M.toast({
          html: "Link Copied!",
          displayLength: 4000,
        }); */
      } else {
        loading.value = true;
        axios
          .post(process.env.VUE_APP_APIURL + "/invite", values)
          .then((response) => {
            //console.log(response.data);
            status.value = response.data.status;
            inviteReport.value = response.data.msg;
            setTimeout(() => {
              inviteReport.value = "";
              loading.value = false;
            }, 9500);
          })
          .catch((error) => {
            console.log(error);
            loading.value = false;
          });
      }
    };
    onMounted(() => {
      setTitle(route);
      loadingPreview.value = true;
      setTimeout(() => {
        console.log("mounted");
        axios.get(process.env.VUE_APP_APIURL + "/invite").then((response) => {
          previewMsg.value = response.data.invitation_msg;
          referralLink.value = response.data.invitation_link;
          loadingPreview.value = false;
          if (currentTab.value == "share") {
            inputValue.value = referralLink.value;
          }
          console.log(response);
        });
      }, 100);
    });
    return {
      user,
      resistLinkChange,
      setTab,
      invite,
      currentTab,
      inputLabel,
      inputPlaceholder,
      inputName,
      inputValue,
      referralLink,
      copyClue,
      loadingPreview,
      previewMsg,
      loading,
      inviteReport,
      status,
    };
  },
};
</script>
<style lang="scss" scoped>
#report {
  animation-name: report-animate;
  animation-duration: 1s;
  animation-delay: 8.5s;
}
@keyframes report-animate {
  0% {
    height: auto;
    background-color: red;
  }
  100% {
    height: 0px;
    background-color: none;
    padding: 0px;
    margin: 0px;
    font-size: 0px;
    scale: 0;
  }
}
</style>
