<template>
  <article class="tw-flex sm:tw-flex-row tw-flex-col">
    <div
      class="tw-cursor-pointer tw-flex tw-h-28 tw-w-full md:tw-w-1/3 tw-bg-gradient-to-r tw-from-black tw-to-blue-900 tw-p-2 hover:tw-from-indigo-900 tw--mt-8 sm:tw-max-w-[23rem] tw-m-auto"
      @click="go()"
    >
      <div class="tw-text-white tw-w-2/3">
        <span class="act-get tw-bg-red-500 tw-py-1 tw-px-2 tw-rounded-xl"
          >Get</span
        >
        <br />
        <span
          class="rate-desc tw-border tw-border-gray-200 tw-mt-2 -tw-mx-8 tw-py-1 tw-px-2 tw-w-28 tw-text-center tw-inline-block tw-rounded-md tw--mt-3 sm:tw--mt-0"
        >
          <span class="tw-text-yellow-300 tw-font-medium">Cheap Data </span>
          <br />
          <span class="tw-text-blue-200 tw-font-medium">& airtime</span>
        </span>
      </div>
      <div class="vtu-title tw-w-1/3 tw-text-gray-300 tw-text-right opacity-0">
        Hamsuper VTU
      </div>
    </div>
    <div
      class="tw-cursor-pointer tw-flex tw-flex-col tw-h-28 tw-w-full md:tw-w-1/3 tw-bg-gradient-to-b tw-from-white tw-to-blue-300 hover:tw-from-indigo-900 tw--mt-8 sm:tw-max-w-[23rem] tw-m-auto"
      @click="go('invite')"
    >
      <div class="tw-text-white tw-w-2/3 tw-m-auto">
        <div
          class="act-get tw-bg-red-500 tw-py-1 tw-px-2 tw-rounded-xl tw-text-center"
        >
          Get Free Data Bonus
        </div>
      </div>
      <div
        class="tw-w-full tw-bg-indigo-600 tw-text-yellow-500 tw-flex tw-justify-between"
      >
        <span class="tw-bg-blue-900 tw-px-2">Invite friends</span>
        <span class="tw-bg-blue-900 tw-px-2">Post Your Ads</span>
      </div>
    </div>
  </article>
</template>
<script>
import { gsap } from "gsap";
import router from "../router";

export default {
  name: "VTUAd",
  methods: {
    go(destination = "vtu") {
      if (destination != "vtu") {
        router.push("/" + destination);
      } else {
        router.push("/vtu");
      }
    },
  },
  mounted() {
    gsap.from(".rate-desc", {
      duration: 3,
      x: "-45%",
      scale: 0.000001,
      rotate: 360,
    });
    gsap.from(".vtu-title", {
      duration: 2,
      delay: 2,
      y: 90,
      opacity: 0.1,
      scale: 0.01,
    });
    gsap.from(".act-get", {
      duration: 1,
      scale: 0.001,
      repeatDelay: 5,
      repeat: -1,
    });
  },
};
</script>
<style lang="scss" scoped>
.rate-desc {
  margin-left: 45%;
  animation-name: rateAnim;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-delay: 2s;
  animation-fill-mode: forwards;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
}
/* @keyframes rateAnim {
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
} */
.vtu-title {
  animation-name: titleAnim;
  animation-duration: 3s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
}
/* @keyframes titleAnim {
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
    tw-font-weight: bolder;
  }
} */
.act-get {
  font-size: 1em;
}
</style>
