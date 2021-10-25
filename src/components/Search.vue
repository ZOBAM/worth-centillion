<template>
  <div class="relative text-gray-600 w-full md:w-3/5" style="">
    <form
      action=""
      class="flex justify-items-center items-center"
      style="display:flex; flex-flow: wrap; justify-items: center; align-items: center;"
      @submit.prevent="search"
    >
      <input
        type="search"
        name="serch"
        placeholder="Search"
        @keyup="getSuggestions"
        v-model="searchQuery"
        class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none m-auto"
        style="margin:auto; background-color: white; border-radius: 99px; padding: 0rem .2rem 0rem 1rem; width: 86%; display: block"
      />
      <div class="bg-gray-100 p-4" v-if="gotSuggestions">
        hear will contain search suggestions from the server.
      </div>
      <hr class="w-full opacity-5" />
      <button
        type="submit"
        class="block text-white m-auto mt-2 p-2 gradient border-2 rounded-lg hover:text-blue-200 hover:border-blue-400"
      >
        Search <span class="mdi mdi-search-web text-xl"></span>
      </button>
    </form>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
//import http from "../utilities/http";
import { useToast } from "primevue/usetoast";
export default {
  name: "Search",
  setup() {
    let searchQuery = ref("");
    let gotSuggestions = ref(false);
    const toast = useToast();
    const getSuggestions = () => {
      if (this.searchQuery.trim != "" && this.searchQuery.length > 1) {
        alert("About fetching suggestions from the server.");
      }
    };
    const search = () => {
      if (searchQuery.value.trim() == "") {
        toast.add({
          severity: "warn",
          summary: "Empty value",
          detail: "Please enter what to search for.",
          life: 2500,
        });
        this.searchQuery = "";
      } else {
        this.$router.push("/searchresult?query=" + this.searchQuery);
      }
    };
    return {
      searchQuery,
      gotSuggestions,
      getSuggestions,
      search,
    };
  },
};
</script>
