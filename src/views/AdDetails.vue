<template>
  <div class="about pt-24">
    <div v-if="ad" class="sm:flex">
      <div class="py-4 bg-white sm:w-2/3 flex-col justify-center text-gray-700">
        <div class="mt-8">
          <h1 class="text-center text-2xl">{{ad.title}}</h1>
          <img :src="ad.ad_images?ad.ad_images[0].link:ad.no_images" class="block m-auto my-8" style="max-height: 70vh">
          <div id="action-links" class="flex justify-around shadow-md mx-4">
            <span class="inline-block bg-gray-200" aria-disabled="true">{{ad.hits}} <span class="mdi mdi-eye"></span> </span>
            <a href="" class="inline-block bg-blue-500"> Share <span class="mdi mdi-share-variant"></span> </a>
            <a href="" class="inline-block bg-blue-500"> <span class="mdi mdi-heart-outline"></span> </a>
          </div>
        </div>  
        <div class="bg-gray-200 p-4">
          <h1 class ="text-center relative">
            <span class="font-extrabold">₦{{ad.price}} <span v-if="ad.negotiable">(Negotiable)</span> </span>
            <span class="absolute right-0 font-thin" style="font-size: .8em">12 Feb, 2020</span>
            </h1>
          <ul class="bg-gray-50 p-4">
            <!-- <li v-for="(value, name, index) in ad" v-bind:key = "index">
              {{name}} : {{value}}
            </li> -->
            <li><strong>Location:</strong> {{ad.place}}, {{ad.state}}</li>
            <li><strong>Description:</strong> {{ad.description}}</li>
            <li></li>
          </ul>
        </div>
      </div>
      <div class="p-4 bg-blue-200 sm:w-1/3">
        <div class="bg-blue-800 p-4">
          <h1 class ="">Seller Details Section</h1>
          <h1 class ="">Loading . . .</h1>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },
  data(){
    return{
      ad: null,
    }
  },
  mounted(){
    let _this = this;
    let adID = this.$route.params.id;
    this.axios.get(process.env.VUE_APP_APIURL+"/ads/"+adID).then(function(response){
      _this.ad = response.data;
      console.log(_this.ad);
    });
  }
}
</script>
<style lang="scss" scoped>
  #action-links{
    a{
      display: inline-block;
      min-width: 4rem;
      text-align: center;
      padding: .5rem 1rem;
      color: white;
    }
    a:hover{
      background-color:rgb(19, 43, 116);
    }
  }
  #action-links>span{
    display: inline-block;
    min-width: 4rem;
    text-align: center;
    padding: .5rem 1rem;
    color:royalblue
  }
</style>