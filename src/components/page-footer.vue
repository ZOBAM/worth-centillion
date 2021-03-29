<template>
    <footer style="background-color: #14275F">
      <div class="container mx-auto px-8">
        <div class="w-full flex flex-col md:flex-row py-6">
          <div class="flex-1 mb-6 text-black">
            <a class="text-gray-600 no-underline hover:no-underline font-bold text-2xl lg:text-2xl" href="#">
              <!--Icon from: http://www.potlabicons.com/ -->
              <img class="plane-take-off w-12" src="../assets/logo.png" alt="">
              <!-- Worth Centillion -->
            </a>
          </div>
          <div class="flex-1">
            <p class="uppercase text-gray-500 md:mb-6">Links</p>
            <ul class="list-reset mb-6">
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" class="no-underline hover:underline text-gray-400 hover:text-pink-500">FAQ</a>
              </li>
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" class="no-underline hover:underline text-gray-400 hover:text-pink-500">Help</a>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <p class="uppercase text-gray-500 md:mb-6">Legal</p>
            <ul class="list-reset mb-6">
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" class="no-underline hover:underline text-gray-400 hover:text-pink-500">Terms</a>
              </li>
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" class="no-underline hover:underline text-gray-400 hover:text-pink-500">Privacy</a>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <p class="uppercase text-gray-500 md:mb-6">Social</p>
            <ul class="list-reset mb-6">
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" class="no-underline hover:underline text-gray-400 hover:text-pink-500">Facebook</a>
              </li>
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" class="no-underline hover:underline text-gray-400 hover:text-pink-500">Twitter</a>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <p class="uppercase text-gray-500 md:mb-6">Company</p>
            <ul class="list-reset mb-6">
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <router-link to="/about" class="no-underline hover:underline text-gray-400 hover:text-pink-500">About Us</router-link>
              </li>
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" class="no-underline hover:underline text-gray-400 hover:text-pink-500">Contact</a>
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
        <p class="text-center font-extralight pb-12 sm:pb-1" style="background-color: #14275F; font-size: .8em">
          All Rights Reserved (c) Hamsuper 2021
        </p>
    </div>
</template>
<script>
export default {
    name: 'pageFooter',
}
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