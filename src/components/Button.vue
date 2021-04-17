<template>
  <button :class="btnStyle" :disabled="loading">
    <slot></slot>
    <span v-if="loading">
      . . .<span class="mdi mdi-star mdi-spin text-xl"></span>
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
        ? { "px-3 py-2 border-2 border-gray-600 bg-gray-200": true }
        : { "btn-primary": true };
    },
  },
};
</script>
