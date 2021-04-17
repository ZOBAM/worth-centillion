<template>
  <article class="bg-white p-6">
    <div class="text-center">
      <h1
        class="my-2 pt-8 text-3xl font-bold leading-tight text-center text-gray-800"
      >
        Hamsuper VTU
      </h1>
      <p class="font-mono text-green-700">
        Buy airtime, buy data and pay bills at ease
      </p>
    </div>
    <section
      v-if="processing_payment"
      class="bg-green-700 text-white p-5 my-5 relative"
    >
      <div
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-green-50 text-center text-gray-900 flex justify-center items-center cursor-pointer hover:bg-red-800 hover:text-white"
      >
        <span class="text-xl" @click="closeInfo()">X</span>
      </div>
      <span v-if="loading">processing payment . . .</span>
      <p v-if="paymentData">{{ paymentData.message }}</p>
    </section>
    <article class="flex flex-col md:flex-row">
      <section
        class="bg-gradient-to-b from-white to-blue-900 text-blue-700 p-4 mt-10 md:mt-0"
      >
        <ul class="nav flex justify-around md:block">
          <li
            @click="setDealType('airtime')"
            class="p-2 hover:bg-blue-300 hover:text-gray-800 cursor-pointer border-2 rounded-md border-blue-50 bg-gray-100"
          >
            Buy Airtime
          </li>
          <li
            @click="setDealType('data')"
            class="p-2 hover:bg-blue-300 hover:text-gray-800 cursor-pointer border-2 rounded-md border-blue-50 md:mt-4 bg-gray-100"
          >
            Buy Data
          </li>
        </ul>
      </section>
      <section class="p-6 flex-grow">
        <Form @submit="onSubmit" :validation-schema="schema" v-if="stepOne">
          <div>
            <span
              class="px-2 py-1 bg-black text-gray-300 rounded-lg mb-8 inline-block"
              v-html="currentAction"
            ></span>
            <div class="flex flex-col md:flex-row">
              <div class="w-full md:w-1/2">
                <label for="network" class="text-xs font-semibold px-1"
                  >Network</label
                >
                <Field
                  as="select"
                  name="network"
                  id=""
                  v-model="network"
                  class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                >
                  <option value="">--choose network--</option>
                  <option
                    v-for="(network, index) of networks"
                    :value="network"
                    :key="index"
                    >{{
                      network == "etisalat" ? "9mobile" : network.toUpperCase()
                    }}</option
                  >
                </Field>
                <ErrorMessage
                  name="network"
                  class="block text-red-500 text-sm"
                />
              </div>
              <div class="w-full md:w-1/2 mt-6 md:mt-0">
                <label for="number" class="text-xs font-semibold px-1"
                  ><span class="hidden md:inline">Phone</span> Number</label
                >
                <Field
                  type="text"
                  name="phone_number"
                  v-model="phone_number"
                  id=""
                  class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                />
                <ErrorMessage
                  name="phone_number"
                  class="block text-red-500 text-sm"
                />
              </div>
            </div>
            <div class="flex flex-col md:flex-row">
              <div class="w-full md:w-1/2 mt-6">
                <label for="amount" class="text-xs font-semibold px-1">{{
                  buyData ? "Data Plan" : "Amount"
                }}</label>
                <template v-if="buyData">
                  <Field
                    as="select"
                    name="data_plan"
                    id=""
                    v-model="planIndex"
                    @change="setDataPlan()"
                    class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                  >
                    <option value="">--Choose Data Plan--</option>
                    <template v-if="network">
                      <option
                        v-for="(dataPlan, index) of dataPlans[network]"
                        :value="index"
                        :key="dataPlan.id"
                        >{{ dataPlan.name }}</option
                      >
                    </template>
                  </Field>
                  <ErrorMessage
                    name="data_plan"
                    class="block text-red-500 text-sm"
                  />
                </template>
                <template v-else>
                  <Field
                    type="number"
                    step="10"
                    min="100"
                    name="amount"
                    id=""
                    class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                  />
                  <ErrorMessage
                    name="amount"
                    class="block text-red-500 text-sm"
                  />
                </template>
              </div>
              <div class="w-full md:w-1/2 mt-6" v-if="buyData">
                <label for="amount" class="text-xs font-semibold px-1"
                  >Data Price</label
                >
                <input
                  type="text"
                  name="amount"
                  disabled
                  id=""
                  v-model="amount"
                  class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center mt-4">
            <button class="btn-primary">Next</button>
          </div>
        </Form>
        <div v-else class="bg-gray-100 bg-gray-700 p-6">
          <h2 class="text-center font-bold text-white p-2">
            Transaction Summary
          </h2>
          <div class="bg-white p-4 rounded-2xl">
            <ul class="text-center">
              <li class="uppercase text-indigo-900">
                {{ buyData ? "Data" : "Airtime" }} Purchase
              </li>
              <li v-if="buyData && dataPlan != null">{{ dataPlan.name }}</li>
              <li>
                Amount:
                <span class="font-semibold text-xl">NGN{{ amount }}</span>
              </li>
              <li>
                Recipient:
                <span class="text-xl">{{ phone_number }}</span>
              </li>
            </ul>
          </div>
          <div class="flex justify-center items-center mt-4 mb-4">
            <Button
              :loading="loading"
              @click="purchase()"
              class="border-2 border-gray-50"
            >
              Purchase
            </Button>
          </div>
          <button
            @click="stepOne = true"
            class="border-2 border-gray-100 p-2 text-purple-50"
          >
            Back
          </button>
        </div>
      </section>
    </article>
  </article>
</template>
<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import Button from "@/components/Button";
import * as yup from "yup";

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
    Button,
  },
  data() {
    const schema = yup.object({
      network: yup.string().required(),
      phone_number: yup
        .number()
        .required()
        .min(7000000000)
        .max(9999999999),
      data_plan: yup
        .number()
        .required()
        .min(0)
        .max(10),
      amount: yup
        .number()
        .required()
        .min(50)
        .max(10000),
    });
    return {
      schema,
      buyData: false,
      networks: ["mtn", "glo", "airtel", "etisalat"],
      network: undefined,
      amount: 2000,
      phone_number: undefined,
      dataPlan: null,
      planIndex: "",
      postData: null,
      stepOne: true,
      dataPlans: null,
      loading: false,
      processing_payment: false,
      paymentData: null,
      currentAction: null,
    };
  },
  methods: {
    setDealType(dealType) {
      if (dealType == "data") {
        this.buyData = true;
      } else {
        this.buyData = false;
      }
      this.currentAction = "";
      setTimeout(() => {
        let text = this.buyData
          ? "Buying <span class='p-1 bg-green-600 rounded-lg font-bold'>data</span>"
          : "Buying <span class='p-1 bg-green-600 rounded-lg font-bold'>airtime</span>";
        this.currentAction = text;
      }, 1000);
    },
    setDataPlan() {
      this.dataPlan = this.dataPlans[this.network][this.planIndex];
      this.amount = this.dataPlan.sPrice;
      //alert(this.amount);
    },
    onSubmit(values) {
      if (this.buyData) {
        values.data_id = this.dataPlans[this.network][this.planIndex].id;
        values.type = "data";
        values.amount = this.amount;
      } else {
        values.type = "airtime";
        this.amount = values.amount;
      }
      this.postData = values;
      this.stepOne = false;
      //console.log(values);
    },
    purchase() {
      this.loading = true;
      this.axios
        .post(process.env.VUE_APP_APIURL + "/vtu", this.postData)
        .then((response) => {
          this.loading = false;
          //console.log(response.data);
          window.location =
            process.env.VUE_APP_API_BASEURL + "/pay/" + response.data.ref_id;
        })
        .catch(() => {
          alert("Something wrong from the server.");
          //console.log(error);
          this.loading = false;
        });
    },
    closeInfo() {
      if (!this.loading) {
        this.processing_payment = false;
      } else alert("Still processing.");
    },
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.currentAction = "Buying airtime";
    }, 2000);
    if (this.$route.params.ref_id) {
      this.processing_payment = true;
      this.loading = true;
      let ref_id = this.$route.params.ref_id;
      //alert(ref_id);
      this.axios
        .get(process.env.VUE_APP_APIURL + "/vtu/verify_payment/" + ref_id)
        .then((response) => {
          //console.log(response.data);
          if (response.data.status == 1) {
            this.paymentData = response.data;
          } else this.processing_payment = false;
          this.loading = false;
        })
        .catch(() => {
          alert("An error occurred while verifying payment from server");
          //console.log(error);
          this.loading = false;
        });
      //alert("Found this ref_id: " + this.$route.params.ref_id);
    }
    this.loading = true;
    this.axios
      .get(process.env.VUE_APP_APIURL + "/vtu/get_data_plans")
      .then((response) => {
        //console.log(response.data);
        this.dataPlans = response.data;
        this.loading = false;
      })
      .catch(() => {
        alert("Something wrong from the server.");
        //console.log(error);
        this.loading = false;
      });
  },
};
</script>
<style lang="scss" scoped>
.nav li {
  box-shadow: 2px -2px black;
}
</style>
