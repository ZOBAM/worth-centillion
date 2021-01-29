<template>
  <div>
    <ul v-if="categories">
      <li v-for="category in catCount()" v-bind:key="category.index" class="flex border-b-2 border-white py-2">
        <span class="flex justify-center items-center">
          <i class="material-icons text-white bg-gray-400 rounded-lg mr-2">blur_on</i> 
        </span>
        <span class="flex justify-center items-center">
          {{category}}
        </span>
      </li>
    </ul> 
    <span v-else>
      Categories Loading . . . 
    </span> 
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  props: {
    categories: Object
  },
  data: function(){
    return{
      categoryList: [],
      fetched: false
    }
  },
  methods: {
    catCount: function(){
      if(this.categories != null){
        for(let category in this.categories){
          this.categoryList.push(category);
        }
      }
      //console.log(this.categories.fashion.length);
      this.fetched = true;
      return this.categoryList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
