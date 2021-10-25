<template>
  <article>
    <div class="flex justify-center p-12">
      <div class="w-auto">
        <span
          @click="vtuTransactions = true"
          :class="{
            [btnStyle]: true,
            'text-white bg-blue-700 -mr-4 z-50': vtuTransactions,
          }"
        >
          VTU
        </span>
        <span
          @click="vtuTransactions = false"
          :class="{
            [btnStyle]: true,
            'text-white bg-blue-700 -ml-4 z-10': !vtuTransactions,
          }"
        >
          Others
        </span>
      </div>
    </div>
    <section
      v-if="user.transactions.length || user.vtuTransactions.length"
      class="text-gray-700"
    >
      <div v-if="vtuTransactions">
        <div
          v-if="user.vtuTransactions.length"
          class="w-full md:w-3/4 text-center m-auto"
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
              <template
                v-for="(transaction, index) in items"
                :key="transaction.id"
              >
                <tr v-if="index >= startIndex && index < endIndex">
                  <td>{{ ++index }}</td>
                  <td>{{ transaction.type }}</td>
                  <td>{{ transaction.amount }}</td>
                  <td>{{ transaction.recipient }}</td>
                  <td><h-date :date="transaction.created_at" /></td>
                </tr>
              </template>
            </tbody>
          </table>
          <section>
            <pagination
              :rows="items.length"
              :perPage="perPage"
              @my-event="paginate"
              :currentPage="currentPage"
            ></pagination>
          </section>
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
              <template
                v-for="(transaction, index) in items"
                :key="transaction.id"
              >
                <tr v-if="index >= startIndex && index < endIndex">
                  <td>{{ ++index }}</td>
                  <td>{{ transaction.transaction_type }}</td>
                  <td>{{ transaction.amount }}</td>
                  <td>{{ transaction.transaction_ref }}</td>
                  <td><h-date :date="transaction.created_at" /></td>
                </tr>
              </template>
            </tbody>
          </table>
          <section>
            <pagination
              :rows="items.length"
              :perPage="perPage"
              @my-event="paginate"
              :currentPage="currentPage"
            ></pagination>
          </section>
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
import paginate from "@/utilities/mixins/paginate.js";

export default {
  name: "Transactions",
  components: {
    HDate,
  },
  mixins: [paginate],
  data() {
    return {
      vtuTransactions: false,
      btnStyle:
        "cursor-pointer hover:bg-indigo-900 inline-block rounded-xl min-w-[8rem] text-center text-2xl py-2 px-4 border-2 border-blue-700",
    };
  },
  computed: {
    ...mapState(["user"]),
    items() {
      return this.vtuTransactions
        ? this.user.vtuTransactions
        : this.user.transactions;
    },
  },
};
</script>
