<template>
  <!--Hero ../assets/images/galaxy_s21.png-->
  <div class="relative pt-6">
    <div
      class="sm:h-36 md:h-64 hidden sm:flex justify-center items-center md:bg-cover sm:bg-cover -mt-5 bg-no-repeat"
      :style="'background-image: url(' + header_bg + ')'"
    >
      <search class="" style="margin-left: 7%"></search>
    </div>
    <location v-if="displayLocation"></location>
    <div class="bg-gray-200 text-black p-1 flex flex-wrap">
      <!-- <div
        class="border-blue-200 border-r-2 w-1/4 p-2 h-[80vh] overflow-auto relative overflow-x-hidden hidden md:block"
      > -->
      <div class="w-1/4">
        <ScrollPanel
          style="width: 100%; height: 80vh;"
          class="custom pl-1 hidden md:block"
        >
          <category-list :forMobile="false"></category-list>
        </ScrollPanel>
      </div>

      <!-- </div> -->
      <section class="bg-white border-b py-8 md:w-3/4">
        <VTUAd class="sm:mt-1"></VTUAd>
        <div
          v-if="showCategories"
          class="border-blue-200 gradient -mt-2 border-r-2 w-screen p-2 overflow-y-scroll overflow-x-hidden md:hidden"
        >
          <category-list :forMobile="true"></category-list>
        </div>
        <div class="container mx-auto flex flex-wrap pt-4 pb-12 relative">
          <h1
            class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          >
            Hot Deals
          </h1>
          <div class="w-full mb-4">
            <div
              class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
            ></div>
            <!-- display the specified category and subcategory name -->
            <div v-if="category && ads.length" class="px-4 pt-4 text-xs ">
              <span @click="clear('category')" class="cursor-pointer">
                <span class="mdi mdi-close text-red-600"></span>
                {{ category }} ({{ currentCategoryAdsCount }})
              </span>
              <span
                v-if="subcategory"
                @click="clear('subcategory')"
                class="cursor-pointer"
              >
                <span class="mdi mdi-arrow-right"></span>
                <span class="mdi mdi-close text-red-600"></span
                >{{ subcategory }} ({{ currentSubcategoryAdsCount }})
              </span>
            </div>
          </div>
          <loading v-if="adsIsLoading"></loading>
          <div v-if="ads != null" class="flex flex-wrap w-full">
            <div
              v-for="(ad, index) in ads"
              v-bind:key="index"
              class="hot-ads w-1/2 sm:w-1/3 md:w-1/4 p-2 flex flex-col flex-shrink bg-blue-50"
            >
              <template v-if="index <= maxIndex">
                <AdListHP :ad="ad" />
              </template>
            </div>
          </div>
          <div
            v-if="ads != null && !ads.length"
            class="p-2 md:p-4 text-xl bg-red-100 m-auto"
          >
            There is no ads in this category and/or location
          </div>
        </div>
      </section>
    </div>
  </div>
  <template v-if="reachedEndOfAds">
    <div
      class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
    >
      <!--Left Col-->
      <div
        class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left text-white"
      >
        <p class="uppercase tracking-loose w-full"></p>
        <h1 class="my-4 text-5xl font-bold leading-tight">
          <span class="text-gray-300">Hamsuper</span> Got You Covered. Fast,
          Easy and Cost Effective!
        </h1>
        <p class="leading-normal text-2xl mb-8">
          Register and start posting Ads for FREE!
        </p>
        <router-link to="/user/register">
          <button
            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Register Now
          </button>
        </router-link>
      </div>
      <!--Right Col-->
      <div class="w-full md:w-3/5 py-6 text-center">
        <img
          class="w-full md:w-4/5 z-50 rounded-lg md:float-right"
          src="../assets/images/mobile_purchase.png"
        />
      </div>
    </div>
    <div class="relative -mt-12 lg:-mt-24">
      <svg
        viewBox="0 0 1428 174"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g
            transform="translate(-2.000000, 44.000000)"
            fill="#FFFFFF"
            fill-rule="nonzero"
          >
            <path
              d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
              opacity="0.100000001"
            ></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path
              d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
              id="Path-4"
              opacity="0.200000003"
            ></path>
          </g>
          <g
            transform="translate(-4.000000, 76.000000)"
            fill="#FFFFFF"
            fill-rule="nonzero"
          >
            <path
              d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <section class="bg-white border-b py-8">
      <div class="container max-w-5xl mx-auto m-8">
        <h1
          class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
        >
          Latest
        </h1>
        <div class="w-full mb-4">
          <div
            class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
          ></div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-5/6 sm:w-1/2 p-6">
            <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
              Galaxy S21 Ultra 5G
            </h3>
            <p class="text-gray-600 mb-8">
              Introducing Galaxy S21 Ultra 5G. Designed with a unique
              contour-cut camera to create a revolution in photography Never
              miss that perfect shot again. Meet Galaxy S21 5G and S21+ 5G.
              Designed to revolutionize video and photography, with beyond
              cinematic 8K resolution so you can snap epic photos right out of
              video. It has it all in two sizes: 64MP, our fastest chip and a
              massive all-day battery. Things just got epic.
              <br />

              <!-- Images from:

              <a class="text-pink-500 underline" href="https://undraw.co/">undraw.co</a> -->
            </p>
          </div>
          <div class="w-full sm:w-1/2 p-6">
            <img
              class="w-full sm:h-64 mx-auto"
              viewBox="0 0 1177 598.5"
              src="../assets/images/galaxy_s21.png"
              alt=""
            />
          </div>
        </div>
        <div class="flex flex-wrap flex-col-reverse sm:flex-row">
          <div class="w-full sm:w-1/2 p-6 mt-6">
            <img
              class="w-5/6 sm:h-64 mx-auto"
              src="../assets/images/map_of_nigeria.png"
              alt=""
            />
          </div>
          <div class="w-full sm:w-1/2 p-6 mt-6">
            <div class="align-middle">
              <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
                Our Reach is Broad
              </h3>
              <p class="text-gray-600 mb-8">
                Deal from anywhere whether at work, on vacation. From the
                nearest point to the farthest, it is the same bliss of service.
              </p>
              <p class="text-gray-600 mb-8">
                Deal from anywhere whether at work, on vacation. From the
                nearest point to the farthest, it is the same bliss of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Change the colour #f8fafc to match the previous section colour -->
    <svg
      class="wave-top"
      viewBox="0 0 1439 147"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
          <g class="wave" fill="#f8fafc">
            <path
              d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
            ></path>
          </g>
          <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
            <g
              transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) "
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                opacity="0.200000003"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <section class="container mx-auto text-center py-6 mb-12">
      <h1
        class="w-full my-2 text-5xl font-bold leading-tight text-center text-white"
      >
        Need a guide?
      </h1>
      <div class="w-full mb-4">
        <div
          class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"
        ></div>
      </div>
      <h3 class="my-4 text-3xl leading-tight text-gray-100">
        Follow the link below to see how seamless the process is.
      </h3>
      <router-link
        to="/how_it_works"
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        How it Works
      </router-link>
    </section>
  </template>
</template>

<script>
// @ is an alias to /src
import CategoryList from "@/components/CategoryList.vue";
import Loading from "@/components/Loading.vue";
import VTUAd from "@/components/VTUAd";
import { mapActions, mapState } from "vuex";
import store from "../store";
import header_bg from "@/assets/images/header_bg.png";
import Search from "../components/Search.vue";
import AdListHP from "../components/ads/AdListHP.vue";
import Location from "../components/Location.vue";
import { gsap } from "gsap";

export default {
  name: "Home",
  components: {
    CategoryList,
    Loading,
    Search,
    Location,
    VTUAd,
    AdListHP,
  },
  data() {
    return {
      name: "Don",
      age: this.$store.state.age,
      header_bg: header_bg,
      loading: true,
      maxIndex: 11,
    };
  },
  methods: {
    clear(type) {
      if (type == "category") {
        store.dispatch("setProps", { category: null });
        store.dispatch("setProps", { subcategory: null });
      } else {
        store.dispatch("setProps", { subcategory: null });
      }
      store.dispatch("fetchData");
    },
  },
  computed: {
    ...mapActions(["increment"]),
    ...mapState([
      "isLoggedIn",
      "user",
      "displayLocation",
      "displayCategory",
      "ads",
      "adsIsLoading",
      "category",
      "categories",
      "subcategory",
      "currentSubcategoryAdsCount",
      "currentCategoryAdsCount",
      "reachedEndOfAds",
    ]),
    showCategories() {
      return true;
    },
  },
  mounted() {
    let intervalVar = setInterval(() => {
      if (this.ads != null) {
        gsap.from(".hot-ads", { y: 9, scale: 0, duration: 3, stagger: 0.25 });
        clearInterval(intervalVar);
      }
    }, 50);
    window.onscroll = () => {
      if (this.ads.length >= this.maxIndex) {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 1
        ) {
          //alert("You have reached end of page " + this.maxIndex);
          this.maxIndex += 4;
        }
      } else {
        store.dispatch("setProps", { reachedEndOfAds: true });
      }
    };
  },
};
</script>
<style lang="scss" scoped>
.gradient {
  background: linear-gradient(90deg, #014a7f 0%, #2a84cc 100%);
}
::v-deep(.p-scrollpanel) {
  &.custom .p-scrollpanel-wrapper {
    border-right: 9px solid var(--surface-b);
  }
  .p-scrollpanel-bar {
    background-color: rgb(213, 213, 219);
    opacity: 0.6;
    transition: background-color 0.3s;
    &:hover {
      background-color: #135ba1;
    }
  }
}
</style>
