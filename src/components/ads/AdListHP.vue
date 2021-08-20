<template>
  <div class="tw-bg-gray-50 tw-text-white tw-flex tw-justify-between">
    <div
      v-if="ad.promoted != 'bronze'"
      class="tw-border-2 border-blue-500 tw-text-blue-500 tw-max-w-[4rem] tw-p-1"
      :class="{
        'tw-border-b-2 tw-border-b-red-300': ad.promoted == 'gold',
        'tw-border-b-2 tw-border-b-gray-300': ad.promoted == 'silver',
      }"
    >
      Hot! <span class="mdi mdi-star"></span>
    </div>
    <div class="tw-text-gray-900 tw-max-w-[4rem] tw-p-1">
      {{ ad.num_of_images }}<span class="mdi mdi-image"></span>
    </div>
    <div class="tw-text-red-900 tw-max-w-[4rem] tw-p-1">
      {{ ad.likes }}<span class="mdi mdi-heart"></span>
    </div>
  </div>
  <div
    class="tw-flex-1 tw-bg-white tw-rounded-t tw-rounded-b-none tw-overflow-hidden tw-shadow-md tw-relative"
  >
    <router-link
      :to="'/ads/' + ad.id"
      class="tw-flex tw-flex-wrap tw-no-underline hover:tw-no-underline"
    >
      <div class="tw-m-auto tw-w-full">
        <img
          class="tw-block tw-w-full tw-m-auto tw-max-h-36 sm:tw-max-h-48"
          :src="ad.ad_img"
          alt=""
        />
      </div>
      <div
        class="tw-w-full tw-absolute tw-bottom-0 tw-bg-gray-200 tw-opacity-90"
      >
        <div
          class="tw-w-full tw-font-bold tw-text-sm tw-text-gray-800 tw-px-2 sm:tw-px-3 tw-line-clamp-1 tw-pt-1"
        >
          {{ ad.title }}
        </div>
        <p class="tw-w-full tw-text-blue-800 tw-text-xs md:tw-text-sm tw-px-6">
          <span class="tw-float-right">₦{{ ad.price }}</span>
        </p>
      </div>
    </router-link>
  </div>
  <div
    class="tw-flex-none tw-mt-auto tw-bg-white tw-rounded-b tw-rounded-t-none tw-overflow-hidden tw-shadow tw-px-6"
  >
    <div class="tw-flex tw-items-center tw-justify-start">
      <!-- <button class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Add to Cart
              </button> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "AdListHP",
  props: ["ad"],
};
</script>
