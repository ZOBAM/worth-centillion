<template>
  <div>
    <div
      v-if="categories && forMobile"
      class="tw-flex tw-flex-wrap tw-p-2 tw-justify-items-center tw-text-center tw-items-center tw-bg-indigo-50 tw-rounded-lg"
      style="width:96%; margin:auto"
    >
      <div
        v-for="category in catCount()"
        v-bind:key="category.index"
        class="tw-w-1/3 sm:tw-w-1/6 tw-gray-100 tw-p-1"
      >
        <div
          class="tw-bg-white "
          @click="
            getSubcategory(
              extractCategoryDetails(category).name,
              extractCategoryDetails(category).count
            )
          "
        >
          <img
            :src="require(`@/${extractCategoryDetails(category).image}`)"
            alt=""
            class="tw-w-20 tw-h-16 tw-m-auto"
          />
          <div
            class="tw-text-xs tw-border tw-border-gray-50 tw-h-9 tw-leading-4 tw-flex tw-justify-center tw-items-center"
          >
            {{ extractCategoryDetails(category).name }}
          </div>
        </div>
      </div>
    </div>
    <ul v-else-if="categories && forMobile == false">
      <li
        v-for="category in catCount()"
        v-bind:key="category.index"
        class="tw-flex tw-border-b-2 tw-border-white tw-py-2 tw-cursor-pointer tw-relative hover:tw-bg-gray-300 hover:tw-text-gray-900"
        :class="{
          'tw-text-gray-500':
            extractCategoryDetails(category).count <= 0 &&
            category.lastIndexOf('Fundme') != false,
        }"
        @click="
          getSubcategory(
            extractCategoryDetails(category).name,
            extractCategoryDetails(category).count
          )
        "
      >
        <span class="tw-flex tw-justify-center tw-items-center">
          <i
            class="tw-rounded-lg tw-mr-2"
            :class="
              getIconClass(
                extractCategoryDetails(category).icon,
                extractCategoryDetails(category).count
              )
            "
          ></i>
        </span>
        <span class="tw-flex tw-justify-center tw-items-center tw-text-sm">
          {{ extractCategoryDetails(category).name }}
        </span>
        <span
          v-if="extractCategoryDetails(category).name != 'Fundme'"
          class="tw-text-gray-500 tw-bg-gray-200 tw-float-right tw-inline-block tw-absolute tw-right-0 tw-p-1 text-xs tw-bottom-2"
        >
          {{ extractCategoryDetails(category).count }}
        </span>
      </li>
    </ul>
    <span v-else>
      Categories Loading . . .
    </span>
    <div
      v-if="viewSubcategory"
      class="tw-bg-gray-800 tw-opacity-60 tw-absolute tw-top-0 tw-z-10 tw-w-full"
      style="height: 140vh"
    ></div>
    <div
      v-if="viewSubcategory"
      class="tw-absolute tw-top-1 tw-bg-blue-500 tw-z-20 tw-w-full"
    >
      <div class="tw-px-3">
        {{ currentCategory }}
        <span
          class="tw-float-right tw-cursor-pointer"
          @click="viewSubcategory = false"
          >X</span
        >
      </div>
      <ul class="tw-bg-blue-50 tw-p-4">
        <li
          class="tw-p-2 -tw-ml-2 tw-border tw-border-gray-200 tw-border-b-2 tw-text-sm tw-cursor-pointer hover:tw-bg-gray-200 hover:tw-to-blue-900"
          :class="{ 'tw-text-gray-400': subcategory.split(':')[1] == 0 }"
          v-for="subcategory in subcategories"
          v-bind:key="subcategory.index"
          @click="
            setSubcategory(
              subcategory,
              extractCategoryDetails(subcategory, 'subcategory').count
            )
          "
        >
          {{ extractCategoryDetails(subcategory, "subcategory").name }}
          <span
            >({{
              extractCategoryDetails(subcategory, "subcategory").count
            }})</span
          >
        </li>
      </ul>
      <p
        class="tw-text-center tw-cursor-pointer tw-bg-red-300"
        @click="viewSubcategory = false"
      >
        Close Subcategory
      </p>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { mapActions, mapState } from "vuex";
export default {
  name: "CategoryList",
  props: ["forMobile"],

  data: function() {
    return {
      categoryList: [],
      fetched: false,
      viewSubcategory: false,
      subcategories: null,
      currentCategory: "",
    };
  },
  computed: {
    ...mapActions(["setProps"]),
    ...mapState(["categories", "adsIsLoading"]),
  },
  methods: {
    getIconClass(icon, count) {
      //append styling based on ads count and skip the fundme item on the list
      //if(icon.lastIndexOf('cash') != -1) alert("found cash in : "+icon);
      icon +=
        count <= 0 && icon.lastIndexOf("cash") == -1
          ? " tw-text-gray-400"
          : " tw-text-blue-500";
      //alert(icon);
      return icon;
    },
    extractCategoryDetails(category, type = false) {
      //alert(category);
      if (type == "subcategory") {
        let catArray = category.split(":");
        let catAdCount = catArray[1];
        let catName = catArray[0];
        return { name: catName, count: catAdCount };
      }
      let catArray = category.split(":");
      let catName = catArray[0];
      let catIcon = catArray[1];
      let catImage = "assets/images/category-icons/" + catArray[2] + ".png";
      let catAdCount = catArray[3];
      return {
        icon: catIcon,
        name: catName,
        count: catAdCount,
        image: catImage,
      };
    },
    catCount: function() {
      if (this.categories != null && !this.categoryList.length) {
        for (let category in this.categories) {
          this.categoryList.push(
            category +
              ":mdi mdi-" +
              this.categories[category][1] +
              ":" +
              this.categories[category][0]
          );
          //alert(this.categories[category][0]);
        }
      }
      //console.log(this.categories.fashion.length);
      this.fetched = true;
      return this.categoryList;
    },
    getSubcategory: function(selectedCategory, adsCount) {
      if (selectedCategory.toLowerCase() == "fundme") {
        window.location = "http://www.fundme.hamsuper.com";
        return;
      }
      if (adsCount == 0) return; //don't run this function if no ads in subcategory
      this.currentCategory = selectedCategory;
      this.subcategories = this.categories[selectedCategory].slice();
      this.subcategories.shift();
      this.subcategories.shift();
      this.viewSubcategory = true;
      store.dispatch("setProps", {
        name: "category",
        value: this.currentCategory,
      });
      store.dispatch("setProps", {
        name: "currentCategoryAdsCount",
        value: adsCount,
      });
      store.dispatch("setProps", { name: "subcategory", value: null });
      store.dispatch("fetchData");
      //alert('from state: '+this.$store.state.category);
      //return this.categories[selectedCategory];
    },
    setSubcategory(subcategory, adsCount) {
      if (adsCount == 0) return; //don't run this function if no ads in subcategory
      let [subcat, count] = subcategory.split(":");
      store.dispatch("setProps", { name: "subcategory", value: subcat });
      store.dispatch("setProps", {
        name: "currentSubcategoryAdsCount",
        value: count,
      });
      this.viewSubcategory = false;
      store.dispatch("setProps", { name: "displayCategory", value: false });
      store.dispatch("fetchData");
      //alert('from state: '+this.$store.state.subcategory);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
