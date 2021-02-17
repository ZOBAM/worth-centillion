<template>
  <div>
    <ul v-if="categories">
      <li v-for="category in catCount()" v-bind:key="category.index" class="flex border-b-2 border-white py-2 cursor-pointer" @click="getSubcategory(category.split(':')[0])">
        <span class="flex justify-center items-center">
          <i :class="category.split(':')[1]" class=" text-blue-400 rounded-lg mr-2"></i> 
        </span>
        <span class="flex justify-center items-center">
          {{category.split(':')[0]}}
        </span>
      </li>
    </ul> 
    <span v-else>
      Categories Loading . . . 
    </span> 
    <div v-if="viewSubcategory" class="bg-gray-800 opacity-60 absolute top-0 z-10 w-full" style="height: 140vh"></div>
    <div v-if="viewSubcategory" class="absolute top-1 bg-blue-500 z-20 w-full">
      <div class="px-3">{{currentCategory}} <span class="float-right cursor-pointer" @click="viewSubcategory = false">X</span> </div>
      <ul class="bg-blue-50 p-4">
        <li class="py-2 border border-gray-200 border-b-2" v-for="subcategory in subcategories" v-bind:key="subcategory.index" @click="setSubcategory(subcategory)">
          {{subcategory}}
        </li>
      </ul>
      <p class="text-center cursor-pointer bg-red-300" @click="viewSubcategory = false">Close Subcategory</p>
    </div>
  </div>
</template>

<script>
import store from '../store';
import {mapActions} from 'vuex';
export default {
  name: "CategoryList",
  props: {
    categories: Object
  },
  data: function(){
    return{
      categoryList: [],
      fetched: false,
      viewSubcategory: false,
      subcategories: null,
      currentCategory: ''
    }
  },
  computed:{
    ...mapActions(['setProps']),
  },
  methods: {
    catCount: function(){
      if(this.categories != null && !this.categoryList.length){
        for(let category in this.categories){
          this.categoryList.push(category + ':mdi mdi-' + this.categories[category][0]);
        }
      }
      //console.log(this.categories.fashion.length);
      this.fetched = true;
      return this.categoryList;
    },
    getSubcategory: function(selectedCategory){
      if(selectedCategory.toLowerCase() == 'fundme'){
        window.location = 'http://www.fundme.worthcentillion.com';
        return;
      }
      this.currentCategory = selectedCategory;
      this.subcategories = this.categories[selectedCategory];
      this.subcategories.shift();
      this.viewSubcategory = true;
      store.dispatch('setProps', {name: 'category', value: this.currentCategory});
      alert('from state: '+this.$store.state.category);
      //return this.categories[selectedCategory];
    },
    setSubcategory(subcategory){
      store.dispatch('setProps', {name: 'subcategory', value: subcategory});
      this.viewSubcategory = false;
      //alert('from state: '+this.$store.state.subcategory);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
