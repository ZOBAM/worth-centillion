<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    :initial-values="formValues"
  >
    <div class="">
      <label for="amount" class="text-xs font-semibold px-1">Amount (N)</label>
      <Field
        name="amount"
        type="number"
        step="100"
        v-model="amount"
        class="w-3/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
      />
      <ErrorMessage name="amount" class="block text-red-500 text-sm" />
    </div>
    <section class="w-full md:w-1/2 m-auto p-4 shadow-xl mt-4">
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
<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import { mapState } from "vuex";

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
      amount: 1000,
    };
    return {
      schema,
      formValues,
      amount: 1000,
      loading: false,
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
    onSubmit() {
      this.loading = true;
      let amountID = this.total + "_" + this.user.id;
      //alert(amountID);
      window.location = process.env.VUE_APP_API_BASEURL + "/pay/" + amountID;
    },
  },
};
</script>
