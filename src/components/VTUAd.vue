<template>
  <div
    class="cursor-pointer flex h-28 w-full md:w-1/3 bg-gradient-to-r from-black to-blue-900 p-2 hover:from-indigo-900"
    @click="go()"
  >
    <div class="text-white w-2/3">
      <span class="bg-red-500 py-1 px-2 rounded-xl">Get</span> <br />
      <span
        class="rate-desc border border-gray-200 mt-2 -mx-8 py-1 px-2 w-28 text-center inline-block rounded-md"
      >
        <span class="text-yellow-300 font-medium">Cheap Data </span> <br />
        <span class="text-blue-200 font-medium">& airtime</span>
      </span>
    </div>
    <div
      class="vtu-title w-1/3 text-gray-300 text-right opacity-0 bg-[#ffff33]"
    >
      Hamsuper VTU
    </div>
  </div>
</template>
<script>
import router from "../router";
export default {
  name: "VTUAd",
  methods: {
    go() {
      router.push("/vtu");
    },
  },
};
</script>
<style lang="scss" scoped>
.rate-desc {
  animation-name: rateAnim;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-delay: 2s;
  animation-fill-mode: forwards;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
}
@keyframes rateAnim {
  0% {
    margin-left: 0rem;
    border: 3px solid red;
  }
  25% {
    margin-left: 5%;
    border: 3px solid rgb(180, 5, 5);
    transform: rotate(5deg);
  }
  50% {
    margin-left: 15%;
    border: 3px solid rgb(136, 62, 62);
    transform: rotate(10deg);
  }
  75% {
    margin-left: 30%;
    border: 3px solid rgb(60, 127, 190);
    transform: rotate(5deg);
  }
  100% {
    margin-left: 45%;
    transform: rotate(0deg);
  }
}
.vtu-title {
  animation-name: titleAnim;
  animation-duration: 3s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
}
@keyframes titleAnim {
  0% {
    opacity: 0.1;
  }
  10% {
    opacity: 0.2;
  }
  20% {
    opacity: 0.3;
  }
  30% {
    opacity: 0.4;
  }
  40% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.6;
  }
  60% {
    opacity: 0.7;
  }
  70% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.9;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    font-weight: bolder;
  }
}
</style>
