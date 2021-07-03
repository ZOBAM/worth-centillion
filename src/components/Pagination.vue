<template class="">
  <ul class="pagination tw-bg-gray-100 tw-p-2 tw-py-4">
    <li class="">
      <a href="#!"
        ><i class="material-icons" @click="$emit('myEvent', currentPage - 1)"
          >chevron_left</i
        ></a
      >
    </li>
    <!-- <li class="active"><a href="#!">1</a></li> -->
    <li
      v-for="page in numOfPage"
      :key="page"
      class="waves-effect"
      :class="{ active: page == currentPage, blue: page == currentPage }"
    >
      <a href="#!" @click="$emit('myEvent', page)">{{ page }}</a>
    </li>
    <li class="waves-effect">
      <a href="#!"
        ><i class="material-icons" @click="$emit('myEvent', currentPage + 1)"
          >chevron_right</i
        ></a
      >
    </li>
  </ul>
</template>
<script>
export default {
  name: "Pagination",
  props: ["rows", "perPage", "currentPage"],
  data() {
    return {
      numOfPage: 0,
    };
  },
  methods: {
    navigate() {
      //this.$emit("myEvent");
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
