<template>
  <footer style="background-color: #14275F">
    <div class="tw-container tw-mx-auto tw-px-8">
      <div class="tw-w-full tw-flex tw-flex-col md:tw-flex-row tw-py-6">
        <div class="tw-flex-1 tw-mb-6 tw-text-black">
          <a
            class="tw-text-gray-600 tw-no-underline hover:tw-no-underline tw-font-bold tw-text-2xl lg:tw-text-2xl"
            href="#"
          >
            <!--Icon from: http://www.potlabicons.com/ -->
            <img
              class="plane-take-off tw-w-12"
              src="../assets/logo.png"
              alt=""
            />
            <!-- Worth Centillion -->
          </a>
        </div>
        <div class="tw-flex-1">
          <p class="tw-uppercase tw-text-gray-500 md:tw-mb-6">Links</p>
          <ul class="tw-list-reset tw-mb-6">
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <a
                href="#"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
                >FAQ</a
              >
            </li>
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <router-link
                to="/"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
                >Home</router-link
              >
            </li>
          </ul>
        </div>
        <div class="tw-flex-1">
          <p class="tw-uppercase tw-text-gray-500 md:tw-mb-6">Legal</p>
          <ul class="tw-list-reset tw-mb-6">
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <router-link
                to="/terms"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
                >Terms</router-link
              >
            </li>
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <router-link
                to="/privacy_policy"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
                >Privacy</router-link
              >
            </li>
          </ul>
        </div>
        <div class="tw-flex-1">
          <p class="tw-uppercase tw-text-gray-500 md:tw-mb-6">Social</p>
          <ul class="list-reset mb-6">
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <a
                href="#"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
                >Facebook</a
              >
            </li>
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <a
                href="#"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
                >Twitter</a
              >
            </li>
          </ul>
        </div>
        <div class="tw-flex-1">
          <p class="tw-uppercase tw-text-gray-500 md:tw-mb-6">Company</p>
          <ul class="list-reset mb-6">
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <router-link
                to="/about"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
                >About Us</router-link
              >
            </li>
            <li class="tw-mt-2 tw-inline-block tw-mr-2 md:tw-block md:tw-mr-0">
              <router-link
                to="/contact"
                class="tw-no-underline hover:tw-underline tw-text-gray-400 hover:tw-text-pink-500"
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
      class="tw-text-center tw-font-extralight tw-pb-12 sm:tw-pb-1"
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
<style lang="scss" scoped>
/* footer {
  background-color: #014A7F;
  clip-path: polygon(0 14%, 100% 0, 100% 100%, 0% 100%);
  min-height: 10em;
  padding: 1em;
    margin: 0px;
    ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
        //display: inline-block;
        a{
            color: white;
        }
        }
     } 
}
div{
    background-color: #002138;
    //margin: -1em 0px;
    min-height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
        color: rgba(255, 255, 254, 0.589);
        font-size: .8em;
    }
} */
</style>
