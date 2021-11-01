<template class="">
  <Paginator
    :rows="perPage"
    :totalRecords="totalItemsCount"
    @page="onPage($event)"
  ></Paginator>
</template>
<script>
export default {
  name: "Pagination",
  props: ["totalItemsCount", "perPage", "currentPage"],
  data() {
    return {
      numOfPage: 0,
    };
  },
  methods: {
    onPage(event) {
      console.log(event);
      this.$emit("pageEvent", event.page + 1);
      //<a href="#!" @click="$emit('myEvent', page)">{{ page }}</a>
    },
  },
  mounted() {
    this.numOfPage = Math.ceil(this.rows / this.perPage);
  },
};
</script>
<style lang="scss" scoped>
.active {
  background-color: blue;
}
</style>
