<template>
  <button :class="btnStyle" :disabled="loading" class="tw-rounded-lg">
    <slot></slot>
    <span v-if="loading">
      . . .<span class="mdi mdi-star mdi-spin tw-text-xl"></span>
    </span>
  </button>
</template>
<script>
export default {
  name: "Button",
  props: ["loading"],
  computed: {
    btnStyle() {
      return this.loading
        ? {
            "tw-px-3 tw-py-2 tw-border-2 tw-border-gray-600 tw-bg-gray-200": true,
          }
        : { "btn-primary": true };
    },
  },
};
</script>
