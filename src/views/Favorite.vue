<template>
  <article class="tw-bg-white md:tw-p-4">
    <section class="tw-bg-gradient-to-b tw-from-white tw-to-blue-300 tw-p-2">
      <section
        v-if="items.length"
        class="tw-p-2 md:tw-p-4 tw-bg-white tw-rounded-lg"
      >
        <!-- <div
        v-for="ad of user.favorites"
        :key="ad.id"
        class="tw-shadow-md tw-rounded-md tw-bg-gray-100"
      >
        {{ ad.title }}
      </div> -->
        <h4
          class="tw-bg-blue-100/50 tw-p-2 tw-text-[#22226] tw-text-2xl tw-text-center"
          id="favorites-heading"
        >
          <span class="mdi mdi-heart tw-text-blue-400"></span> Favorite Ads
        </h4>
        <transition-group name="list" tag="ul" class="collection with-header">
          <template v-for="(ad, index) of items" :key="ad.id">
            <li
              class="collection-item hover:tw-bg-red-400"
              v-if="index >= startIndex && index < endIndex"
            >
              <div class="tw-flex tw-mt-2">
                <span class="tw-flex-grow">
                  {{ ++index }})
                  <router-link :to="'/ads/' + ad.id" class="tw-text-blue-600"
                    >{{ ad.title }}
                  </router-link>
                </span>
                <span
                  href="#!"
                  class="secondary-content tw-cursor-pointer"
                  title="remove from favorite"
                  ><i class="material-icons red-text" @click="removeAd(ad.id)"
                    >delete</i
                  ></span
                >
              </div>
            </li>
          </template>
        </transition-group>
      </section>
      <section
        v-else
        class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-gray-50"
      >
        <ul class="collection with-header">
          <li class="collection-header tw-text-center">
            <h4>
              <span class="mdi mdi-heart tw-text-blue-400 tw-w-full"></span>
              Favorite Ads
            </h4>
          </li>
        </ul>
        <p>
          There is currently no Ads in your favorites.
        </p>
      </section>
    </section>
    <section>
      <pagination
        :rows="items.length"
        :perPage="perPage"
        @my-event="paginate"
        :currentPage="currentPage"
      ></pagination>
    </section>
  </article>
</template>
<script>
import { mapState } from "vuex";
import store from "../store";
import M from "materialize-css";
import { gsap } from "gsap";
import paginate from "@/utilities/mixins/paginate.js";
import setTitle from "../utilities/setTitle";

export default {
  components: {},
  mixins: [paginate],
  computed: {
    items() {
      return this.user.favorites;
    },
    ...mapState(["user"]),
  },
  methods: {
    removeAd(adID) {
      store.dispatch("favorites", {
        adID: adID,
        type: "delete",
      });
      this.axios
        .get(process.env.VUE_APP_APIURL + "/like/" + adID)
        .then(() => {
          M.toast({
            html: "Removed from Favorites",
            displayLength: 4000,
          });
          //console.log(response.data);
        })
        .catch(() => {
          alert("An error occurred from the server");
          //console.log(error);
        });
    },
  },
  mounted() {
    setTitle(this.$route);
    gsap.from("#favorites-heading", { duration: 1.5, color: "red", y: 24 });
    gsap.from(".collection-item", {
      x: 15,
      stagger: 0.15,
      duration: 1,
      delay: 1.45,
      y: 7.5,
      scale: 0.01,
    });
  },
};
</script>
<style lang="scss" scoped>
.collection-item:hover {
  background-color: rgb(228, 228, 228);
}
p:hover {
  border: 2px dotted greenyellow;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
