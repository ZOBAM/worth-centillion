<template>
  <div class="about">
    <div class="tw-p-0 gradient">
      <!-- <loading v-if="adsIsLoading"></loading> -->
      <div class="tw-p-4 tw-bg-white">
        <div class="">
          <img
            :src="user.dp"
            alt=""
            class="tw-bg-gray-300 tw-block tw-m-auto tw-rounded-full tw--mt-2 tw-border-8 tw-border-gray-100 tw-w-32 tw-relative"
          />
          <!-- <span
            class="tw-text-3xl mdi mdi-camera tw-text-red-700 tw-absolute tw-right-1/3 tw--mt-4"
          ></span> -->
          <div class="tw-text-center tw-text-gray-800 tw-mt-4">
            <span class="tw-font-bold">{{
              `${user.first_name} ${user.last_name}`
            }}</span
            ><br />
            <template v-if="user.email"
              ><span>{{ user.email }}</span></template
            >
            <span class="tw-block tw-font-serif tw-font-bold">{{
              `${user.tel}`
            }}</span>
          </div>
        </div>
        <div
          id="action-tabs"
          class="tw-bg-blue-600 tw-flex tw-justify-around tw-pt-2 tw-mt-8"
        >
          <div
            v-for="tab in actions"
            :key="tab.name"
            class="tw-p-2 tw-cursor-pointer"
            @click="setAction(tab.name)"
            :class="isAction(tab.name)"
          >
            <span :class="tab.icon"></span> <sup>{{ getCount(tab.name) }}</sup>
            <br />
            <span class="tw-capitalize">{{ tab.name }}</span>
          </div>
        </div>
      </div>
      <div id="action-area" class=" tw-bg-white tw-text-red-900 tw-p-4">
        <div v-if="currentAction == 'ads'">
          <user-ads :items="items"></user-ads>
        </div>
        <div class="tw-p-2" v-if="currentAction == 'profile'">
          <div>
            <register
              @updated="readOnly = true"
              :isEditing="true"
              :readOnly="readOnly"
            ></register>
            <button
              @click="readOnly = !readOnly"
              class="btn-primary"
              :class="{
                'tw-border-2 tw-border-red-600 tw-text-red-600 tw-bg-white': !readOnly,
              }"
            >
              {{ !readOnly ? "Cancel Editing" : "Edit Details" }}
            </button>
          </div>
        </div>
        <div class="tw-p-2" v-if="currentAction == 'wallet'">
          <div>
            <wallet />
          </div>
        </div>
        <div class="tw-p-2" v-if="currentAction == 'transactions'">
          <div>
            <transactions></transactions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Transactions from "@/components/Transactions.vue";
import Wallet from "@/components/vtu/Wallet";
import Register from "@/components/auth/Register.vue";
import UserAds from "@/components/ads/UserAds.vue";

export default {
  components: {
    Transactions,
    Wallet,
    Register,
    UserAds,
  },
  data() {
    return {
      currentAction: "ads",
      styleClass: {},
      readOnly: true,
      actions: [
        {
          name: "ads",
          icon: "mdi mdi-shopping-outline tw-text-sm",
          count: 0,
        },
        {
          name: "wallet",
          icon: "mdi mdi-cash tw-text-sm",
          count: 0,
        },
        {
          name: "transactions",
          icon: "mdi mdi-message-bulleted tw-text-sm",
          count: 0,
        },
        {
          name: "profile",
          icon: "mdi mdi-account-settings tw-text-sm",
          count: 0,
        },
      ],
      activeStyle: {
        "tw-bg-white": true,
        "tw-text-black": true,
        "tw-rounded-t-md": true,
      },
      inactiveStyle: {
        "tw-bg-blue-500": true,
        "tw-text-white": true,
      },
    };
  },
  computed: {
    items() {
      return this.user.ads;
    },
    ...mapState(["user", "adsIsLoading"]),
    getClass() {
      return this.styleClass;
    },
    getUser() {
      return this.user;
    },
  },
  methods: {
    getCount(name) {
      return name == "ads" ? this.user[`${name}`].length : "";
    },
    setAction(action) {
      this.currentAction = action;
    },
    isAction(action) {
      if (this.currentAction == action) {
        return this.activeStyle;
      } else {
        return this.inactiveStyle;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#action-tabs > div {
  min-width: 24%;
  text-align: center;
  transition: 0.5s all;
}
#action-tabs > div:hover {
  background-color: #fff;
  color: rebeccapurple;
}
</style>
