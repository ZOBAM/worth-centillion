<template>
    <div class = "pt-24">
        <div class="bg-gray-100 flex flex-col md:flex-row text-gray-800">
            <div class="w-full md:w-1/4 bg-blue-50 p-4">
                <h1>Filter search result</h1>
                <div class="h-14 bg-gray-300 mt-4 p-4">
                    Loading . . . 
                </div>
            </div>
            <div class="w-full md:w-3/4 p-4">
                <loading v-if="results == null"></loading>
                <div v-else class="bg-gray-100">
                    <h1 class="text-center">Found {{resultCount}} results </h1>
                    <ul v-if="resultCount>0">
                        <li 
                        v-for="result in results" :key="result.id"
                        class="flex shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-50 mt-1"
                        @click="showAd(result.id)"
                        >
                            <div class="w-1/4 flex justify-center items-center">
                                <img :src = "result.ad_image" alt="">
                            </div>
                            <div class="p-4 w-3/4">
                                <h2 class="bg-blue-200 text-black font-bold p-2">{{result.title}}</h2> 
                                <p class="pt-2">
                                    {{result.description}}
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
import Loading from '../components/Loading.vue';
export default {
  components: { Loading },
    data(){
        return {
            results: null,
            resultCount: 0,
        }
    },
    methods:{
        showAd(id){
            this.$router.push('/ads/'+id);
        }
    },
    mounted(){
        let query = this.$route.query.query;
        let _this = this;
        this.axios.get(process.env.VUE_APP_APIURL+'/search?query='+query).then(function(response){
            console.log(response.data);
            _this.results = response.data.search_results;
            _this.resultCount = response.data.result_count;
        })
    }
}
</script>