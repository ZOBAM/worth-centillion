<template>
  <article class="p-6 bg-white text-xl font-noto">
    <h1 class="bg-gray-100 text-center text-3xl font-semibold font-roboto">
      Hamsuper <span class="text-blue-700">F</span>AQs
    </h1>
    <p class="p-4">
      Providing answers to the many or few questions you may have concerning our
      services is our delight and here we make an attempt to address them in the
      clearest manner possible.
    </p>
    <ul class="list-disc md:w-4/5 m-auto">
      <li v-for="(question, index) in faqs" :key="question.question">
        <p
          @click="current_index = index"
          class="bg-gray-200 font-roboto p-2 cursor-pointer mt-6 rounded-xl"
          :class="{ 'font-bold bg-blue-200': current_index == index }"
        >
          {{ question.question }}
          <span
            class="mdi mdi-menu-down-outline float-right"
            :class="{
              'mdi-rotate-180': current_index == index,
              'mdi-rotate-0': !current_index == index,
            }"
          ></span>
        </p>
        <p v-if="current_index == index" class="answer-p p-3">
          {{ question.answer }}
        </p>
      </li>
    </ul>
  </article>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const current_index = ref(0);
    const getIcon = (index) => {
      return index == current_index.value ? "X" : "O";
    };
    const faqs = ref([
      {
        question: "How much does registration cost?",
        answer:
          "Registration is completely free whether you are registering to advertise or to use the VTU services.",
      },
      {
        question:
          "Is it compulsory to provide an email address or phone during registration?",
        answer:
          "It is required that you provide phone number but email is optional.",
      },
      {
        question: "How many ads can I post on the website?",
        answer: "You can post as many legitimate ads as possible",
      },
      {
        question: "Must my phone number be verified before I post ads?",
        answer:
          "Yes, you have to verify your phone before you post ads and use some other aspects of the website.",
      },
      {
        question: "What happens to my ad after promotion expires?",
        answer:
          "If the duration of your ad promotion elapses without being re-promoted, the ad will be demoted to a normal free ad (bronze category).",
      },
      {
        question: "How many times can I promote an ad?",
        answer: "As many many times as you want.",
      },
      {
        question: "How do I verify my phone number?",
        answer:
          "A verification SMS is sent to your phone via the provided telephone number after registration and you are automatically redirected to the verification page so you can enter the code (5 digit numbers) contained in the received SMS and verify your phone number.",
      },
      {
        question: "How many times can I request for verification SMS?",
        answer: "Two (2) times.",
      },
      {
        question: "What do I do if I didn't get the verification code via SMS?",
        answer:
          "If you didn't get the SMS containing your verification code, you can contact our support team and you will be helped with the process.",
      },
      {
        question: "Who is qualified for the referral bonus?",
        answer:
          "Every registered user with verified phone number is qualified.",
      },
      {
        question: "How many point does each bonus-action give?",
        answer:
          "Inviting friends gives 10points per invite and posting New Ads gives 5points",
      },
      {
        question:
          "At what point do I get my bonus points for inviting a friend?",
        answer:
          "Once the person you referred is duly and fully registered (including phone number verification), you will automatically be rewarded with applicable bonus points.",
      },
      {
        question: "How do I know my bonus points balance?",
        answer:
          "In your User Area, click on the Wallet tab and you will see your point balance below your account balance.",
      },
      {
        question: "How can I redeem my accumulated points?",
        answer:
          "You can redeem your points by using it to purchase data plans from our VTU page. You will have to gather up to 200points before you can redeem your points.",
      },
      {
        question: "What is the worth of a point?",
        answer: "A point is worth an equivalent of 5MB.",
      },
      {
        question: "How do I fund my wallet?",
        answer:
          "The easiest way to fund your wallet is with your credit/ATM card but you can also fund your wallet through bank transers. Just click the 'Fund Wallet' button and proceed accordingly.",
      },
      {
        question: "When will the money I added appear in my wallet?",
        answer:
          "If you paid with credit/ATM card it should show up immediately.",
      },
      {
        question:
          "What do I do if the money I paid into my wallet doesn't show up in my wallet?",
        answer:
          "Contact our support team with the amount paid, date (and time if possible) and method of payment and your wallet will be credited as soon as possible.",
      },
    ]);
    return {
      faqs,
      getIcon,
      current_index,
    };
  },
};
</script>
<style lang="scss" scoped>
.answer-p {
  animation-name: answer;
  animation-duration: 0.5s;
  overflow: hidden;
}
@keyframes answer {
  0% {
    width: 30%;
    height: 30px;
    background-color: #aaaaff;
    font-size: 1px;
  }
  100% {
    width: 100%;
    height: auto;
    background-color: #fff;
    font-size: inherit;
  }
}
</style>
