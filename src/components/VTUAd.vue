<template>
  <article class="flex sm:flex-row flex-col">
    <div
      class="cursor-pointer flex h-28 w-full md:w-1/3 bg-gradient-to-r from-black to-blue-900 p-2 hover:from-indigo-900 -mt-8 sm:max-w-[23rem] m-auto"
      @click="go()"
    >
      <div class="text-white w-2/3">
        <span class="act-get bg-red-500 py-1 px-2 rounded-xl">Get</span>
        <br />
        <span
          class="rate-desc border border-gray-200 mt-2 -mx-8 py-1 px-2 w-28 text-center inline-block rounded-md -mt-3 sm:-mt-0"
        >
          <span class="text-yellow-300 font-medium">Cheap Data </span>
          <br />
          <span class="text-blue-200 font-medium">& airtime</span>
        </span>
      </div>
      <div class="vtu-title w-1/3 text-gray-300 text-right opacity-0">
        Hamsuper VTU
      </div>
    </div>
    <div
      class="cursor-pointer flex flex-col h-28 w-full md:w-1/3 bg-gradient-to-b from-white to-blue-300 hover:from-indigo-900 -mt-8 sm:max-w-[23rem] m-auto"
      @click="go('invite')"
    >
      <div class="text-white w-2/3 m-auto">
        <div class="act-get bg-red-500 py-1 px-2 rounded-xl text-center">
          {{ currentMessage }}
        </div>
      </div>
      <div class="w-full bg-indigo-600 text-yellow-500 flex justify-between">
        <span class="bg-blue-900 px-2">Invite friends</span>
        <span class="bg-blue-900 px-2">Post Your Ads</span>
      </div>
    </div>
  </article>
</template>
<script>
import { gsap } from "gsap";
import router from "../router";

export default {
  name: "VTUAd",
  data() {
    return {
      actGetMessages: [
        "Invite your friends",
        "Post new ads",
        "Get Free Data Bonus!",
      ],
      currentMessage: "Invite your friends",
      currentIndex: 0,
    };
  },
  methods: {
    go(destination = "vtu") {
      if (destination != "vtu") {
        router.push("/" + destination);
      } else {
        router.push("/vtu");
      }
    },
    changeMessage() {
      if (this.currentIndex < this.actGetMessages.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.currentMessage = this.actGetMessages[this.currentIndex];
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
      duration: 3,
      scale: 0.001,
      repeatDelay: 2,
      repeat: -1,
      ease: "elastic",
      backgroundColor: "blue",
      onRepeat: () => {
        this.changeMessage();
      },
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
    font-weight: bolder;
  }
} */
.act-get {
  font-size: 1em;
}
</style>
