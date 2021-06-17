<template>
  <article class="tw-bg-white tw-p-4">
    <p>Welcome to favorites page</p>
    <section
      v-if="user.favorites.length"
      class="tw-border-2 tw-border-gray-400 tw-p-4"
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
          <h4>Your Favorite Ads</h4>
        </li>
        <li
          class="collection-item hover:tw-bg-red-400"
          v-for="ad of user.favorites"
          :key="ad.id"
        >
          <div class="">
            {{ ad.title
            }}<a href="#!" class="secondary-content"
              ><i class="material-icons red-text">delete</i></a
            >
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style lang="scss" scoped>
.collection-item:hover {
  background-color: rgb(209, 196, 196);
}
p:hover {
  border: 2px dotted greenyellow;
}
</style>
