<template>
    <div class="absolute w-full min-h-screen top-0 bg-gray-900 z-20 mt-20 p-2 opacity-95">
        <div class="flex flex-wrap bg-gray-100 rounded-3xl text-gray-800 p-2 h-auto opacity-100 shadow-md text-sm relative">
            <div class="text-gray-700 w-full p-2 border-b-2 border-blue-200 text-center">
                <span class="mdi mdi-location-enter"></span>Location: <span class="font-bold text-lg">{{currentLocation}}</span>
            </div>
            <div class="overflow-y-scroll w-1/3 h-96">
                <ul v-if="states != null" class="px-2 text-gray-800">
                    <li v-for="(state, index) in states" @click="getLGA(index)" :key="index" class="cursor-pointer hover:bg-gray-200">
                        {{ index }}
                    </li>
                </ul>
            </div>
            <div class="overflow-y-scroll w-2/3 h-96">
                <ul class="px-2 " v-if="states != null">
                    <li v-for="(state, index) in states[currentState]" @click="setLGA(index)" :key="index" class="cursor-pointer hover:bg-blue-200">
                        {{ state }}
                    </li>
                </ul>
            </div>
            <button class="bg-blue-700 text-blue-200 float-right absolute right-0 bottom-1 p-2 rounded-lg">Save Location</button>
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
            currentLGA: null,
        }
    },
    methods: {
        getLGA: function(index){
            this.currentState = index;
            this.currentLocation = this.currentState;
            store.dispatch('setProps',{name: 'state', value: this.currentState});
            //alert(this.states[index])
        },
        setLGA: function(index){
            this.currentLGA = this.states[this.currentState][index];
            store.dispatch('setProps', {name: "lga", value: this.currentLGA})
            this.currentLocation = this.currentLGA+ ' in '+this.currentState;
            //alert(this.currentLGA)
        }
    },
    computed:{
        ...mapState(["states"]),
    },
    mounted(){
        store;
        //this.states = this.$store.state.states;
    }
}
</script>