<template>
  <div class="tw-pt-24">
    <div
      class="tw-bg-gray-100 tw-flex tw-flex-col md:tw-flex-row tw-text-gray-800"
    >
      <div class="tw-w-full md:w-1/4 tw-bg-blue-50 tw-p-4">
        <h1>Filter search result</h1>
        <div class="h-14 tw-bg-gray-300 tw-mt-4 tw-p-4">
          Loading . . .
        </div>
      </div>
      <div class="tw-w-full md:w-3/4 tw-p-4">
        <loading v-if="results == null"></loading>
        <div v-else class="tw-bg-gray-100">
          <h1 class="tw-text-center">Found {{ resultCount }} results</h1>
          <ul v-if="resultCount > 0">
            <li
              v-for="result in results"
              :key="result.id"
              class="tw-flex tw-shadow-md tw-p-2 tw-cursor-pointer tw-bg-white hover:tw-bg-indigo-50 tw-mt-1"
              @click="showAd(result.id)"
            >
              <div class="tw-w-1/4 tw-flex tw-justify-center tw-items-center">
                <img :src="result.ad_image" alt="" />
              </div>
              <div class="tw-p-4 tw-w-3/4">
                <h2 class="tw-bg-blue-200 tw-text-black tw-font-bold tw-p-2">
                  {{ result.title }}
                </h2>
                <p class="tw-pt-2">
                  {{ result.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue";
export default {
  components: { Loading },
  data() {
    return {
      results: null,
      resultCount: 0,
    };
  },
  methods: {
    showAd(id) {
      this.$router.push("/ads/" + id);
    },
  },
  mounted() {
    let query = this.$route.query.query;
    let _this = this;
    this.axios
      .get(process.env.VUE_APP_APIURL + "/search?query=" + query)
      .then(function(response) {
        console.log(response.data);
        _this.results = response.data.search_results;
        _this.resultCount = response.data.result_count;
      });
  },
};
</script>
