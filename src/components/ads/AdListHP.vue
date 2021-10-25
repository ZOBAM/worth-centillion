<template>
  <div class="bg-gray-50 text-white flex justify-between">
    <div
      v-if="ad.promoted != 'bronze'"
      class="border-2 border-blue-500 text-blue-500 max-w-[4rem] p-1"
      :class="{
        'border-b-2 border-b-red-300': ad.promoted == 'gold',
        'border-b-2 border-b-gray-300': ad.promoted == 'silver',
      }"
    >
      Hot! <span class="mdi mdi-star"></span>
    </div>
    <div class="text-gray-900 max-w-[4rem] p-1 opacity-40">
      {{ ad.num_of_images }}<span class="mdi mdi-image"></span>
    </div>
    <div class="text-red-900 max-w-[4rem] p-1 opacity-40">
      {{ ad.likes }}<span class="mdi mdi-heart"></span>
    </div>
  </div>
  <div
    class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-md relative"
  >
    <router-link
      :to="'/ads/' + ad.id"
      class="flex flex-wrap no-underline hover:no-underline"
    >
      <div class="m-auto w-full">
        <img
          class="block w-full m-auto max-h-36 sm:max-h-48"
          :src="ad.ad_img"
          alt=""
        />
      </div>
      <div class="w-full absolute bottom-0 bg-gray-200 opacity-90">
        <div
          class="w-full font-bold text-sm text-gray-800 px-2 sm:px-3 line-clamp-1 pt-1"
        >
          {{ ad.title }}
        </div>
        <p class="w-full text-blue-800 text-xs md:text-sm px-6">
          <span class="float-right">₦{{ ad.price }}</span>
        </p>
      </div>
    </router-link>
  </div>
  <div
    class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow px-6"
  >
    <div class="flex items-center justify-start">
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
