<template>
  <div
    class="tw-bg-white tw-text-red-800 tw-p-2 tw-rounded-xl tw-shadow-md"
    v-if="messages.length"
  >
    <span
      class="tw-h-4 tw-w-4 tw-bg-red-400 tw-inline-block tw-animate-ping tw-rounded-full"
    >
    </span>
    <span class="mdi mdi-information tw-text-red-500 tw--m-4"></span>
    <ul>
      <li v-for="(message, index) in messages" :key="index" class="tw-text-sm">
        {{ message }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ErrorAlert",
  props: ["messages"],
};
</script>
