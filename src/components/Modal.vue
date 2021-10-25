<template>
  <section
    class="w-screen h-screen bg-gray-900 fixed top-0 z-20 opacity-80"
  ></section>
  <div class="fixed inset-0 z-30">
    <div @click.self="$emit('close-modal')" class="flex h-full">
      <div class="bg-white m-auto px-4 py-8 flex flex-wrap relative">
        <div
          class="w-auto bg-red-500 text-white absolute z-40 -top-6 hover:bg-red-900 cursor-pointer right-0 rounded-full p-2"
          title="close"
          @click.self="$emit('close-modal')"
          v-if="!isLoading"
        >
          Close X
        </div>
        <div class="w-full flex justify-center text-center">
          <template v-if="!isLoading">
            <slot></slot>
          </template>
          <template v-else>
            <div class="w-32">
              <loading></loading>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "./Loading.vue";

export default {
  name: "Modal",
  emits: ["close-modal", "ad-promoted"],
  props: ["loading"],
  components: {
    Loading,
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.loading;
    },
  },
};
</script>
