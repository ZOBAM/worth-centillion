<template>
  <article class="tw-bg-gray-50 tw-py-4 tw-flex tw-flex-wrap ">
    <section class="tw-w-full md:tw-w-2/5 tw-p-3">
      <h3 class="tw-text-lg tw-text-center tw-bg-blue-100 tw-p-2">Messages</h3>
      <div>
        <div
          v-for="msg of [1, 2, 3, 4]"
          :key="msg"
          class="tw-p-2 tw-bg-gray-200 tw-mb-2 tw-rounded-3xl tw-flex"
        >
          <div class="tw-bg-gray-100 tw-h-20 tw-w-20 tw-rounded-full"></div>
          <div
            class="tw-p-4 tw-bg-white tw-flex-grow tw-rounded-xl"
            style="min-height:5rem"
          >
            An add that you have chatted the seller
          </div>
        </div>
      </div>
    </section>
    <section class="tw-p-2 tw-w-full md:tw-w-3/5">
      <div class="tw-bg-blue-500 tw-text-white tw-text-center">
        <p>Don Zoby</p>
      </div>
      <div class="tw-h-2/4">
        <p>Messages page is working.</p>
      </div>
      <div class="tw-flex tw-bg-blue-200 tw-py-2">
        <div class="tw-flex-grow tw-bg-blue-50">
          <textarea
            name="message"
            id=""
            cols="4"
            rows="14"
            class="tw-rounded-md"
          ></textarea>
        </div>
        <div
          class="tw-bg-blue-600 tw-px-4 tw-py-2 tw-text-white tw-flex tw-items-center tw-justify-items-center tw-z-10 tw-rounded-2xl tw--ml-4"
        >
          Send
        </div>
      </div>
    </section>
  </article>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      messages: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    if (this.user.messages) alert(this.user.messages);
    console.log(this.user);
  },
};
</script>
