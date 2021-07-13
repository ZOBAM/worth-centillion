<template>
  <section
    class="tw-w-screen tw-h-screen tw-bg-gray-900 tw-fixed tw-top-0 tw-z-20 tw-opacity-80"
  ></section>
  <div class="tw-fixed tw-inset-0 tw-z-30">
    <div @click.self="$emit('close-modal')" class="tw-flex tw-h-full">
      <div
        class="tw-bg-white tw-m-auto tw-px-4 tw-py-8 tw-flex tw-flex-wrap tw-relative"
      >
        <div
          class="tw-w-auto tw-bg-red-500 tw-text-white tw-absolute tw-z-40 tw--top-6 hover:tw-bg-red-900 tw-cursor-pointer tw-right-0 tw-rounded-full tw-p-2"
          title="close"
          @click.self="$emit('close-modal')"
          v-if="!isLoading"
        >
          Close X
        </div>
        <div class="tw-w-full tw-flex tw-justify-center tw-text-center">
          <template v-if="!isLoading">
            <slot></slot>
          </template>
          <template v-else>
            <div class="tw-w-32">
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
