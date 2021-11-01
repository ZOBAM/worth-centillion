<template>
  <div class="about">
    <div class="p-0 gradient">
      <!-- <loading v-if="adsIsLoading"></loading> -->
      <div class="p-4 bg-white">
        <div class="">
          <img
            :src="user.dp"
            alt=""
            class="bg-gray-300 block m-auto rounded-full -mt-2 border-8 border-gray-100 w-32 relative"
          />
          <!-- <span
            class="text-3xl mdi mdi-camera text-red-700 absolute right-1/3 -mt-4"
          ></span> -->
          <div class="text-center text-gray-800 mt-4">
            <span class="font-bold">{{
              `${user.first_name} ${user.last_name}`
            }}</span
            ><br />
            <template v-if="user.email"
              ><span>{{ user.email }}</span></template
            >
            <span class="block font-serif font-bold">{{ `${user.tel}` }}</span>
          </div>
        </div>
        <div id="action-tabs" class="bg-blue-600 flex justify-around pt-2 mt-8">
          <div
            v-for="tab in actions"
            :key="tab.name"
            class="p-2 cursor-pointer"
            @click="setAction(tab.name)"
            :class="isAction(tab.name)"
          >
            <span :class="tab.icon"></span> <sup>{{ getCount(tab.name) }}</sup>
            <br />
            <span class="capitalize">{{ tab.name }}</span>
          </div>
        </div>
      </div>
      <div id="action-area" class=" bg-white p-4">
        <div v-if="currentAction == 'ads'">
          <user-ads :items="items"></user-ads>
        </div>
        <div class="p-2" v-if="currentAction == 'profile'">
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
                'border-2 border-red-600 text-red-600 bg-white': !readOnly,
              }"
            >
              {{ !readOnly ? "Cancel Editing" : "Edit Details" }}
            </button>
          </div>
        </div>
        <div class="p-2" v-if="currentAction == 'wallet'">
          <div>
            <wallet />
          </div>
        </div>
        <div class="p-2" v-if="currentAction == 'transactions'">
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
          icon: "mdi mdi-shopping-outline text-sm",
          count: 0,
        },
        {
          name: "wallet",
          icon: "mdi mdi-cash text-sm",
          count: 0,
        },
        {
          name: "transactions",
          icon: "mdi mdi-message-bulleted text-sm",
          count: 0,
        },
        {
          name: "profile",
          icon: "mdi mdi-account-settings text-sm",
          count: 0,
        },
      ],
      activeStyle: {
        "bg-white": true,
        "text-black": true,
        "rounded-t-md": true,
      },
      inactiveStyle: {
        "bg-blue-500": true,
        "text-white": true,
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
