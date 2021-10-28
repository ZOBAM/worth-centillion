<template>
  <article class="bg-white md:p-6">
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
          <li
            @click="setDealType('fundWallet')"
            class="p-2 hover:bg-blue-300 hover:text-gray-800 cursor-pointer border-2 rounded-md border-blue-50 md:mt-4 bg-green-100"
          >
            Fund Wallet
          </li>
        </ul>
      </section>
      <section class="p-4 pt-6 md:p-6 flex-grow">
        <template v-if="networkDeal">
          <Form @submit="onSubmit" :validation-schema="schema" v-if="stepOne">
            <div class="col s12">
              <span
                class="px-2 py-1 bg-black text-gray-300 rounded-lg mb-8 inline-block"
                v-html="currentAction"
              ></span>
              <div class="sm:grid grid-cols-2">
                <div class="">
                  <label for="number" class="text-xs font-semibold px-1"
                    >Network</label
                  >
                  <Field
                    as="select"
                    name="network"
                    id=""
                    v-model="network"
                    class="rounded-lg outline-none p-8 h-12 w-full border-2 border-gray-300"
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
                    class="block text-red-500 text-sm"
                  />
                </div>
                <div class="mt-6 sm:mt-0">
                  <label for="number" class="text-xs font-semibold px-1"
                    ><span class="hidden md:inline">Phone</span> Number</label
                  >
                  <Field
                    type="text"
                    name="phone_number"
                    v-model="phone_number"
                    id=""
                    class="rounded-lg outline-none p-8 h-12 w-full border-2 border-gray-300"
                  />
                  <ErrorMessage
                    name="phone_number"
                    class="block text-red-500 text-sm"
                  />
                </div>
              </div>
              <div class="sm:grid grid-cols-2 mt-6">
                <div class="">
                  <template v-if="buyData">
                    <Field
                      as="select"
                      name="data_plan"
                      id=""
                      v-model="planIndex"
                      @change="setDataPlan()"
                      class="rounded-lg outline-none p-8 h-12 w-full border-2 border-gray-300"
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
                    <label for="amount" class="text-xs font-semibold px-1"
                      >Amount</label
                    >
                    <Field
                      type="number"
                      step="10"
                      min="100"
                      name="amount"
                      id=""
                      class="rounded-lg outline-none p-8 h-12 w-full border-2 border-gray-300"
                    />
                    <ErrorMessage
                      name="amount"
                      class="block text-red-500 text-sm"
                    />
                  </template>
                </div>
                <div class="mt-6 sm:mt-0" v-if="buyData">
                  <input
                    type="text"
                    name="amount"
                    disabled
                    id=""
                    v-model="amount"
                    placeholder=""
                    class="rounded-lg outline-none p-8 h-12 w-full border-2 border-gray-300"
                  />
                  <span v-if="balanceError" class="block text-red-500 text-sm"
                    >Amount cannot be more than {{ getWalletBalance }}</span
                  >
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center mt-4">
              <button class="btn-primary rounded-lg">Next</button>
            </div>
          </Form>
          <div v-else class="bg-gray-100 bg-gray-700 p-2 md:p-6">
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
                class="border-2 border-gray-50 rounded-lg"
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
        </template>
        <template v-else-if="fundWallet">
          <wallet></wallet>
        </template>
      </section>
    </article>
    <div class="bg-gray-700 text-white text-center font-bold  p-2">
      Transaction History
    </div>
    <div
      class="bg-gray-300 md:p-4 max-w-full overflow-auto"
      v-if="transactionHistory"
    >
      <table class="striped m-auto bg-gray-50 p-2 ">
        <thead>
          <tr class="p-4">
            <th class="text-center">S/N</th>
            <th class="text-center">Type</th>
            <th class="text-center">Amount</th>
            <th class="text-center">Recipient</th>
            <th class="text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in transactionHistory"
            :key="transaction.id"
          >
            <td class="text-center">{{ index + 1 }}</td>
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
  <div class="shadow-lg bg-gray-800 px-3 py-1 text-green-100 text-center">
    Your wallet balance is
    <span class="font-bold text-yellow-200 text-lg"
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
          ? "Buying <span class='p-1 bg-green-600 rounded-lg font-bold'>data</span>"
          : "Buying <span class='p-1 bg-green-600 rounded-lg font-bold'>airtime</span>";
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
            store.dispatch("setProps", response.data);
            this.transactionHistory = response.data.transaction_history;
          } else {
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
    //check if wallet was funded and verify the payment
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
            store.dispatch("setProps", response.data);
          } else this.processing_payment = false;
          if (response.data.status == 1 || response.data.status == 2) {
            localStorage.setItem("fundedWallet", false);
          }
        })
        .catch(() => {
          alert(
            "An error occurred while verifying payment from server. Please reload this page to retry payment verification."
          );
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
          store.dispatch("setProps", response.data);
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
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 401) {
            this.logout();
            alert("Session expired. Please login again.");
            this.$router.push("/user/login");
          } else {
            alert("Something wrong from the server.");
          }
        }
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
