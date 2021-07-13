<template>
  <ul v-if="items.length > 0">
    <template v-for="(result, index) in items" :key="result.id">
      <li
        v-if="index >= startIndex && index < endIndex"
        class="tw-flex tw-shadow-md tw-p-2 tw-bg-white hover:tw-bg-indigo-50 tw-mt-1 border"
        :class="{
          'tw-border-2 tw-border-green-200 tw-relative': newAdID == result.id,
        }"
      >
        <div
          v-if="newAdID == result.id"
          class="tw-absolute tw-p-2 tw-bg-green-400 tw-rounded-full tw--top-2 tw--left-2 tw-rotate-3 tw-animate-pulse"
        >
          New Ad!
        </div>
        <div class="tw-w-1/4 tw-flex tw-justify-center tw-items-center">
          <img :src="result.ad_image" alt="" class="tw-w-20 md:tw-w-2/4" />
        </div>
        <div class="tw-relative tw-w-3/4">
          <h4 class="tw-text-black tw-font-bold tw-p-2">
            <router-link :to="'/ads/' + result.id"
              >{{ result.title }} (₦{{ result.price }})</router-link
            >
          </h4>
          <p class="tw-p-2 tw-text-gray-700 tw-text-right md:tw-text-center">
            <button
              @click="displayModal(result.id)"
              v-if="result.promoted == 'bronze'"
              class="tw-border-2 tw-bg-blue-100 tw-border-blue-600 tw-px-3 tw-py-2 tw-rounded-2xl tw-border-double hover:tw-bg-gray-50"
            >
              Promote
            </button>
            <span
              v-else
              class="tw-border-2 tw-bg-green-400 tw-border-blue-600 tw-border-double hover:tw-bg-gray-50"
            >
              <span class="tw-bg-blue-300 tw-px-3 tw-py-2 tw-rounded-lg"
                >Promoted</span
              >
              <span class="tw-bg-blue-400 tw-text-white tw-px-2 tw-py-1">{{
                result.promoted
              }}</span>
            </span>
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
            <div class="tw-w-1/3 tw-text-center">{{ result.hits }} Views</div>
          </div>
        </div>
      </li>
    </template>
  </ul>
  <pagination
    :rows="items.length"
    :perPage="perPage"
    @my-event="paginate"
    :currentPage="currentPage"
  ></pagination>
  <!-- modal for promoting ads -->
  <modal
    v-if="showModal"
    @close-modal="showModal = false"
    @ad-promoted="promoteAd"
    :loading="loading"
  >
    <template v-if="!lowBalance">
      <div
        class="tw-border-2 tw-border-purple-600 tw-bg-blue-50 tw-text-center tw-relative"
        style="border-right: 4px dashed purple"
      >
        <div
          class="tw-absolute tw-justify-center tw-items-center tw-flex tw-w-full"
        >
          <span
            class="tw-bg-purple-600 tw-text-white tw-rounded-2xl tw-px-3 tw--mt-3"
          >
            Silver Ad
          </span>
        </div>

        <div class=" tw-p-2 tw-mt-10">
          <p class="tw-mb-4 tw-text-2xl tw-font-bold tw-text-center">
            N{{ promotionPrices[0] }}
          </p>
          <ul class="collection tw-text-left">
            <li class="collection-item">
              <span class="mdi mdi-check tw-text-blue-400 tw-text-xl"></span>
              Reach more buyers
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check tw-text-blue-400 tw-text-xl"></span>
              Secure deal faster
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check tw-text-blue-400 tw-text-xl"></span>
              Stay on the Top Ads for <strong>7days</strong>
            </li>
          </ul>
        </div>
        <div class="text-center tw-my-4">
          <button
            @click="promoteAd('silver')"
            class="btn-primary tw-rounded-3xl"
          >
            SELECT
          </button>
        </div>
      </div>
      <div
        class="tw-border-2 tw-border-dashed tw-border-purple-600 tw-bg-purple-700 tw-text-center tw-relative tw-text-white"
      >
        <div
          class="tw-absolute tw-justify-center tw-items-center tw-flex tw-w-full"
        >
          <span
            class="tw-bg-gray-100 tw-text-purple-800 tw-rounded-2xl tw-px-3 tw--mt-3"
          >
            Gold Ad
          </span>
        </div>

        <div class=" tw-p-2 tw-mt-10">
          <p class="tw-mb-4 tw-text-2xl tw-font-bold tw-text-center">
            N{{ promotionPrices[1] }}
          </p>
          <ul class="collection tw-text-left tw-text-purple-900">
            <li class="collection-item">
              <span class="mdi mdi-check tw-text-blue-400 tw-text-xl"></span>
              Reach more buyers
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check tw-text-blue-400 tw-text-xl"></span>
              Secure deal faster
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check tw-text-blue-400 tw-text-xl"></span>
              Stay on the Top Ads for <strong>30days</strong>
            </li>
          </ul>
        </div>
        <div class="text-center tw-my-4">
          <button
            @click="promoteAd('gold')"
            class="btn-primary tw-rounded-3xl tw-border-2 tw-border-white tw-bg-purple-600"
            :disabled="user.balance < promotionPrices[1]"
            :class="{
              'tw-border-purple-900 tw-text-gray-500':
                user.balance < promotionPrices[1],
            }"
          >
            SELECT</button
          ><br />
          <span v-if="user.balance < promotionPrices[1]" class="tw-p-2"
            >Low Balance (N{{ user.balance.toFixed(2) }})</span
          >
        </div>
      </div>
    </template>
    <section v-if="lowBalance" class="tw-bg-red-100 tw-p-4 tw-w-full">
      Your account balance is too low for this transaction. Please, fund your
      wallet and try again.
    </section>
  </modal>
</template>
<script>
import paginate from "@/utilities/mixins/paginate.js";
import Modal from "@/components/Modal.vue";
import store from "../../store";
import { mapState } from "vuex";

export default {
  name: "UserAds",
  props: ["items"],
  mixins: [paginate],
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      adID: null,
      loading: false,
      lowBalance: false,
    };
  },
  computed: {
    ...mapState(["user", "promotionPrices", "newAdID"]),
  },
  methods: {
    displayModal(adID) {
      if (this.user.balance < this.promotionPrices[0]) {
        this.lowBalance = true;
      }
      this.showModal = true;
      this.adID = adID;
      console.log(this.user.balance);
    },
    promoteAd(type) {
      this.loading = true;
      this.axios
        .post(process.env.VUE_APP_APIURL + "/promote", {
          type: type,
          adID: this.adID,
        })
        .then((response) => {
          /* store.dispatch("setProps", {
            name: "ads",
            value: response.data.user_ads,
            type: "user",
          });
          store.dispatch("setProps", {
            name: "transactions",
            value: response.data.transactions,
            type: "user",
          }); */
          store.dispatch("setProps", response.data);
          console.log(response.data);
          this.loading = false;
          this.showModal = false;
        })
        .catch((error) => {
          alert("An error occurred while promoting ads");
          this.loading = false;
          this.showModal = false;
          console.log(error);
        });
    },
  },
  unmounted() {
    store.dispatch("setProps", { newAdID: null });
  },
};
</script>
