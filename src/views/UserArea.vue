<template>
  <div class="about">
    <div class="tw-p-0 gradient">
      <!-- <loading v-if="adsIsLoading"></loading> -->
      <div class="tw-p-4 tw-bg-white">
        <div class="">
          <img
            :src="user.dp"
            alt=""
            class="tw-bg-gray-300 tw-block tw-m-auto tw-rounded-full tw--mt-2 tw-z-30 tw-border-8 tw-border-gray-500 tw-w-32 tw-relative"
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
          <!-- <div class="tw-p-2" @click="setAction('viewAds')" :class="getClass('viewAds')">
            <span class="mdi mdi-shopping-outline tw-text-sm"></span> <br>
            Ads <sup>{{user.ads.length}}</sup>
          </div>
          <div class="tw-p-2 tw-bg-blue-500" @click="setAction('favorites')" :class="styleClass">
            <span class="mdi mdi-heart-multiple tw-text-sm"></span> <br>
            Favorites <sup>{{user.favorites.length}}</sup>
          </div>
          <div class="tw-p-2 tw-bg-white tw-text-black tw-rounded-t-md" @click="setAction('messages')">
            <span class="mdi mdi-message-bulleted tw-text-sm"></span> <br>
            Messages <sup>{{user.messages.length}}</sup>
          </div>
          <div class="tw-p-2 tw-bg-blue-500" @click="setAction('profile')">
            <span class="mdi mdi-account-settings tw-text-sm"></span> <br>
            Profile
          </div> -->
        </div>
      </div>
      <div id="action-area" class=" tw-bg-white tw-text-red-900 tw-p-4">
        <div v-if="currentAction == 'ads'">
          <ul v-if="user.ads.length > 0">
            <li
              v-for="result in user.ads"
              :key="result.id"
              class="tw-flex tw-shadow-md tw-p-2 tw-bg-white hover:tw-bg-indigo-50 tw-mt-1 border"
            >
              <div class="tw-w-1/4 tw-flex tw-justify-center tw-items-center">
                <img
                  :src="result.ad_image"
                  alt=""
                  class="tw-w-20 md:tw-w-2/4"
                />
              </div>
              <div class="tw-relative tw-w-3/4">
                <h4 class="tw-text-black tw-font-bold tw-p-2">
                  <router-link :to="'/ads/' + result.id">{{
                    result.title
                  }}</router-link>
                </h4>
                <p
                  class="tw-p-2 tw-line-clamp-2 md:tw-line-clamp-none tw-text-gray-700"
                >
                  {{ result.description }}
                </p>
                <div
                  class="tw-bg-gray-50 tw-px-2 tw-py-1 tw-flex tw-justify-between tw-w-full  "
                >
                  <button
                    class="tw-w-1/3 tw-border-b-2 tw-border-blue-700 tw-text-blue-700 hover:tw-bg-blue-700 hover:tw-text-white"
                  >
                    Edit
                  </button>
                  <button
                    class="tw-w-1/3 tw-border-b-2 tw-border-red-700 tw-text-red-700 tw-p-1 hover:tw-bg-red-700 hover:tw-text-white"
                  >
                    Delete
                  </button>
                  <div class="tw-w-1/3 tw-text-center">
                    {{ result.hits }} Views
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="tw-p-2" v-if="currentAction == 'profile'">
          <div>
            <h2>Profile loading . . .</h2>
          </div>
        </div>
        <div class="tw-p-2" v-if="currentAction == 'favorites'">
          <div>
            <h2>Favorites loading . . .</h2>
          </div>
        </div>
        <div class="tw-p-2" v-if="currentAction == 'messages'">
          <div>
            <h2>Messages loading . . .</h2>
          </div>
        </div>
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
    return {
      currentAction: "ads",
      styleClass: {},
      actions: [
        {
          name: "ads",
          icon: "mdi mdi-shopping-outline tw-text-sm",
          count: 0,
        },
        {
          name: "favorites",
          icon: "mdi mdi-heart-multiple tw-text-sm",
          count: 0,
        },
        {
          name: "messages",
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
      return name != "profile" ? this.user[`${name}`].length : "";
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
