<template>
  <div class="leading-normal tracking-normal text-white gradient w-full p-0" style="font-family: 'Source Sans Pro', sans-serif;">
    <!--Nav-->
        <nav id="header" class="fixed w-full z-30 top-0 text-white">
      <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div class="pl-4 flex items-center">
          <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="">
            <!--Icon from: http://www.potlabicons.com/ -->
            <img class="plane-take-off w-12" src="./assets/logo.png" alt="">
            <!-- BUYSPOT -->
          </a>
        </div>
        <div class="block lg:hidden pr-4">
          <button id="nav-toggle" class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title class="bg">Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
            <li class="mr-3">
              <a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="">User Area</a>
            </li>
            <li class="mr-3">
              <a class="inline-block py-2 px-4 text-black font-bold no-underline" href="">Login</a>
            </li>
            <li class="mr-3">
              <a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="">Register</a>
            </li>
          </ul>
          <button
            id="navAction"
            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out relative"
          >
            Cart 
          </button>
        </div>
      </div>
      <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>

    <div v-if="searchIsOn" class="">
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix" @click="showLocations()"
                >location_on</i
              >
              <input id="search" type="text" class="validate" />
              <button class="btn waves-effect waves-light blue darken-1">
                Search<i class="material-icons right">send</i>
              </button>
              <label for="search">Search</label>
            </div>
          </div>
        </form>
      </div>
    </div>
    <router-view />
    <pageFooter></pageFooter>
  </div>
</template>

<script>
import M from "materialize-css";
import pageFooter from "@/components/page-footer";
import store from "../src/store";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    pageFooter,
  },
  data() {
    return {
      searchIsOn: false,
      bearerToken: "",
      loginData: { email: "donzoby@email.com", password: "123eeefffs" },
    };
  },
  compuuted: {
    ...mapActions(["login"]),
    ...mapState(["user"]),
  },
  mounted() {
    //let header = document.getElementById('headerX');
    //header.style.backgroundColor = 'red';
    //M.AutoInit();
    M.toast({ html: "Programmatic toast 2!" });

    var scrollpos = window.scrollY;
      var header = document.getElementById("header");
      var navcontent = document.getElementById("nav-content");
      var navaction = document.getElementById("navAction");
      //var brandname = document.getElementById("brandname");
      var toToggle = document.querySelectorAll(".toggleColour");

      document.addEventListener("scroll", function () {
        /*Apply classes for slide in bar*/
        scrollpos = window.scrollY;

        if (scrollpos > 10) {
          header.classList.add("bg-white");
          navaction.classList.remove("bg-white");
          navaction.classList.add("gradient");
          navaction.classList.remove("text-gray-800");
          navaction.classList.add("text-white");
          //Use to switch toggleColour colours
          for (var i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-gray-800");
            toToggle[i].classList.remove("text-white");
          }
          header.classList.add("shadow");
          navcontent.classList.remove("bg-gray-100");
          navcontent.classList.add("bg-white");
        } else {
          header.classList.remove("bg-white");
          navaction.classList.remove("gradient");
          navaction.classList.add("bg-white");
          navaction.classList.remove("text-white");
          navaction.classList.add("text-gray-800");
          //Use to switch toggleColour colours
          for (let i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-white");
            toToggle[i].classList.remove("text-gray-800");
          }

          header.classList.remove("shadow");
          navcontent.classList.remove("bg-white");
          navcontent.classList.add("bg-gray-100");
        }
      });//end of document.scroll

       var navMenuDiv = document.getElementById("nav-content");
      var navMenu = document.getElementById("nav-toggle");

      document.onclick = check;
      function check(e) {
        var target = (e && e.target) || (event && event.srcElement);

        //Nav Menu
        if (!checkParent(target, navMenuDiv)) {
          // click NOT on the menu
          if (checkParent(target, navMenu)) {
            // click on the link
            if (navMenuDiv.classList.contains("hidden")) {
              navMenuDiv.classList.remove("hidden");
            } else {
              navMenuDiv.classList.add("hidden");
            }
          } else {
            // click both outside link and outside menu, hide menu
            navMenuDiv.classList.add("hidden");
          }
        }
      }
      function checkParent(t, elm) {
        while (t.parentNode) {
          if (t == elm) {
            return true;
          }
          t = t.parentNode;
        }
        return false;
      }
  },
  methods: {
    loginUser: function () {
      store.dispatch("login", this.loginData);
    },
    getUsers: function () {
      console.log("About to fetch users");
      this.axios.withCredentials = true;
      this.axios
        .get("http://www.api.worthcentillion.net/api/user")
        .then((response) => {
          console.log(response);
        });
    },
    searchOn: function () {
      this.searchIsOn = !this.searchIsOn;
    },
    showLocations: function () {
      alert("Showing locations");
    },
  },
};
</script>

<style lang="scss">
.gradient {
        background: linear-gradient(90deg, #014A7F 0%, #312a99 100%);
      }
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  background-color: #014a7f;
  .nav-wrapper {
    background-color: #014a7f;
    padding: 0px 1em;
    display: flex;
    width: 100%;
    justify-content: space-between;
    text-align: left;
    a {
      display: block;
      img {
        width: 3.2em;
        margin-top: 1vh;
      }
      i {
        font-size: 2.5em;
      }
    }
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
