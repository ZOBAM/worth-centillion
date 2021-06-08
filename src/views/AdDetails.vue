<template>
  <div class="about">
    <div v-if="ad" class="sm:tw-flex">
      <div
        class="tw-py-4 tw-bg-white sm:tw-w-2/3 tw-flex-col tw-justify-center tw-text-gray-700"
      >
        <div class="tw-mt-8">
          <h1 class="tw-text-center tw-text-2xl">{{ ad.title }}</h1>
          <img
            :src="ad.ad_images ? ad.ad_images[0].link : ad.no_images"
            class="tw-block tw-m-auto tw-my-8"
            style="max-height: 70vh"
          />
          <div
            id="action-links"
            class="tw-flex tw-justify-around tw-shadow-md tw-mx-4"
          >
            <span class="tw-inline-block tw-bg-gray-200" aria-disabled="true"
              >{{ ad.hits }} <span class="mdi mdi-eye"></span>
            </span>
            <a href="" class="tw-inline-block tw-bg-blue-500">
              <span class="mdi mdi-heart-outline"></span>
            </a>
          </div>
        </div>
        <div class="tw-bg-gray-200 tw-p-4">
          <h5 class="tw-text-center tw-relative">
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
            class="tw-block tw-m-auto tw-rounded-full tw-mt-4"
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
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import HDate from "@/components/HDate.vue";

export default {
  components: {
    Loading,
    HDate,
  },
  data() {
    return {
      ad: null,
      hiddenFields: ["id", "ad_id", "created_at", "updated_at"],
    };
  },
  computed: {
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
  },
  mounted() {
    let _this = this;
    let adID = this.$route.params.id;
    this.axios
      .get(process.env.VUE_APP_APIURL + "/ads/" + adID)
      .then(function(response) {
        _this.ad = response.data;
        //console.log(_this.ad);
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
  a:hover {
    background-color: rgb(19, 43, 116);
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
