<template>
  <div class="about">
    <div v-if="ad" class="sm:flex">
      <div class="py-4 bg-white sm:w-2/3 flex-col justify-center text-gray-700">
        <div class="from-gray-100 py-1 px-2 bg-gradient-to-r shadow-md">
          {{ ad.category + " > " + ad.subcategory }}
        </div>
        <h1 class="text-center text-2xl mt-3">{{ ad.title }}</h1>
        <swiper
          navigation
          :pagination="{ clickable: true }"
          v-if="ad.ad_images"
        >
          <swiper-slide v-for="image of ad.ad_images" :key="image.id">
            <img
              :src="ad.ad_images ? image.link : ad.no_images"
              class="block m-auto my-8 border-2 border-blue-50 shadow-md"
              style="max-height: 70vh; display: block;"
            />
          </swiper-slide>
        </swiper>
        <template v-else>
          <img
            :src="ad.no_images"
            class="block m-auto my-8 border-2 border-blue-50 shadow-md"
            style="max-height: 70vh; display: block;"
          />
        </template>
        <div id="action-links" class="flex justify-around shadow-md mx-4">
          <span class="inline-block bg-gray-200" aria-disabled="true"
            >{{ ad.hits }} <span class="mdi mdi-eye"></span>
          </span>
          <span class="inline-block bg-gray-200" aria-disabled="true">
            <span v-if="ad.ad_images">
              {{ ad.num_of_images }} <span class="mdi mdi-image"></span>
            </span>
            <span v-else>
              <span
                class="mdi mdi-image-off-outline text-xl text-red-300"
              ></span>
              <span class="text-gray-400">No Image </span>
            </span>
          </span>
          <div class="relative border-2 ">
            <span class="inline-block top-3 absolute pl-2">{{ likes }}</span>
            <a
              href=""
              class="inline-block relative"
              @click.prevent="like(ad.id)"
            >
              <span :class="heartIcon" id="like-button"></span>
            </a>
          </div>
        </div>
        <div class="bg-gray-200 md:p-4">
          <h5 class="text-center relative p-2">
            <span class="font-extrabold text-center"
              >₦{{ ad.price }}<br />
              <span v-if="ad.negotiable" class="text-sm"> (Negotiable)</span>
            </span>
            <span class="absolute right-0 font-thin" style="font-size: .6em">{{
              ad.created
            }}</span>
          </h5>
          <div class="bg-gray-50 p-4">
            <ul>
              <!-- <li v-for="(value, name, index) in ad" v-bind:key = "index">
              {{name}} : {{value}}
            </li> -->
              <li>
                <strong class="font-bold ">Location:</strong>
                {{ ad.place.split(":")[0] }},
                {{ ad.state.split(":")[0] }}
              </li>
              <li v-for="(fieldName, index) of adDetails" :key="index">
                <strong class="capitalize font-bold">{{
                  index.replace("_", " ")
                }}</strong>
                {{ fieldName }}
              </li>
              <li class="overflow-hidden">
                <strong class="font-bold">Description:</strong>
                {{ ad.description }}
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="p-4 bg-blue-50 sm:w-1/3">
        <div
          class="bg-blue-500 p-4 text-center min-h-[12rem] flex justify-center items-center"
          v-if="loading"
        >
          <span
            class="w-1/2 m-auto bg-blue-500 text-white p-4 text-center animate-pulse font-bold rounded-xl border-4"
          >
            Loading seller's details
            <span class=""> . . .</span>
          </span>
        </div>
        <div
          v-if="ad.seller && !loading"
          class="p-4 text-gray-800 bg-white"
          id="seller-details"
        >
          <div
            class="w-0 h-0 opacity-0 text-center bg-blue-500 text-white p-2 font-bold rounded-xl border-4 border-blue-100"
          >
            {{ ad.seller.first_name + " " + ad.seller.last_name }}
          </div>
          <img
            :src="ad.seller.dp"
            alt="seller profile picture"
            class="block m-auto rounded-full mt-4 w-20 max-h-24"
          />
          <div class="flex mt-12 justify-between text-xs text-center">
            <div class="px-2 py-1 border-b-4 border-blue-100">
              <span class="mdi mdi-account-plus text-sm"></span> <br />
              <span class="font-bold">Joined</span> <br />
              <h-date :date="ad.seller.created_at" :shorten="true" />
            </div>
            <div class="bg-blue-500 text-white p-2">
              <span class="mdi mdi-shopping-outline text-sm"></span> <br />
              <span class="font-bold">Total Ads</span> <br />
              {{ ad.seller.ads_count }}
            </div>
            <div class="px-2 py-1 border-b-4 border-blue-100">
              <span class="mdi mdi-eye-check-outline text-sm"></span> <br />
              <span class="font-bold">Last Seen</span> <br />
              <h-date :date="ad.seller.updated_at" :shorten="true" />
            </div>
          </div>
          <div
            class="from-blue-600 via-blue-400 bg-gradient-to-r mt-6 rounded-2xl p-2 relative"
          >
            <span class="text-white">Call Seller:</span>
            <div class="bg-gray-100 rounded-2xl p-2 absolute right-4 bottom-0">
              {{ ad.seller.tel }}
            </div>
          </div>
          <div
            class="flex justify-center flex-wrap"
            v-if="user && ad.seller.id != user.id"
          >
            <button
              class="bg-white text-blue-500 shadow-lg text-center font-semibold mt-3 p-3 m-auto hover:bg-blue-500 hover:text-white"
              @click="chatSeller = !chatSeller"
            >
              Chat Seller <span class="mdi mdi-message"></span>
            </button>
            <template v-if="chatSeller" class="w-full">
              <div class="p-2 w-full">
                <textarea
                  v-model="chatMessage"
                  name=""
                  id=""
                  cols="30"
                  rows="20"
                  class="h-20 rounded-lg border-2 border-blue-500 shadow-lg"
                ></textarea>
              </div>
              <button class="btn-primary" @click="sendMessage(ad.id)">
                Send <span class="mdi mdi-send"></span>
              </button>
            </template>
            <div class="w-full" v-if="messageSuccess">
              {{ resetVariables() }}
              <div
                class="text-center w-24 h-24 mt-3 m-auto rounded-full border-2 border-blue-500"
              >
                <span class="mdi mdi-check text-5xl text-blue-400"></span>
                <p class="p-2 text-xs -mt-2">Message sent</p>
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
        "mdi mdi-heart-outline text-blue-500 text-3xl absolute right-4 top-1 hover:text-green-400": true,
      },
      likedMessage: "",
      loading: false,
      liked: false,
    };
  },
  computed: {
    ...mapState(["user", "messageSuccess", "ads"]),
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
      return this.ad.likes * 1;
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
          "mdi mdi-heart text-blue-500 text-3xl absolute right-4 top-1 hover:text-green-400": true,
        };
      else
        this.heartIcon = {
          "mdi mdi-heart-outline text-blue-500 text-3xl absolute right-4 top-1 hover:text-green-400": true,
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
      setTimeout(() => {
        gsap.to("#like-button", {
          duration: 1,
          y: "0rem",
          yoyoEase: "elastic",
          rotate: 0,
          scaleY: 1,
          scaleX: 1,
          onComplete: () => {
            this.addedLike = this.liked ? this.ad.likes-- : this.ad.likes++;
            this.liked = !this.liked;
          },
        });
      }, 500);

      this.axios
        .get(process.env.VUE_APP_APIURL + "/like/" + ad_id)
        .then((response) => {
          if (response.data.type == "like") {
            this.setHeartIcon(true);
            this.likedMessage = "You liked this Ad";
          } else {
            this.setHeartIcon(false);
            this.likedMessage = "You unliked this Ad";
          }
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: this.likedMessage,
            life: 3000,
          });
          store.dispatch("setProps", response.data);
          //console.log(response.data);
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong, please try again.",
            life: 3000,
          });
          //console.log(error);
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
        //alert("Can't send empty message");
        this.$toast.add({
          severity: "warn",
          summary: "Empty value",
          detail: "Please enter the message you want to send",
          life: 2000,
        });
        this.chatMessage = "";
      }
    },
  },
  mounted() {
    let adID = this.$route.params.id;
    //check if ads is downloaded already and load from there
    if (this.ads) {
      let ad = this.ads.find((ad) => {
        return ad.id == adID;
      });
      if (ad) {
        this.ad = ad;
        this.ad.ad_images = [{ id: 1, link: this.ad.ad_img }];
      } else {
        if (this.user) {
          let ad = this.user.ads.find((ad) => {
            return ad.id == adID;
          });
          if (ad) {
            //alert("found user ad");
            this.ad = ad;
            this.ad.ad_images = [{ id: 1, link: this.ad.ad_img }];
          }
        }
      }

      //alert("ads found in the store");
      this.loading = true;
    }
    console.log(this.ad);
    let url = process.env.VUE_APP_APIURL + "/ads/" + adID;
    url += this.user ? "/" + this.user.id : "";
    this.axios.get(url).then((response) => {
      this.ad = response.data;
      this.setHeartIcon(this.ad.liked);
      this.liked = this.ad.liked ? true : false;
      this.loading = false;
      setTimeout(() => {
        gsap.to("#seller-details", {
          opacity: 1,
          duration: 1,
          width: "100%",
          height: "auto",
          x: 0,
          y: 0,
        });
      }, 5);
      //this.loading = false;
      console.log(this.ad);
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
#seller-details {
  width: 0%;
  height: 0px;
  overflow: hidden;
}
</style>
