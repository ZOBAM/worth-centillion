<template>
  <div>
    <div
      v-if="categories && forMobile"
      class="flex flex-wrap p-2 justify-items-center text-center items-center bg-indigo-50 rounded-lg"
      style="width:96%; margin:auto"
    >
      <div
        v-for="category in catCount()"
        v-bind:key="category.index"
        class="w-1/3 sm:w-1/6 gray-100 p-1"
      >
        <div
          class="bg-white "
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
            class="w-20 h-16 m-auto"
          />
          <div
            class="text-xs border border-gray-50 h-9 leading-4 flex justify-center items-center"
          >
            <span
              :class="{
                'text-gray-500':
                  extractCategoryDetails(category).count <= 0 &&
                  category.lastIndexOf('Fundme') != false,
              }"
            >
              {{ extractCategoryDetails(category).name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <ul v-else-if="categories && forMobile == false">
      <li
        v-for="category in catCount()"
        v-bind:key="category.index"
        class="flex border-b-2 border-white py-2 cursor-pointer relative hover:bg-gray-300 hover:text-gray-900"
        :class="{
          'text-gray-500':
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
        <span class="flex justify-center items-center">
          <i
            class="rounded-lg mr-2"
            :class="
              getIconClass(
                extractCategoryDetails(category).icon,
                extractCategoryDetails(category).count
              )
            "
          ></i>
        </span>
        <span class="flex justify-center items-center text-sm">
          {{ extractCategoryDetails(category).name }} <br />
          {{
            extractCategoryDetails(category).name == "Fundme"
              ? ""
              : extractCategoryDetails(category).count
          }}
        </span>
        <span
          v-if="extractCategoryDetails(category).name != 'Fundme'"
          class="text-gray-500 bg-gray-200 float-right inline-block absolute right-0 p-1 text-xs bottom-2"
        >
          <span class="mdi mdi-menu"></span>
        </span>
      </li>
    </ul>
    <span v-else>
      Categories Loading . . .
    </span>
    <div
      v-if="viewSubcategory"
      class="bg-gray-800 opacity-60 absolute top-0 z-10 w-full"
      style="height: 140vh"
    ></div>
    <div
      v-if="viewSubcategory"
      class="absolute top-1 sm:top-0 bg-blue-500 z-20 w-full -ml-2 sm:m-0 p-1"
    >
      <div class="w-full pl-3 py-1 text-gray-300 flex">
        <div class="w-3/4">
          {{ currentCategory }}
        </div>
        <div
          class="cursor-pointer border-2 border-blue-300 p-1 w-1/4 text-center hover:bg-red-600"
          @click="viewSubcategory = false"
        >
          X
        </div>
      </div>
      <ul class="bg-blue-50 p-4">
        <li
          class="p-2 -ml-2 border border-gray-200 border-b-2 text-sm cursor-pointer hover:bg-gray-200 hover:to-blue-900"
          :class="{ 'text-gray-400': subcategory.split(':')[1] == 0 }"
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
        class="text-center cursor-pointer bg-red-300 hover:bg-red-600"
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
          ? " text-gray-400"
          : " text-blue-500";
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
    getSubcategory(selectedCategory, adsCount) {
      if (selectedCategory.toLowerCase() == "fundme") {
        window.location = "http://www.fundme.hamsuper.com";
        return;
      }
      if (adsCount == 0) {
        this.$toast.add({
          severity: "info",
          summary: "Emty Category",
          detail: "There is no ads in this category",
          life: 2500,
        });
        return;
      } //don't run this function if no ads in subcategory
      this.currentCategory = selectedCategory;
      this.subcategories = this.categories[selectedCategory].slice();
      this.subcategories.shift();
      this.subcategories.shift();
      this.viewSubcategory = true;
      store.dispatch("setProps", { category: this.currentCategory });
      store.dispatch("setProps", { currentCategoryAdsCount: adsCount });
      store.dispatch("setProps", { subcategory: null });
      store.dispatch("fetchData");
      //alert('from state: '+this.$store.state.category);
      //return this.categories[selectedCategory];
    },
    setSubcategory(subcategory, adsCount) {
      if (adsCount == 0) return; //don't run this function if no ads in subcategory
      let [subcat, count] = subcategory.split(":");
      store.dispatch("setProps", { subcategory: subcat });
      store.dispatch("setProps", { currentSubcategoryAdsCount: count });
      this.viewSubcategory = false;
      store.dispatch("setProps", { displayCategory: false });
      store.dispatch("fetchData");
      //alert('from state: '+this.$store.state.subcategory);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
