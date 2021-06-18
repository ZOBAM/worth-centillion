<template>
  <article class="tw-bg-white md:tw-p-4">
    <section class="tw-bg-gradient-to-b tw-from-white tw-to-blue-300 tw-p-2">
      <section
        v-if="user.favorites.length"
        class="tw-p-2 md:tw-p-4 tw-bg-white"
      >
        <!-- <div
        v-for="ad of user.favorites"
        :key="ad.id"
        class="tw-shadow-md tw-rounded-md tw-bg-gray-100"
      >
        {{ ad.title }}
      </div> -->
        <ul class="collection with-header">
          <li class="collection-header tw-text-center">
            <h4>
              <span class="mdi mdi-heart tw-text-blue-400"></span> Favorite Ads
            </h4>
          </li>
          <li
            class="collection-item hover:tw-bg-red-400"
            v-for="(ad, index) of user.favorites"
            :key="ad.id"
          >
            <div class="">
              {{ ++index }})
              <router-link :to="'/ads/' + ad.id" class=""
                >{{ ad.title }}
              </router-link>
              <a
                href="#!"
                class="secondary-content"
                title="remove from favorite"
                ><i class="material-icons red-text" @click="removeAd(ad.id)"
                  >delete</i
                ></a
              >
            </div>
          </li>
        </ul>
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
          There is no currently no Ads in your favorites.
        </p>
      </section>
    </section>
  </article>
</template>
<script>
import { mapState } from "vuex";
import store from "../store";
import M from "materialize-css";

export default {
  data() {
    return {
      name: null,
    };
  },
  computed: {
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
          alert("An error occured from the server");
          //console.log(error);
        });
    },
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
</style>
