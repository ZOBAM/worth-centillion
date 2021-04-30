<template>
  <div class="about">
    <div class="p-0 gradient">
      <!-- <loading v-if="adsIsLoading"></loading> -->
      <div class="p-4 bg-white">
        <div class="">
          <img
            :src="user.dp"
            alt=""
            class="bg-gray-300 block m-auto rounded-full -mt-12 z-30 border-8 border-gray-50 w-32"
          />
          <div class="text-center text-gray-800 mt-4">
            <span class="font-bold">{{
              `${user.first_name} ${user.last_name}`
            }}</span
            ><br />
            <span>{{ `(${user.email})` }}</span>
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
          <!-- <div class="p-2" @click="setAction('viewAds')" :class="getClass('viewAds')">
            <span class="mdi mdi-shopping-outline text-sm"></span> <br>
            Ads <sup>{{user.ads.length}}</sup>
          </div>
          <div class="p-2 bg-blue-500" @click="setAction('favorites')" :class="styleClass">
            <span class="mdi mdi-heart-multiple text-sm"></span> <br>
            Favorites <sup>{{user.favorites.length}}</sup>
          </div>
          <div class="p-2 bg-white text-black rounded-t-md" @click="setAction('messages')">
            <span class="mdi mdi-message-bulleted text-sm"></span> <br>
            Messages <sup>{{user.messages.length}}</sup>
          </div>
          <div class="p-2 bg-blue-500" @click="setAction('profile')">
            <span class="mdi mdi-account-settings text-sm"></span> <br>
            Profile
          </div> -->
        </div>
      </div>
      <div id="action-area" class=" bg-white text-red-900 p-4">
        <div v-if="currentAction == 'ads'">
          <ul v-if="user.ads.length > 0">
            <li
              v-for="result in user.ads"
              :key="result.id"
              class="flex shadow-md p-2 bg-white hover:bg-indigo-50 mt-1 border"
            >
              <div class="w-1/4 flex justify-center items-center">
                <img :src="result.ad_image" alt="" class="w-20 md:w-2/4" />
              </div>
              <div class="relative w-3/4">
                <h2 class=" text-black font-bold p-2">
                  <router-link :to="'/ads/' + result.id">{{
                    result.title
                  }}</router-link>
                </h2>
                <p class="p-2 line-clamp-2 md:line-clamp-none text-gray-700">
                  {{ result.description }}
                </p>
                <div class="bg-gray-50 px-2 py-1 flex justify-between w-full  ">
                  <button
                    class="w-1/3 border-b-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    class="w-1/3 border-b-2 border-red-700 text-red-700 p-1 hover:bg-red-700 hover:text-white"
                  >
                    Delete
                  </button>
                  <div class="w-1/3 text-center">{{ result.hits }} Views</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="p-2" v-if="currentAction == 'profile'">
          <div>
            <h2>Profile loading . . .</h2>
          </div>
        </div>
        <div class="p-2" v-if="currentAction == 'favorites'">
          <div>
            <h2>Favorites loading . . .</h2>
          </div>
        </div>
        <div class="p-2" v-if="currentAction == 'messages'">
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
          icon: "mdi mdi-shopping-outline text-sm",
          count: 0,
        },
        {
          name: "favorites",
          icon: "mdi mdi-heart-multiple text-sm",
          count: 0,
        },
        {
          name: "messages",
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
