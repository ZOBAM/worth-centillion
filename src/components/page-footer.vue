<template>
  <footer style="background-color: #14275F">
    <div class="container mx-auto px-8">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-1 mb-6 text-black">
          <a
            class="text-gray-600 no-underline hover:no-underline font-bold text-2xl lg:text-2xl"
            href="#"
          >
            <!--Icon from: http://www.potlabicons.com/ -->
            <img class="plane-take-off w-12" src="../assets/logo.png" alt="" />
            <!-- Worth Centillion -->
          </a>
        </div>
        <div class="flex-1">
          <p class="uppercase text-gray-500 md:mb-6">Links</p>
          <ul class="list-reset mb-6">
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <router-link
                to="/faq"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >FAQ</router-link
              >
            </li>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <router-link
                to="/"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >Home</router-link
              >
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <p class="uppercase text-gray-500 md:mb-6">Legal</p>
          <ul class="list-reset mb-6">
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <router-link
                to="/terms"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >Terms</router-link
              >
            </li>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <router-link
                to="/privacy_policy"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >Privacy</router-link
              >
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <p class="uppercase text-gray-500 md:mb-6">Social</p>
          <ul class="list-reset mb-6">
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                href="#"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >Facebook</a
              >
            </li>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                href="#"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >Twitter</a
              >
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <p class="uppercase text-gray-500 md:mb-6">Company</p>
          <ul class="list-reset mb-6">
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <router-link
                to="/about"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >About Us</router-link
              >
            </li>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <router-link
                to="/contact"
                class="no-underline hover:underline text-gray-400 hover:text-pink-500"
                >Contact</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <a href="https://www.freepik.com/free-photos-vectors/background" class="text-gray-500">Background vector created by freepik - www.freepik.com</a> -->
  </footer>
  <!-- <footer>
        <ul>
            <li><a href="">About Us</a> </li>
            <li><a href="">Contanct Us</a></li>
            <li><a href="">How it Works</a></li>
            <li><a href="">Home</a></li>
        </ul>
    </footer> -->
  <div>
    <p
      class="text-center font-extralight pb-12 sm:pb-1"
      style="background-color: #14275F; font-size: .8em"
    >
      All Rights Reserved (c) Hamsuper 2021
    </p>
  </div>
</template>
<script>
export default {
  name: "pageFooter",
};
</script>
<style lang="scss" scoped></style>
