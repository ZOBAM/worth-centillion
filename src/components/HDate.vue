<template>
  <span>{{ formatDate() }}</span>
</template>
<script>
export default {
  name: "HDate",
  props: ["date", "shorten"],
  methods: {
    formatDate() {
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let date = this.date.split("T")[0];
      let dateArr = date.split("-");
      let yr = dateArr[0],
        month = months[dateArr[1] - 1],
        day = dateArr[2];
      if (this.shorten) {
        month = month.substring(0, 3);
      }
      return month + " " + day + ", " + yr;
    },
  },
};
</script>
