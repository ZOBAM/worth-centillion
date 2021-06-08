<template>
  <div
    class="tw-fixed tw-w-full tw-top-0 tw-bg-gray-900 tw-z-20 tw-mt-20 tw-p-2 tw-opacity-95"
    id="location-div"
  >
    <div
      class=" tw-bg-gray-100 tw-rounded-xl tw-text-gray-800 tw-p-2 tw-h-auto tw-opacity-100 shadow-md tw-text-sm tw-relative"
    >
      <div
        class="tw-text-gray-700 tw-w-full tw-p-2 tw-border-b-2 tw-border-blue-200 tw-text-center"
      >
        <span class="mdi mdi-location-enter"></span>Location:<span
          class="tw-font-bold tw-text-lg"
          >{{ currentLocation }}</span
        >
      </div>
      <div class="tw-flex">
        <div class="tw-overflow-y-scroll tw-w-1/3 tw-h-96">
          <ul v-if="states != null" class="tw-px-2 tw-text-gray-800">
            <li v-if="state" @click="clearLocation()" class="tw-cursor-pointer">
              All of Nigeria
            </li>
            <li
              v-for="(state, index) in states"
              @click="getLGA(index, extractLocation(index).adsCount)"
              :key="index"
              class="hover:tw-bg-gray-200"
              :class="extractLocation(index).listClass"
            >
              {{ extractLocation(index).name }} ({{
                extractLocation(index).adsCount
              }})
            </li>
          </ul>
        </div>
        <div class="tw-overflow-y-scroll tw-w-2/3 tw-h-96">
          <ul class="tw-px-2 " v-if="states != null">
            <li
              v-for="(lga, index) in states[currentState]"
              @click="setLGA(index, extractLocation(lga).adsCount)"
              :key="index"
              class="hover:tw-bg-blue-200"
              :class="extractLocation(lga).listClass"
            >
              {{ extractLocation(lga).name }} ({{
                extractLocation(lga).adsCount
              }})
            </li>
          </ul>
        </div>
      </div>
      <button
        class="tw-bg-blue-700 tw-text-blue-200 tw-float-right tw-absolute tw-bottom-1 tw-p-2 tw-rounded-lg tw-transition-transform tw-transform"
        :class="{
          'tw-rotate-0 tw-right-2': currentLGAState,
          'tw-rotate-90 tw-bottom-12 tw--right-8': !currentLGAState,
        }"
        @click="saveLocation()"
      >
        Save Location
      </button>
    </div>
  </div>
</template>
<script>
import store from "../store";
import { mapState } from "vuex";
export default {
  name: "Location",
  data() {
    return {
      //for the locaation component
      currentState: null,
      currentLocation: "All of Nigeria",
      previousState: null,
      currentLGA: null,
    };
  },
  methods: {
    clearLocation() {
      this.currentState = null;
      store.dispatch("setProps", { name: "lga", value: null });
      store.dispatch("setProps", { name: "state", value: null });
      store.dispatch("fetchData");
      store.dispatch("setProps", {
        name: "displayLocation",
        value: !this.displayLocation,
      });
    },
    extractLocation(data) {
      let [name, adsCount] = data.split(":");
      let listClass = adsCount > 0 ? "tw-cursor-pointer " : "tw-text-gray-400";
      return { name, adsCount, listClass };
    },
    saveLocation() {
      store.dispatch("setProps", {
        name: "displayLocation",
        value: !this.displayLocation,
      });
      store.dispatch("fetchData");
    },
    getLGA: function(index, adsCount) {
      if (adsCount <= 0) return;
      this.currentState = index;
      this.currentLocation = this.extractLocation(this.currentState).name;
      store.dispatch("setProps", {
        name: "state",
        value: this.extractLocation(this.currentState).name,
      });
      store.dispatch("setProps", { name: "lga", value: null });
      this.currentLGA = null;
      //alert(this.states[index])
    },
    setLGA: function(index, adsCount) {
      if (adsCount <= 0) return;
      this.currentLGA = this.states[this.currentState][index];
      store.dispatch("setProps", {
        name: "lga",
        value: this.extractLocation(this.currentLGA).name,
      });
      this.currentLocation =
        this.extractLocation(this.currentLGA).name +
        " in " +
        this.extractLocation(this.currentState).name;
      //alert(this.currentLGA)
    },
  },
  computed: {
    ...mapState(["states", "displayLocation", "state"]),
    currentLGAState() {
      return this.currentState == null ? false : true;
    },
  },
  mounted() {
    store;
    //this.states = this.$store.state.states;
  },
};
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
  #location-div {
    background-color: rgb(5, 14, 133);
    height: 81vh;
    top: 0vh;
  }
  #location-div > div {
    height: 79vh;
    top: 0vh;
  }
}
</style>
