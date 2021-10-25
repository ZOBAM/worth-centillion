<template>
  <ul v-if="items.length > 0">
    <template v-for="(result, index) in items" :key="result.id">
      <li
        v-if="index >= startIndex && index < endIndex"
        class="flex shadow-md p-2 bg-white hover:bg-indigo-50 mt-1 border"
        :class="{
          'border-2 border-green-200 relative': newAdID == result.id,
        }"
      >
        <div
          v-if="newAdID == result.id"
          class="absolute p-2 bg-green-400 rounded-full -top-2 -left-2 rotate-3 animate-pulse"
        >
          {{ editedAdID ? "Ad Updated!" : "New Ad!" }}
        </div>
        <div class="w-1/4 flex justify-center items-center">
          <img :src="result.ad_image" alt="" class="w-20 md:w-2/4" />
        </div>
        <div class="relative w-3/4">
          <h4 class="text-black font-bold p-2">
            <router-link :to="'/ads/' + result.id"
              >{{ result.title }} (₦{{ result.price }})</router-link
            >
          </h4>
          <p class="p-2 text-gray-700 text-right md:text-center">
            <button
              @click="displayModal(result.id)"
              v-if="result.promoted == 'bronze'"
              class="border-2 bg-blue-100 border-blue-600 px-3 py-2 rounded-2xl border-double hover:bg-gray-50"
            >
              Promote
            </button>
            <span
              v-else
              class="border-2 bg-green-400 border-blue-600 border-double hover:bg-gray-50"
            >
              <!-- <span class="bg-blue-300 px-3 py-2 rounded-lg"
                >Promoted</span
              > -->
              <span class="bg-blue-400 py-2">
                <span class=" text-white px-2 py-1">{{ result.promoted }}</span>

                <span class="bg-gray-50 text-blue-900 px-2 py-1"
                  >{{ result.days_left }} days left</span
                >
              </span>
            </span>
          </p>
          <div class="bg-gray-50 px-2 py-1 flex justify-between w-full  ">
            <button
              class="w-1/3 border-b-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
              @click="edit(result.id)"
            >
              Edit
            </button>
            <button
              class="w-1/3 border-b-2 border-red-700 text-red-700 p-1 hover:bg-red-700 hover:text-white"
              @click="deleteAd(result.id)"
            >
              Delete
            </button>
            <div class="w-1/3 text-center">{{ result.hits }} Views</div>
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
        class="border-2 border-purple-600 bg-blue-50 text-center relative"
        style="border-right: 4px dashed purple"
      >
        <div class="absolute justify-center items-center flex w-full">
          <span class="bg-purple-600 text-white rounded-2xl px-3 -mt-3">
            Silver Ad
          </span>
        </div>

        <div class=" p-2 mt-10">
          <p class="mb-4 text-2xl font-bold text-center">
            N{{ promotionPrices[0] }}
          </p>
          <ul class="collection text-left">
            <li class="collection-item">
              <span class="mdi mdi-check text-blue-400 text-xl"></span>
              Reach more buyers
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check text-blue-400 text-xl"></span>
              Secure deal faster
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check text-blue-400 text-xl"></span>
              Stay on the Top Ads for <strong>7days</strong>
            </li>
          </ul>
        </div>
        <div class="text-center my-4">
          <button @click="promoteAd('silver')" class="btn-primary rounded-3xl">
            SELECT
          </button>
        </div>
      </div>
      <div
        class="border-2 border-dashed border-purple-600 bg-purple-700 text-center relative text-white"
      >
        <div class="absolute justify-center items-center flex w-full">
          <span class="bg-gray-100 text-purple-800 rounded-2xl px-3 -mt-3">
            Gold Ad
          </span>
        </div>

        <div class=" p-2 mt-10">
          <p class="mb-4 text-2xl font-bold text-center">
            N{{ promotionPrices[1] }}
          </p>
          <ul class="collection text-left text-purple-900">
            <li class="collection-item">
              <span class="mdi mdi-check text-blue-400 text-xl"></span>
              Reach more buyers
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check text-blue-400 text-xl"></span>
              Secure deal faster
            </li>
            <li class="collection-item">
              <span class="mdi mdi-check text-blue-400 text-xl"></span>
              Stay on the Top Ads for <strong>30days</strong>
            </li>
          </ul>
        </div>
        <div class="text-center my-4">
          <button
            @click="promoteAd('gold')"
            class="btn-primary rounded-3xl border-2 border-white bg-purple-600"
            :disabled="user.balance < promotionPrices[1]"
            :class="{
              'border-purple-900 text-gray-500':
                user.balance < promotionPrices[1],
            }"
          >
            SELECT</button
          ><br />
          <span v-if="user.balance < promotionPrices[1]" class="p-2"
            >Low Balance (N{{ user.balance.toFixed(2) }})</span
          >
        </div>
      </div>
    </template>
    <section v-if="lowBalance" class="bg-red-100 p-4 w-full">
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
import router from "../../router";

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
    ...mapState(["user", "promotionPrices", "newAdID", "editedAdID"]),
  },
  methods: {
    edit(adID) {
      store.dispatch("setProps", { editedAdID: adID });
      router.push("/create_ad");
    },
    deleteAd(adID) {
      const proceed = confirm("Are you sure you want to delete this Ad?");
      if (proceed) {
        this.axios
          .delete(process.env.VUE_APP_APIURL + "/ads/" + adID)
          .then((response) => {
            console.log(response.data);
            store.dispatch("setProps", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
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
