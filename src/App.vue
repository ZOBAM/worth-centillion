<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | SITE_NAME` : `SITE_NAME`
    }}</template>
  </metainfo>
  <div
    class="leading-normal tracking-normal text-white gradient w-full p-0"
    style="font-family: 'Source Sans Pro', sans-serif;"
  >
    <!--Nav-->
    <nav id="header" class="fixed w-full z-30 top-0 text-white">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
      >
        <div class="pl-4 flex items-center">
          <router-link
            to="/"
            class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            <!--Icon from: http://www.potlabicons.com/ -->
            <img class="plane-take-off w-12" src="./assets/logo.png" alt="" />
            <!-- BUYSPOT -->
          </router-link>
        </div>
        <div class="toggleColour lg:pl-16 text-sm" @click="showLocations()">
          <span class="mdi mdi-map-marker text-xl"></span>
          <span
            class="border-b-2 border-blue-500 cursor-pointer hover:bg-blue-300 sm:p-2"
          >
            {{ location
            }}<span v-if="lga != null" class="hidden sm:inline"
              >, {{ state }} state
            </span>
          </span>
        </div>
        <div class="toggleColour sm:hidden text-sm" @click="searchOn()">
          <span class="mdi mdi-search-web text-xl"></span> Search
        </div>
        <div class="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            class="flex items-center p-1 text-gray-300 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            <svg
              class="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title class="bg">Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
          id="nav-content"
        >
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
            <template v-if="isLoggedIn">
              <li class="mr-3">
                <router-link
                  to="/userarea"
                  class="link-item inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  >User Area</router-link
                >
              </li>
              <li class="mr-3">
                <router-link
                  to="/"
                  @click="logout"
                  class="link-item inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  >Sign out</router-link
                >
              </li>
            </template>
            <template v-else>
              <li class="mr-3">
                <router-link
                  to="/user/login"
                  class="link-item inline-block py-2 px-4 text-black no-underline"
                  >Sign in</router-link
                >
              </li>
              <li class="mr-3">
                <router-link
                  to="/user/register"
                  class="link-item inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  >Sign up</router-link
                >
              </li>
            </template>
          </ul>
          <button
            id="navAction"
            @click="createAd()"
            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 p-4 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out relative"
          >
            Sell 4 Free!
          </button>
        </div>
      </div>
      <hr class="border-b border-blue-500 opacity-25 my-0 py-0" />
    </nav>

    <div v-if="searchIsOn" class="pt-24 flex justify-center items-center">
      <div class="">
        <search></search>
      </div>
    </div>
    <main class="about pt-24 text-gray-900">
      <router-view />
    </main>
    <pageFooter></pageFooter>
    <div
      class="flex fixed text-white bottom-0 justify-between w-full md:hidden h-12 text-center"
    >
      <div class="px-4 w-1/3 bg-gray-800 rounded-tr-md" @click="showCategory()">
        <span class="mdi mdi-menu"></span> <br />
        Categories
      </div>
      <div class="w-1/3 gradient rounded-t-md" @click="navigate('/')">
        <span class="mdi mdi-home text-2xl"></span>
        <span class="-mt-2 block">Home</span>
      </div>
      <div @click="createAd()" class="px-4 w-1/3 bg-gray-800 rounded-tl-md">
        <span class="mdi mdi-plus"></span> <br />Post Ad
      </div>
    </div>
    <div class="fixed bottom-0 bg-gray-900 p-4" v-if="showCookieMsg">
      <p class="text-center">
        Please note that we use cookies to build a more engaging and effective
        service to our visitors by understanding their interests and to help us
        run this website more effectively. By continuing to use Hamsuper's
        website and it's associated subdomains, you agree to our use of cookies
        and privacy policy.
      </p>
      <span class="flex justify-center items-center">
        <button
          @click="seenCookiesMsg()"
          class="m-4 bg-blue-900 py-2 px-8 text-xl rounded-xl border border-indigo-200 hover:bg-black"
        >
          OK, I'm in
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import pageFooter from "@/components/page-footer";
import Search from "@/components/Search";
import store from "../src/store";
import { mapState, mapActions } from "vuex";
import router from "./router";

export default {
  components: {
    pageFooter,
    Search,
  },
  data() {
    return {
      searchIsOn: false,
      bearerToken: "",
      showCookieMsg: true,
    };
  },
  computed: {
    ...mapActions(["login", "checkLogin"]),
    ...mapState([
      "user",
      "isLoggedIn",
      "displayLocation",
      "displayCategory",
      "subcategory",
      "state",
      "lga",
    ]),
    loggedIn: function() {
      return "Hello";
    },
    location() {
      if (this.state) {
        if (this.lga) {
          return this.lga;
        }
        return this.state;
      } else return "All Nigeria";
    },
  },
  methods: {
    createAd() {
      router.push("/create_ad");
    },
    seenCookiesMsg() {
      this.showCookieMsg = false;
      //save this in local storage
      localStorage.setItem("seenCookieMsg", true);
    },
    showCategory() {
      store.dispatch("setProps", {
        name: "displayCategory",
        value: !this.displayCategory,
      });
      //alert("about showing categories");
    },
    loginUser: function() {
      store.dispatch("login", this.loginData);
    },
    navigate(address) {
      address;
      router.push("/");
    },
    logout() {
      store.dispatch("logout");
    },
    getUsers: function() {
      console.log("About to fetch users");
      this.axios.withCredentials = true;
      this.axios
        .get("http://www.api.worthcentillion.net/api/user")
        .then((response) => {
          console.log(response);
        });
    },
    searchOn: function() {
      this.searchIsOn = !this.searchIsOn;
    },
    showLocations: function() {
      store.dispatch("setProps", {
        name: "displayLocation",
        value: !this.displayLocation,
      });
    } /* ,
    showLocationStatus(){
      alert("about to show locatioin");
    } */,
  },
  created() {
    //get the list of categories from the server
    //let _this = this;
    /* this.axios
      .get(process.env.VUE_APP_APIURL+"/ads/get_categories")
      .then(function (response) {
        //alert("Categories fetched");
        let categories = response.data.categories;
        store.dispatch('setProps',{name: "categories", value: categories});
        //console.log(_this.categories);
      }); */
    //fetch data from server
    store.dispatch("fetchData");
    //get seenCookieMsg from local storage
    if (localStorage.getItem("seenCookieMsg") != null) {
      this.showCookieMsg = false;
    }
  },
  mounted() {
    store.dispatch("checkLogin");
    var scrollpos = window.scrollY;
    var header = document.getElementById("header");
    var navcontent = document.getElementById("nav-content");
    var navaction = document.getElementById("navAction");
    //var brandname = document.getElementById("brandname");
    var toToggle = document.querySelectorAll(".toggleColour");

    document.addEventListener("scroll", function() {
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
    }); //end of document.scroll

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
    let linkItems = document.querySelectorAll(".link-item");
    for (let linkItem of linkItems) {
      linkItem.addEventListener("click", function() {
        navMenuDiv.classList.add("hidden");
      });
    }
    //alert(linkItems.length);
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
};
</script>

<style lang="scss">
.gradient {
  background: linear-gradient(90deg, #014a7f 0%, #2a84cc 100%);
}
.router-link-active {
  background: #52a7e7;
  font-weight: bolder;
}
@media only screen and (max-width: 768px) {
  nav {
  }
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
