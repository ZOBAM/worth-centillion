<template>
  <svg
    width="100%"
    height="600"
    style="border: 2px solid white; background-color: white"
  >
    <circle cy="60" cx="60" r="50" stroke="black" stroke-width="3" fill="red" />
    <polygon
      points="200, 10 250, 190 160, 210"
      style="fill:lime; stroke: purple; stroke-width:2"
    />
    <polygon
      points="480, 10 480, 190 290, 190"
      style="fill:lime; stroke: purple; stroke-width:2"
    />
    <polygon
      points="600, 5 850, 110 680, 113 513, 200"
      style="fill:red; stroke: green; stroke-width:8"
    />
  </svg>
</template>
<script>
export default {
  name: "SVG",
  data() {
    return {
      myNumber: 12,
    };
  },
  methods: {
    myPromise() {
      let firstPromise = new Promise(function(myResolve, myReject) {
        myResolve(23);
        myReject(0);
      });
      firstPromise.then((value) => {
        alert(value);
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.myPromise();
    }, 3000);
  },
};
</script>
