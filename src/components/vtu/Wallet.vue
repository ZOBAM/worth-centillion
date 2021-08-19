<template>
  <article>
    <div
      v-show="!fundWallet"
      id="fund-button-container"
      class="tw-flex tw-justify-around"
    >
      <div
        class="tw-text-white tw-max-w-[358px] tw-border-2 tw-border-blue-500"
      >
        <span class="tw-bg-blue-500 tw-py-1 tw-px-2">
          Ballance:
        </span>
        <p class="tw-text-center tw-text-5xl tw-text-gray-800 tw-p-4">
          {{ (user.balance * 1).toFixed(2) }}
        </p>
        <p class="tw-bg-blue-50 tw-text-center tw-text-blue-500 tw-my-4">
          Naira
        </p>
        <div class="tw-bg-blue-600 tw-text-center">
          Points: {{ user.points }}
        </div>
      </div>
      <div class="tw-bg-blue-500 tw-p-4 tw-text-center">
        <p class="tw-text-white tw-mb-6">Empower yourself to do more.</p>
        <button
          @click="displayForm(true)"
          class="btn-primary  tw-bg-blue-50 tw-text-black"
        >
          Fund Wallet
        </button>
      </div>
    </div>

    <template v-if="fundWallet == true" class="tw-border-2 tw-border-red-600">
      <div class="tw-bg-gray-800 tw-relative tw-w-full tw-p-2 tw-my-8">
        <span
          @click="displayForm(false)"
          class="tw-relative tw--right-3/4 tw-p-4 tw-bg-red-500 tw-text-white tw-cursor-pointer hover:tw-bg-red-900"
          >Close X</span
        >
      </div>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        :initial-values="formValues"
        class="tw-w-full md:tw-w-1/2 tw-m-auto"
      >
        <div class="">
          <label for="amount" class="tw-text-xs tw-font-semibold tw-px-1"
            >Amount (N)</label
          >
          <Field
            name="amount"
            type="number"
            step="100"
            v-model="amount"
            class="tw-w-3/5 md:tw-w-2/3 outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:outline-none focus:tw-border-transparent rounded"
          />
          <ErrorMessage
            name="amount"
            class="tw-block tw-text-red-500 tw-text-sm"
          />
        </div>
        <section class="tw-w-full tw-m-auto tw-p-4 tw-shadow-xl mt-4">
          <table class="tw-w-full tw-border-2">
            <tr>
              <td class="tw-text-right tw-pr-4">Amount:</td>
              <td>{{ getAmount }}</td>
            </tr>
            <tr>
              <td class="tw-text-right tw-pr-4">Processing Fee:</td>
              <td>
                {{ processingFee }} (<span class="tw-font-mono"
                  >to Paystack</span
                >)
              </td>
            </tr>
            <tr class="tw-font-bold tw-text-xl">
              <td class="tw-text-right tw-pr-4">Total:</td>
              <td>N{{ total }}</td>
            </tr>
          </table>
        </section>
        <div class="tw-flex tw-justify-center tw-items-center tw-mt-4">
          <Button :loading="loading" class="tw-rounded-lg">Fund Wallet</Button>
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
