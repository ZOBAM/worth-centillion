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
          <DataTable
            :value="items"
            :paginator="true"
            :rows="5"
            responsiveLayout="scroll"
          >
            <Column field="vin" header="S/N">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>
            <Column field="type" header="Type"></Column>
            <Column field="amount" header="Amount"></Column>
            <Column field="recipient" header="Receipient"></Column>
            <Column field="created_at" header="Date">
              <template #body="slotProps">
                <h-date :date="slotProps.data.created_at" />
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-else>
          No vtu transactions
        </div>
      </div>
      <div v-if="vtuTransactions == false">
        <div
          v-if="user.transactions.length"
          class="w-full md:w-3/4 text-center m-auto"
        >
          <DataTable
            :value="items"
            :paginator="true"
            :rows="5"
            responsiveLayout="scroll"
          >
            <Column field="vin" header="S/N">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>
            <Column field="transaction_type" header="Type"></Column>
            <Column field="amount" header="Amount"></Column>
            <Column field="transaction_ref" header="Ref ID"></Column>
            <Column field="created_at" header="Date">
              <template #body="slotProps">
                <h-date :date="slotProps.data.created_at" />
              </template>
            </Column>
          </DataTable>
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
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "Transactions",
  components: {
    HDate,
    DataTable,
    Column,
  },
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
<style lang="scss" scoped>
td {
  padding: 2px;
}
tr:nth-child(even) {
  background-color: #eef;
}
</style>
