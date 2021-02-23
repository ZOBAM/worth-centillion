<template>
    <div class="fixed w-full top-0 bg-gray-900 z-20 mt-20 p-2 opacity-95" id="location-div">
        <div class="flex flex-wrap bg-gray-100 rounded-xl text-gray-800 p-2 h-auto opacity-100 shadow-md text-sm relative">
            <div class="text-gray-700 w-full p-2 border-b-2 border-blue-200 text-center">
                <span class="mdi mdi-location-enter"></span>Location: 
                <span class="font-bold text-lg">{{currentLocation}}</span>
            </div>
            <div class="overflow-y-scroll w-1/3 h-96">
                <ul v-if="states != null" class="px-2 text-gray-800">
                    <li v-if="state" @click="clearLocation()" class="cursor-pointer">All of Nigeria</li>
                    <li 
                        v-for="(state, index) in states" @click="getLGA(index, extractLocation(index).adsCount)" 
                        :key="index" 
                        class="hover:bg-gray-200"
                        :class="extractLocation(index).listClass"
                    >
                        {{ extractLocation(index).name }} ({{ extractLocation(index).adsCount }})
                    </li>
                </ul>
            </div>
            <div class="overflow-y-scroll w-2/3 h-96">
                <ul class="px-2 " v-if="states != null">
                    <li 
                        v-for="(lga, index) in states[currentState]" 
                        @click="setLGA(index, extractLocation(lga).adsCount)" 
                        :key="index" 
                        class="hover:bg-blue-200"
                        :class="extractLocation(lga).listClass"
                    >
                        {{ extractLocation(lga).name }} ({{ extractLocation(lga).adsCount }})
                    </li>
                </ul>
            </div>
            <button 
                class="bg-blue-700 text-blue-200 float-right absolute bottom-1 p-2 rounded-lg transition-transform transform"
                :class = "{'rotate-0 right-2': currentLGAState, 'rotate-90 bottom-12 -right-8': !currentLGAState}"
                @click="saveLocation()"
            >Save Location</button>
        </div>
    </div>
</template>
<script>
import store from "../store";
import {mapState} from "vuex";
export default {
    name: "Location",
    data(){
        return{
            //for the locaation component
            currentState: null,
            currentLocation: "All of Nigeria",
            previousState: null,
            currentLGA: null,
        }
    },
    methods: {
        clearLocation(){
            this.currentState = null;
            store.dispatch('setProps', {name: "lga", value: null});
            store.dispatch('setProps', {name: "state", value: null});
            store.dispatch('fetchData');
            store.dispatch("setProps", {name: "displayLocation", value: !this.displayLocation});
        },
        extractLocation(data){
            let [name, adsCount] = data.split(':');
            let listClass = adsCount>0? 'cursor-pointer ' : 'text-gray-400';
            return ({name, adsCount, listClass});
        },
        saveLocation(){
            store.dispatch("setProps", {name: "displayLocation", value: !this.displayLocation});
            store.dispatch('fetchData');
        },
        getLGA: function(index, adsCount){
            if(adsCount <= 0) return;
            this.currentState = index;
            this.currentLocation = this.extractLocation(this.currentState).name;
            store.dispatch('setProps',{name: 'state', value: this.extractLocation(this.currentState).name});
            store.dispatch('setProps', {name: "lga", value: null})
            this.currentLGA = null;
            //alert(this.states[index])
        },
        setLGA: function(index, adsCount){
            if(adsCount <= 0) return;
            this.currentLGA = this.states[this.currentState][index];
            store.dispatch('setProps', {name: "lga", value: this.extractLocation(this.currentLGA).name})
            this.currentLocation = this.extractLocation(this.currentLGA).name+ ' in '+this.extractLocation(this.currentState).name;
            //alert(this.currentLGA)
        }
    },
    computed:{
        ...mapState([
            "states",
            "displayLocation",
            "state"
        ]),
        currentLGAState(){
            return this.currentState == null? false : true;
        }
    },
    mounted(){
        store;
        //this.states = this.$store.state.states;
    }
}
</script>
<style lang="scss" scoped>
    @media only screen and (max-width: 768px){
        #location-div{
        background-color: rgb(5, 14, 133); height: 81vh; top: 0vh;
        }
        #location-div>div{
            height: 79vh; top: 0vh;
        }
    }
</style>