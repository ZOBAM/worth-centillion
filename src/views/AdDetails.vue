<template>
  <div class="about">
    <div v-if="ad" class="sm:tw-flex">
      <div
        class="tw-py-4 tw-bg-white sm:tw-w-2/3 tw-flex-col tw-justify-center tw-text-gray-700"
      >
        <h1 class="tw-text-center tw-text-2xl tw-mt-3">{{ ad.title }}</h1>
        <swiper
          navigation
          :pagination="{ clickable: true }"
          v-if="ad.ad_images"
        >
          <swiper-slide v-for="image of ad.ad_images" :key="image.id">
            <img
              :src="ad.ad_images ? image.link : ad.no_images"
              class="tw-block tw-m-auto tw-my-8 border-2 tw-border-red-600"
              style="max-height: 70vh; display: block;"
            />
          </swiper-slide>
        </swiper>
        <template v-else>
          <img
            :src="ad.no_images"
            class="tw-block tw-m-auto tw-my-8 border-2 tw-border-red-600"
            style="max-height: 70vh; display: block;"
          />
        </template>
        <div
          id="action-links"
          class="tw-flex tw-justify-around tw-shadow-md tw-mx-4"
        >
          <span class="tw-inline-block tw-bg-gray-200" aria-disabled="true"
            >{{ ad.hits }} <span class="mdi mdi-eye"></span>
          </span>
          <span
            v-if="ad.ad_images"
            class="tw-inline-block tw-bg-gray-200"
            aria-disabled="true"
            >{{ ad.ad_images.length }} <span class="mdi mdi-image"></span>
          </span>
          <div class="tw-relative tw-border-2 ">
            <span class="tw-inline-block tw-top-3 tw-absolute tw-pl-2">{{
              likes
            }}</span>
            <a
              href=""
              class="tw-inline-block tw-relative"
              @click.prevent="like(ad.id)"
            >
              <span :class="heartIcon" id="like-button"></span>
            </a>
          </div>
        </div>
        <div class="tw-bg-gray-200 md:tw-p-4">
          <h5 class="tw-text-center tw-relative tw-p-2">
            <span class="tw-font-extrabold tw-text-center"
              >₦{{ ad.price }}<br />
              <span v-if="ad.negotiable" class="tw-text-sm"> (Negotiable)</span>
            </span>
            <span
              class="tw-absolute tw-right-0 tw-font-thin"
              style="font-size: .6em"
              >{{ ad.created }}</span
            >
          </h5>
          <div class="tw-bg-gray-50 tw-p-4">
            <ul>
              <!-- <li v-for="(value, name, index) in ad" v-bind:key = "index">
              {{name}} : {{value}}
            </li> -->
              <li>
                <strong class="tw-font-bold ">Location:</strong>
                {{ ad.place.split(":")[0] }},
                {{ ad.state.split(":")[0] }}
              </li>
              <li v-for="(fieldName, index) of adDetails" :key="index">
                <strong class="tw-capitalize tw-font-bold">{{
                  index.replace("_", " ")
                }}</strong>
                {{ fieldName }}
              </li>
              <li class="tw-overflow-hidden">
                <strong class="tw-font-bold">Description:</strong>
                {{ ad.description }}
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tw-p-4 tw-bg-blue-50 sm:tw-w-1/3">
        <div class="tw-p-4 tw-text-gray-800 tw-bg-white">
          <div
            class="tw-text-center tw-bg-blue-500 tw-text-white tw-p-2 tw-font-bold tw-rounded-xl tw-border-4 tw-border-blue-100"
          >
            {{ ad.seller.first_name + " " + ad.seller.last_name }}
          </div>
          <img
            :src="ad.seller.dp"
            alt="seller profile picture"
            class="tw-block tw-m-auto tw-rounded-full tw-mt-4 tw-w-20 tw-max-h-24"
          />
          <div
            class="tw-flex tw-mt-12 tw-justify-between tw-text-xs tw-text-center"
          >
            <div class="tw-px-2 tw-py-1 tw-border-b-4 tw-border-blue-100">
              <span class="mdi mdi-account-plus tw-text-sm"></span> <br />
              <span class="tw-font-bold">Joined</span> <br />
              <h-date :date="ad.seller.created_at" :shorten="true" />
            </div>
            <div class="tw-bg-blue-500 tw-text-white tw-p-2">
              <span class="mdi mdi-shopping-outline tw-text-sm"></span> <br />
              <span class="tw-font-bold">Total Ads</span> <br />
              {{ ad.seller.ads_count }}
            </div>
            <div class="tw-px-2 tw-py-1 tw-border-b-4 tw-border-blue-100">
              <span class="mdi mdi-eye-check-outline tw-text-sm"></span> <br />
              <span class="tw-font-bold">Last Seen</span> <br />
              <h-date :date="ad.seller.updated_at" :shorten="true" />
            </div>
          </div>
          <div
            class="tw-from-blue-600 tw-via-blue-400 tw-bg-gradient-to-r tw-mt-6 tw-rounded-2xl tw-p-2 tw-relative"
          >
            <span class="tw-text-white">Call Seller:</span>
            <div
              class="tw-bg-gray-100 tw-rounded-2xl tw-p-2 tw-absolute tw-right-4 tw-bottom-0"
            >
              {{ ad.seller.tel }}
            </div>
          </div>
          <div
            class="tw-flex tw-justify-center tw-flex-wrap"
            v-if="user && ad.seller.id != user.id"
          >
            <button
              class="tw-bg-white tw-text-blue-500 tw-shadow-lg tw-text-center tw-font-semibold tw-mt-3 tw-p-3 tw-m-auto hover:tw-bg-blue-500 hover:tw-text-white"
              @click="chatSeller = !chatSeller"
            >
              Chat Seller <span class="mdi mdi-message"></span>
            </button>
            <template v-if="chatSeller" class="tw-w-full">
              <div class="tw-p-2 tw-w-full">
                <textarea
                  v-model="chatMessage"
                  name=""
                  id=""
                  cols="30"
                  rows="20"
                  class="tw-h-20 tw-rounded-lg border-2 tw-border-blue-500 tw-shadow-lg"
                ></textarea>
              </div>
              <button class="btn-primary" @click="sendMessage(ad.id)">
                Send <span class="mdi mdi-send"></span>
              </button>
            </template>
            <div class="tw-w-full" v-if="messageSuccess">
              {{ resetVariables() }}
              <div
                class="tw-text-center tw-w-24 tw-h-24 tw-mt-3 tw-m-auto tw-rounded-full tw-border-2 tw-border-blue-500"
              >
                <span class="mdi mdi-check tw-text-5xl tw-text-blue-400"></span>
                <p class="tw-p-2 tw-text-xs tw--mt-2">Message sent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import HDate from "@/components/HDate.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
//import gsap
import { gsap } from "gsap";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import M from "materialize-css";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { mapState } from "vuex";
import store from "../store";
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default {
  components: {
    Loading,
    HDate,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      ad: null,
      chatSeller: false,
      chatMessage: "",
      addedLike: 0,
      hiddenFields: ["id", "ad_id", "created_at", "updated_at"],
      heartIcon: {
        "mdi mdi-heart-outline tw-text-blue-500 tw-text-3xl tw-absolute tw-right-4 tw-top-1 hover:tw-text-green-400": true,
      },
      likedMessage: "",
    };
  },
  computed: {
    ...mapState(["user", "messageSuccess"]),
    adDetails() {
      let adDetails = {};
      for (let fieldName in this.ad.details) {
        if (
          this.ad.details[fieldName] &&
          !this.hiddenFields.includes(fieldName)
        ) {
          adDetails[fieldName] = this.ad.details[fieldName];
        }
      }
      return adDetails;
    },
    likes() {
      return this.ad.likes * 1 + this.addedLike * 1;
    },
  },
  methods: {
    resetVariables() {
      this.chatSeller = false;
      this.chatMessage = "";
    },
    setHeartIcon(liked) {
      if (liked)
        this.heartIcon = {
          "mdi mdi-heart tw-text-blue-500 tw-text-3xl tw-absolute tw-right-4 tw-top-1 hover:tw-text-green-400": true,
        };
      else
        this.heartIcon = {
          "mdi mdi-heart-outline tw-text-blue-500 tw-text-3xl tw-absolute tw-right-4 tw-top-1 hover:tw-text-green-400": true,
        };
    },
    like(ad_id) {
      gsap.to("#like-button", {
        duration: 1,
        y: "-.5rem",
        rotate: 60,
        scaleX: 2,
        scaleY: 2,
      });
      this.axios
        .get(process.env.VUE_APP_APIURL + "/like/" + ad_id)
        .then((response) => {
          if (response.data.type == "like") {
            this.setHeartIcon(true);
            this.likedMessage = "You liked this Ad";
            this.addedLike++;
          } else {
            this.setHeartIcon(false);
            this.likedMessage = "You unliked this Ad";
            this.addedLike--;
          }
          M.toast({
            html: this.likedMessage,
            displayLength: 4000,
          });
          store.dispatch("setProps", response.data);
          //console.log(response.data);
        })
        .catch(() => {
          alert("An error occurred from the server");
          //console.log(error);
        })
        .then(() => {
          gsap.to("#like-button", {
            duration: 1,
            y: "0rem",
            yoyoEase: "elastic",
            rotate: 0,
            scaleY: 1,
            scaleX: 1,
          });
        });
    },
    sendMessage(adID) {
      if (this.chatMessage.trim() != "") {
        //alert("About to send message");
        let data = {
          message: this.chatMessage,
          ad_id: adID,
          receiver_id: this.ad.seller.id,
        };
        store.dispatch("messages", data);
      } else {
        alert("Can't send empty message");
        this.chatMessage = "";
      }
    },
  },
  mounted() {
    let adID = this.$route.params.id;
    let url = process.env.VUE_APP_APIURL + "/ads/" + adID;
    url += this.user ? "/" + this.user.id : "";
    this.axios.get(url).then((response) => {
      this.ad = response.data;
      this.setHeartIcon(this.ad.liked);
      //console.log(this.ad);
    });
  },
};
</script>
<style lang="scss" scoped>
#action-links {
  a {
    display: inline-block;
    min-width: 4rem;
    text-align: center;
    padding: 0.5rem 1rem;
    color: white;
  }
}
#action-links > span {
  display: inline-block;
  min-width: 4rem;
  text-align: center;
  padding: 0.5rem 1rem;
  color: royalblue;
}
</style>
