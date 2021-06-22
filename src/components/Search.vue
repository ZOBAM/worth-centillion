<template>
  <div class="tw-relative tw-text-gray-600 tw-w-full md:tw-w-3/5" style="">
    <form
      action=""
      class="flex tw-justify-items-center tw-items-center border-2 tw-border-gray-600"
      style="display:flex; flex-flow: wrap; justify-items: center; align-items: center;"
    >
      <input
        type="search"
        name="serch"
        placeholder="Search"
        v-model="searchQuery"
        class="tw-bg-white tw-h-10 tw-px-5 tw-pr-10 tw-rounded-full tw-text-sm focus:tw-outline-none tw-m-auto"
        style="margin:auto; background-color: white; border-radius: 99px; padding: 0rem .2rem 0rem 1rem; width: 86%; display: block"
      />
      <hr class="tw-w-full tw-opacity-5" />
      <button
        type="submit"
        class="tw-block tw-text-white tw-m-auto tw-mt-2 tw-p-2 gradient tw-border-2 tw-rounded-lg hover:tw-text-blue-200 hover:tw-border-blue-400"
        @click="search"
      >
        Search <span class="mdi mdi-search-web tw-text-xl"></span>
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    search() {
      this.$router.push("/searchresult?query=" + this.searchQuery);
      //alert("submitting search to server: "+ this.searchQuery);
    },
  },
};
</script>
