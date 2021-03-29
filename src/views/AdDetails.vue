<template>
  <div class="about">
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
            <span class="absolute right-0 font-thin" style="font-size: .8em">{{ad.created}}</span>
            </h1>
          <ul class="bg-gray-50 p-4">
            <!-- <li v-for="(value, name, index) in ad" v-bind:key = "index">
              {{name}} : {{value}}
            </li> -->
            <li><strong>Location:</strong> {{ad.place}}, {{ad.state}}</li>
            <li v-for="(fieldName, index) of adDetails" :key="index">
              <strong class="capitalize">{{index.replace('_', ' ')}}</strong> {{fieldName}}
            </li>
            <li><strong>Description:</strong> {{ad.description}}</li>
            <li></li>
          </ul>
        </div>
      </div>
      <div class="p-4 bg-blue-50 sm:w-1/3">
        <div class="p-4 text-gray-800 bg-white">
          <div 
            class="text-center bg-blue-500 text-white p-2 font-bold rounded-xl border-4 border-blue-100"
          >{{ad.seller.first_name +' '+ad.seller.last_name}}</div>
          <img :src="ad.seller.dp" alt="seller profile picture" class="block m-auto rounded-full mt-4">
          <div class="flex mt-12 justify-between text-xs text-center">
            <div class="px-2 py-1 border-b-4 border-blue-100">
              <span class="mdi mdi-account-plus text-sm"></span> <br>
              <span class="font-bold">Joined</span>  <br>
              {{ad.seller.created_at.split(':')[0]}}
            </div>
            <div class="bg-blue-500 text-white p-2">
              <span class="mdi mdi-shopping-outline text-sm"></span> <br>
              <span class="font-bold">Total Ads</span>  <br>
              {{ad.seller.ads_count}}
            </div>
            <div class="px-2 py-1 border-b-4 border-blue-100">
              <span class="mdi mdi-eye-check-outline text-sm"></span> <br>
              <span class="font-bold">Last Seen</span>  <br>
              {{ad.seller.updated_at.split(':')[0]}}
            </div>
          </div>
          <div class="from-blue-600 via-blue-400 bg-gradient-to-r mt-6 rounded-2xl p-2 relative">
            <span class="text-white">Call Seller:</span> 
            <div class="bg-gray-100 rounded-2xl p-2 absolute right-4 bottom-0">
              {{ad.seller.tel}}
            </div>
          </div>
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
      hiddenFields: ['id', 'ad_id', 'created_at', 'updated_at'],
    }
  },
  computed: {
    adDetails(){
      let adDetails = {};
      for(let fieldName in this.ad.details){
        if(this.ad.details[fieldName] && !this.hiddenFields.includes(fieldName)){
          adDetails[fieldName] = this.ad.details[fieldName];
        }
      }
      return adDetails;
    }
  },
  mounted(){
    let _this = this;
    let adID = this.$route.params.id;
    this.axios.get(process.env.VUE_APP_APIURL+"/ads/"+adID).then(function(response){
      _this.ad = response.data;
      console.log(_this.ad);
    });
    this.axios.get('http://www.api.hamsuper.net/sanctum/csrf-cookie').then(response => {
        console.log(response);
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