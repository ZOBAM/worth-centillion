<template>
  <article>
    <div class="tw-flex tw-justify-center tw-p-12">
      <div class="tw-w-auto">
        <span
          @click="vtuTransactions = true"
          :class="{
            [btnStyle]: true,
            'tw-text-white tw-bg-blue-700 tw--mr-4 tw-z-50': vtuTransactions,
          }"
        >
          VTU
        </span>
        <span
          @click="vtuTransactions = false"
          :class="{
            [btnStyle]: true,
            'tw-text-white tw-bg-blue-700 tw--ml-4 tw-z-10': !vtuTransactions,
          }"
        >
          Others
        </span>
      </div>
    </div>
    <section
      v-if="user.transactions.length || user.vtu_transactions.length"
      class="tw-text-gray-700"
    >
      <div v-if="vtuTransactions">
        <div
          v-if="user.vtu_transactions.length"
          class="tw-w-full md:tw-w-3/4 tw-text-center tw-m-auto"
        >
          <table class="striped ">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Receipient</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(transaction, index) in user.vtu_transactions"
                :key="transaction.id"
              >
                <td>{{ ++index }}</td>
                <td>{{ transaction.type }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.recipient }}</td>
                <td><h-date :date="transaction.created_at" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          No vtu transactions
        </div>
      </div>
      <div v-if="vtuTransactions == false">
        <div v-if="user.transactions.length">
          <table class="striped ">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Ref ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(transaction, index) in user.transactions"
                :key="transaction.id"
              >
                <td>{{ ++index }}</td>
                <td>{{ transaction.transaction_type }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.transaction_ref }}</td>
                <td><h-date :date="transaction.created_at" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          No other transactions
        </div>
      </div>
    </section>
    <section v-else>
      You don't have any transaction to display at the moment.
    </section>
  </article>
</template>
<script>
import { mapState } from "vuex";
import HDate from "@/components/HDate";

export default {
  name: "Transactions",
  components: {
    HDate,
  },
  data() {
    return {
      vtuTransactions: false,
      btnStyle:
        "tw-cursor-pointer hover:tw-bg-indigo-900 tw-inline-block tw-rounded-xl tw-min-w-[8rem] tw-text-center tw-text-2xl tw-py-2 tw-px-4 tw-border-2 tw-border-blue-700",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
