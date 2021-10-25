<template>
  <article class="p-6 bg-white text-xl font-noto">
    <h1 class="bg-gray-100 text-center text-3xl font-semibold font-roboto">
      About <span class="text-blue-700">H</span>amsuper
    </h1>
    <section class="about">
      <p class="">
        Hamsuper was conceived and birthed with the belief that there is always
        a further step to take to make life easier for all of us who daily
        engage in buying stuffs and also sell by the use of the web and even
        physical stores.
      </p>
      <p class="">
        We set out and are committed to achieving the goal of bringing
        simplistic uniqueness to your shopping and purchases online while also
        providing a free, convenient and effective platform to advertise your
        goods and services.
      </p>
      <p class="">
        As we grow in size and capacity, it is our hope that in the same vein,
        our services will increase both in their diversity and also quality.
      </p>
      <p>
        Within the core of this drive lies our earnest desire to engineers a
        better way to care for our world based on our belief that to truly care
        is to empower and to be truly empowered is to be empowered enough to
        live your dream.
      </p>
      <p>
        We do this by putting resources in the hands of those that really need
        it to pursue their dream and change our world for good for this purpose
        our Fundme Platform exist.
      </p>
    </section>
    <section>
      <h5 class="font-bold p-2">Vision</h5>
      <p>
        To simplify and provide a consolidated platform for buying, selling and
        utility transactions.
      </p>
    </section>
    <section class="mt-6">
      <h5 class="font-bold p-2">Mission</h5>
      <p>
        Simplifying and providing a meeting point for sellers and buyers and
        making available convenient channels through which individuals can
        purchase and utilize common day to day goods and services.
      </p>
    </section>
  </article>
</template>
<script>
export default {
  mounted() {
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("You have reached end of page");
      }
    };
  },
};
</script>
<style lang="scss" scoped>
.about {
  margin-top: 2rem;
  p {
    margin-bottom: 1.5rem;
    text-indent: 2%;
  }
}
</style>
