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
        autocomplete="off"
        class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none m-auto"
        style="margin:auto; background-color: white; border-radius: 99px; padding: 0rem .2rem 0rem 1rem; width: 86%; display: block"
      />
      <section class="w-full absolute top-11" v-if="gotSuggestions">
        <div
          class="bg-gray-100 p-2 w-[86%] m-auto rounded-xl opacity-90 max-h-[16vh] overflow-y-auto"
        >
          <span
            v-for="(suggestion, index) of suggestions"
            :key="index"
            class="block my-1 bg-gray-50 cursor-pointer p-1 hover:bg-white"
            @click="setCategory(suggestion)"
          >
            <span class=""></span> {{ `${searchQuery}` }} in
            <strong>{{ `${suggestion}` }}</strong>
          </span>
        </div>
      </section>
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
import http from "../utilities/http";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  name: "Search",
  setup() {
    let searchQuery = ref("");
    const category = ref("");
    const suggestions = ref([]);
    const toast = useToast();
    const router = useRouter();
    const gotSuggestions = computed(() => {
      return suggestions.value.length && searchQuery.value.length > 1
        ? true
        : false;
    });
    const getSuggestions = () => {
      if (searchQuery.value.trim != "" && searchQuery.value.length > 1) {
        http("/search?query=" + searchQuery.value + "&suggestions=phone").then(
          (response) => {
            suggestions.value = response.data;
            console.log(suggestions.value);
            return response;
          }
        );
        //alert("About fetching suggestions from the server.");
      }
    };
    const setCategory = (cat) => {
      category.value = cat;
      search();
    };
    const search = () => {
      if (searchQuery.value.trim() == "") {
        toast.add({
          severity: "warn",
          summary: "Empty value",
          detail: "Please enter what to search for.",
          life: 2500,
        });
        searchQuery.value = "";
      } else {
        let queryURL = "/searchresult?query=" + searchQuery.value;
        if (category.value) {
          queryURL += "&category=" + category.value.replace("&", "_");
        }
        router.push(queryURL);
      }
    };
    return {
      searchQuery,
      gotSuggestions,
      suggestions,
      getSuggestions,
      search,
      setCategory,
    };
  },
};
</script>
