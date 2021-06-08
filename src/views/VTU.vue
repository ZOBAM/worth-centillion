<template>
  <article class="tw-bg-white md:tw-p-6">
    <div class="tw-text-center">
      <h1
        class="tw-my-2 tw-pt-8 tw-text-3xl tw-font-bold tw-leading-tight tw-text-center tw-text-gray-800"
      >
        Hamsuper VTU
      </h1>
      <p class="tw-font-mono tw-text-green-700">
        Buy airtime, buy data and pay bills at ease
      </p>
    </div>
    <section
      v-if="processing_payment"
      class="tw-bg-green-700 tw-text-white tw-p-5 tw-my-5 tw-relative"
    >
      <div
        class="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-rounded-full tw-bg-green-50 tw-text-center tw-text-gray-900 tw-flex tw-justify-center tw-items-center tw-cursor-pointer hover:tw-bg-red-800 hover:tw-text-white"
      >
        <span class="tw-text-xl" @click="closeInfo()">X</span>
      </div>
      <span v-if="loading">processing payment . . .</span>
      <p v-if="paymentData">{{ paymentData.message }}</p>
    </section>
    <article class="tw-flex tw-flex-col md:tw-flex-row">
      <section
        class="tw-bg-gradient-to-b tw-from-white tw-to-blue-900 tw-text-blue-700 tw-p-4 tw-mt-10 md:tw-mt-0"
      >
        <ul class="nav tw-flex tw-justify-around md:tw-block">
          <li
            @click="setDealType('airtime')"
            class="tw-p-2 hover:tw-bg-blue-300 hover:tw-text-gray-800 tw-cursor-pointer tw-border-2 tw-rounded-md tw-border-blue-50 tw-bg-gray-100"
          >
            Buy Airtime
          </li>
          <li
            @click="setDealType('data')"
            class="tw-p-2 hover:tw-bg-blue-300 hover:tw-text-gray-800 tw-cursor-pointer tw-border-2 tw-rounded-md tw-border-blue-50 md:tw-mt-4 tw-bg-gray-100"
          >
            Buy Data
          </li>
          <li
            @click="setDealType('fundWallet')"
            class="tw-p-2 hover:tw-bg-blue-300 hover:tw-text-gray-800 tw-cursor-pointer tw-border-2 tw-rounded-md tw-border-blue-50 md:tw-mt-4 tw-bg-green-100"
          >
            Fund Wallet
          </li>
        </ul>
      </section>
      <section class="tw-p-4 tw-pt-6 md:tw-p-6 tw-flex-grow">
        <template v-if="networkDeal">
          <Form @submit="onSubmit" :validation-schema="schema" v-if="stepOne">
            <div class="col s12">
              <span
                class="tw-px-2 tw-py-1 tw-bg-black tw-text-gray-300 tw-rounded-lg tw-mb-8 tw-inline-block"
                v-html="currentAction"
              ></span>
              <div class="row">
                <div class="input-field col m6">
                  <Field
                    as="select"
                    name="network"
                    id=""
                    v-model="network"
                    class=""
                  >
                    <option value="">--choose network--</option>
                    <option
                      v-for="(network, index) of networks"
                      :value="network"
                      :key="index"
                      >{{
                        network == "etisalat"
                          ? "9mobile"
                          : network.toUpperCase()
                      }}</option
                    >
                  </Field>
                  <ErrorMessage
                    name="network"
                    class="tw-block tw-text-red-500 tw-text-sm"
                  />
                </div>
                <div class="input-field col m6">
                  <label
                    for="number"
                    class="tw-text-xs tw-font-semibold tw-px-1"
                    ><span class="tw-hidden md:tw-inline">Phone</span>
                    Number</label
                  >
                  <Field
                    type="text"
                    name="phone_number"
                    v-model="phone_number"
                    id=""
                    class=""
                  />
                  <ErrorMessage
                    name="phone_number"
                    class="block tw-text-red-500 tw-text-sm"
                  />
                </div>
              </div>
              <div class="row">
                <div class="input-field col m6">
                  <template v-if="buyData">
                    <Field
                      as="select"
                      name="data_plan"
                      id=""
                      v-model="planIndex"
                      @change="setDataPlan()"
                      class=""
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
                      class="tw-block tw-text-red-500 tw-text-sm"
                    />
                  </template>
                  <template v-else>
                    <label
                      for="amount"
                      class="tw-text-xs tw-font-semibold tw-px-1"
                      >Amount</label
                    >
                    <Field
                      type="number"
                      step="10"
                      min="100"
                      name="amount"
                      id=""
                      class=""
                    />
                    <ErrorMessage
                      name="amount"
                      class="tw-block tw-text-red-500 tw-text-sm"
                    />
                  </template>
                </div>
                <div class="input-field col m6" v-if="buyData">
                  <input
                    type="text"
                    name="amount"
                    disabled
                    id=""
                    v-model="amount"
                    placeholder=""
                    class=""
                  />
                  <span
                    v-if="balanceError"
                    class="tw-block tw-text-red-500 tw-text-sm"
                    >Amount cannot be more than {{ getWalletBalance }}</span
                  >
                </div>
              </div>
            </div>
            <div class="tw-flex tw-justify-center tw-items-center tw-mt-4">
              <button class="btn-primary tw-rounded-lg">Next</button>
            </div>
          </Form>
          <div v-else class="tw-bg-gray-100 tw-bg-gray-700 tw-p-2 md:tw-p-6">
            <h2 class="tw-text-center tw-font-bold tw-text-white tw-p-2">
              Transaction Summary
            </h2>
            <div class="tw-bg-white tw-p-4 tw-rounded-2xl">
              <ul class="tw-text-center">
                <li class="tw-uppercase tw-text-indigo-900">
                  {{ buyData ? "Data" : "Airtime" }} Purchase
                </li>
                <li v-if="buyData && dataPlan != null">{{ dataPlan.name }}</li>
                <li>
                  Amount:
                  <span class="tw-font-semibold tw-text-xl"
                    >NGN{{ amount }}</span
                  >
                </li>
                <li>
                  Recipient:
                  <span class="tw-text-xl">{{ phone_number }}</span>
                </li>
              </ul>
            </div>
            <div
              class="tw-flex tw-justify-center tw-items-center tw-mt-4 tw-mb-4"
            >
              <Button
                :loading="loading"
                @click="purchase()"
                class="tw-border-2 tw-border-gray-50 tw-rounded-lg"
              >
                Purchase
              </Button>
            </div>
            <button
              @click="stepOne = true"
              class="tw-border-2 tw-border-gray-100 tw-p-2 tw-text-purple-50"
            >
              Back
            </button>
          </div>
        </template>
        <template v-else-if="fundWallet">
          <wallet></wallet>
        </template>
      </section>
    </article>
    <div
      class="tw-bg-gray-700 tw-text-white tw-text-center tw-font-bold  tw-p-2"
    >
      Transaction History
    </div>
    <div
      class="tw-bg-gray-300 md:tw-p-4 tw-max-w-full tw-overflow-auto"
      v-if="transactionHistory"
    >
      <table class="striped tw-m-auto tw-bg-gray-50 tw-p-2 ">
        <thead>
          <tr class="tw-p-4">
            <th class="tw-text-center">S/N</th>
            <th class="tw-text-center">Type</th>
            <th class="tw-text-center">Amount</th>
            <th class="tw-text-center">Recipient</th>
            <th class="tw-text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in transactionHistory"
            :key="transaction.id"
          >
            <td class="tw-text-center">{{ index + 1 }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.recipient }}</td>
            <td><h-date :date="transaction.created_at" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="" v-else>
      <p v-if="loading">Loading your transaction history</p>
      <p v-else>You currently don't have any transaction yet.</p>
    </div>
  </article>
  <div
    class="tw-shadow-lg tw-bg-gray-800 tw-px-3 tw-py-1 tw-text-green-100 tw-text-center"
  >
    Your wallet balance is
    <span class="tw-font-bold tw-text-yellow-200 tw-text-lg"
      >N{{ getWalletBalance }}</span
    >
  </div>
</template>
<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import Button from "@/components/Button";
import HDate from "@/components/HDate";
import Wallet from "@/components/vtu/Wallet";
import * as yup from "yup";
import store from "../store";
import { mapState } from "vuex";

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
    Button,
    Wallet,
    HDate,
  },
  data() {
    return {
      buyData: false,
      networkDeal: true,
      fundWallet: false,
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
      balanceError: false,
      transactionHistory: null,
    };
  },
  methods: {
    setDealType(dealType) {
      if (dealType == "data" || dealType == "airtime") {
        this.networkDeal = true;
        if (dealType == "data") {
          this.buyData = true;
        } else {
          this.buyData = false;
        }
      } else if (dealType == "fundWallet") {
        this.fundWallet = true;
        this.networkDeal = false;
      }
      this.currentAction = "";
      setTimeout(() => {
        let text = this.buyData
          ? "Buying <span class='tw-p-1 tw-bg-green-600 tw-rounded-lg tw-font-bold'>data</span>"
          : "Buying <span class='tw-p-1 tw-bg-green-600 tw-rounded-lg tw-font-bold'>airtime</span>";
        this.currentAction = text;
      }, 500);
    },
    setDataPlan() {
      this.dataPlan = this.dataPlans[this.network][this.planIndex];
      this.amount = this.dataPlan.sPrice;
      this.balanceError = false;
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
      if (this.amount > this.user.balance) {
        this.balanceError = true;
        return false;
      }
      this.postData = values;
      this.stepOne = false;
      //console.log(values);
    },
    purchase() {
      this.loading = true;
      this.processing_payment = true;
      this.axios
        .post(process.env.VUE_APP_APIURL + "/vtu", this.postData, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then((response) => {
          console.log(response.data);
          this.paymentData = response.data;
          if (response.data.status == 1) {
            store.dispatch("setProps", {
              name: "balance",
              value: response.data.balance,
              type: "user",
            });
            this.transactionHistory = response.data.transaction_history;
          } else {
            alert(response.data.message);
            this.processing_payment = false;
          }

          //window.location = process.env.VUE_APP_API_BASEURL + "/pay/" + response.data.ref_id;
        })
        .catch(() => {
          alert("Something wrong from the server.");
          //console.log(error);
        })
        .then(() => {
          this.loading = false;
          this.stepOne = true;
        });
    },
    closeInfo() {
      if (!this.loading) {
        this.processing_payment = false;
      } else alert("Still processing.");
    },
  },
  computed: {
    ...mapState(["accessToken", "user"]),
    schema() {
      return yup.object({
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
          .max(this.user.balance),
      });
    },
    getWalletBalance() {
      return (this.user.balance * 1).toFixed(2);
    },
  },
  mounted() {
    setTimeout(() => {
      this.currentAction = "Buying airtime";
    }, 2000);
    let hasFundedWallet = localStorage.getItem("fundedWallet");
    if (this.$route.params.ref_id || hasFundedWallet == "true") {
      console.log("was funding wallet");
      this.processing_payment = true;
      this.loading = true;
      let ref_id = this.$route.params.ref_id
        ? this.$route.params.ref_id
        : this.user.id;
      //alert(ref_id);
      this.axios
        .get(process.env.VUE_APP_APIURL + "/vtu/verify_payment/" + ref_id, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then((response) => {
          //console.log(response.data);
          if (response.data.status == 1) {
            this.paymentData = response.data;
            //store.dispatch("setProps", { name: "category", value: null });
            store.dispatch("setProps", {
              name: "balance",
              value: response.data.balance,
              type: "user",
            });
          } else this.processing_payment = false;
          if (response.data.status == 1 || response.data.status == 2) {
            localStorage.setItem("fundedWallet", false);
          }
        })
        .catch(() => {
          alert("An error occurred while verifying payment from server");
          //console.log(error);
        })
        .then(() => {
          this.loading = false;
        });
      //alert("Found this ref_id: " + this.$route.params.ref_id);
    } else {
      // check and update user balance at each page reload
      this.axios
        .get(process.env.VUE_APP_APIURL + "/vtu/balance/" + this.user.id)
        .then((response) => {
          store.dispatch("setProps", {
            name: "balance",
            value: response.data.balance,
            type: "user",
          });
        });
    }
    //fetch list of data plans from server
    this.loading = true;
    this.axios
      .get(process.env.VUE_APP_APIURL + "/vtu/get_data_plans/" + this.user.id, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .then((response) => {
        this.dataPlans = response.data.data_plans;
        this.transactionHistory = response.data.transaction_history;
        //console.log(this.transactionHistory);
      })
      .catch(() => {
        alert("Something wrong from the server.");
        //console.log(error);
      })
      .then(() => {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      });
  },
};
</script>
<style lang="scss" scoped>
select,
input:not([type]),
input[type="text"]:not(.browser-default),
input[type="number"]:not(.browser-default) {
  display: block;
  padding: 0px 0.5rem;
}
label {
  color: #302f2f;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
@media (min-width: 640px) {
}
@media (min-width: 768px) {
  select,
  input:not([type]),
  input[type="text"]:not(.browser-default),
  input[type="number"]:not(.browser-default) {
    display: block;
    padding: 0rem 1rem;
    width: 90%;
  }
}
.nav li {
  box-shadow: 2px -2px black;
}
table {
  tr {
    border: 2px solid rgb(218, 215, 215);
    border-top-left-radius: 2px;
    td,
    th {
      padding: 5px;
    }
    td {
      border: 2px solid rgb(218, 215, 215);
    }
  }
}
</style>
