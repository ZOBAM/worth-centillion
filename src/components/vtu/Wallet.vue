<template>
  <article>
    <div
      v-show="!fundWallet"
      id="fund-button-container"
      class="flex justify-around"
    >
      <div class="text-white max-w-[358px] border-2 border-blue-500">
        <span class="bg-blue-500 py-1 px-2">
          Ballance:
        </span>
        <p class="text-center text-5xl text-gray-800 p-4">
          {{ (user.balance * 1).toFixed(2) }}
        </p>
        <p class="bg-blue-50 text-center text-blue-500 my-4">
          Naira
        </p>
        <div class="bg-blue-600 text-center">Points: {{ user.points }}</div>
      </div>
      <div class="bg-blue-500 p-4 text-center">
        <p class="text-white mb-6">Empower yourself to do more.</p>
        <button
          @click="displayForm(true)"
          class="btn-primary  bg-blue-50 text-black"
        >
          Fund Wallet
        </button>
      </div>
    </div>

    <template v-if="fundWallet == true" class="border-2 border-red-600">
      <div class="bg-gray-800 relative w-full p-2 my-8">
        <span
          @click="displayForm(false)"
          class="relative -right-3/4 p-4 bg-red-500 text-white cursor-pointer hover:bg-red-900"
          >Close X</span
        >
      </div>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        :initial-values="formValues"
        class="w-full md:w-1/2 m-auto"
      >
        <div class="">
          <label for="amount" class="text-xs font-semibold px-1"
            >Amount (N)</label
          >
          <Field
            name="amount"
            type="number"
            step="100"
            v-model="amount"
            class="w-3/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
          />
          <ErrorMessage name="amount" class="block text-red-500 text-sm" />
        </div>
        <section class="w-full m-auto p-4 shadow-xl mt-4">
          <table class="w-full border-2">
            <tr>
              <td class="text-right pr-4">Amount:</td>
              <td>{{ getAmount }}</td>
            </tr>
            <tr>
              <td class="text-right pr-4">Processing Fee:</td>
              <td>
                {{ processingFee }} (<span class="font-mono">to Paystack</span>)
              </td>
            </tr>
            <tr class="font-bold text-xl">
              <td class="text-right pr-4">Total:</td>
              <td>N{{ total }}</td>
            </tr>
          </table>
        </section>
        <div class="flex justify-center items-center mt-4">
          <Button :loading="loading" class="rounded-lg">Fund Wallet</Button>
        </div>
      </Form>
    </template>
  </article>
</template>
<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import { mapState } from "vuex";
import { gsap } from "gsap";

export default {
  name: "Wallet",
  components: {
    Field,
    Form,
    ErrorMessage,
    Button,
  },
  data() {
    const schema = yup.object({
      amount: yup
        .number()
        .required()
        .min(500)
        .max(100000),
    });
    const formValues = {
      amount: 0,
    };
    return {
      schema,
      formValues,
      amount: 0,
      loading: false,
      fundWallet: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    getAmount() {
      return this.amount;
    },
    processingFee() {
      return this.amount < 2500
        ? (1.5 / 100) * this.amount
        : (1.5 / 100) * this.amount + 100;
    },
    total() {
      return +this.amount + +this.processingFee;
    },
  },
  methods: {
    formatAmount() {
      alert("Formatting amount");
    },
    displayForm(value) {
      if (value) {
        gsap.to("#fund-button-container", {
          x: 90,
          scale: 0,
          duration: 0.5,
          onComplete: () => {
            this.fundWallet = value;
          },
        });
      } else {
        this.fundWallet = value;
        gsap.to("#fund-button-container", {
          x: 0,
          scale: 1,
          duration: 1,
        });
      }
    },
    onSubmit() {
      this.loading = true;
      let amountID = this.total + "_" + this.user.id;
      //alert(amountID);
      localStorage.setItem("fundedWallet", true);
      window.location = process.env.VUE_APP_API_BASEURL + "/pay/" + amountID;
    },
  },
};
</script>
