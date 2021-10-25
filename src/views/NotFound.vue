<template>
  <article class="bg-white p-4">
    <h3 class="text-center">
      Oops! It's like you entered the wrong address.
    </h3>
    <p>
      We will redirect you to the home page in a moment.
    </p>
  </article>
</template>
<script>
export default {
  mounted() {
    setTimeout(() => this.$router.push("/"), 3500);
  },
};
</script>
