<template>
  <div
    class="tw-leading-normal tw-tracking-normal tw-text-white gradient tw-w-full tw-p-0"
    style="font-family: 'Source Sans Pro', sans-serif;"
  >
    <!--Nav-->
    <div id="header" class="tw-fixed tw-w-full tw-z-30 tw-top-0 tw-text-white">
      <div
        class="tw-w-full tw-container tw-mx-auto tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-mt-0 tw-py-2"
      >
        <div class="tw-pl-4 tw-flex tw-items-center">
          <router-link
            to="/"
            class="toggleColour tw-text-white tw-no-underline hover:tw-no-underline tw-font-bold tw-text-2xl lg:tw-text-4xl"
          >
            <!--Icon from: http://www.potlabicons.com/ -->
            <img
              class="plane-take-off tw-w-12"
              src="./assets/logo.png"
              alt=""
            />
            <!-- BUYSPOT -->
          </router-link>
        </div>
        <div
          class="toggleColour lg:tw-pl-16 tw-text-sm"
          @click="showLocations()"
        >
          <span class="mdi mdi-map-marker tw-text-xl"></span>
          <span
            class="tw-border-b-2 tw-border-blue-500 tw-cursor-pointer hover:tw-bg-blue-300 sm:tw-p-2"
          >
            {{ location
            }}<span v-if="lga != null" class="tw-hidden sm:tw-inline"
              >, {{ state }} state
            </span>
          </span>
        </div>
        <div class="toggleColour md:tw-hidden tw-text-sm" @click="searchOn()">
          <span class="mdi mdi-search-web tw-text-xl"></span> Search
        </div>
        <div class="tw-block lg:tw-hidden tw-pr-4">
          <button
            id="nav-toggle"
            class="tw-flex tw-items-center tw-p-1 tw-text-gray-300 hover:tw-text-gray-900 focus:tw-outline-none focus:tw-shadow-outline tw-transform tw-transition hover:tw-scale-105 tw-duration-300 tw-ease-in-out"
          >
            <svg
              class="tw-fill-current tw-h-6 tw-w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title class="tw-bg">Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          class="tw-w-full tw-flex-grow lg:tw-flex lg:tw-items-center lg:tw-w-auto tw-hidden tw-mt-2 lg:tw-mt-0 tw-bg-white lg:tw-bg-transparent tw-text-black tw-p-4 lg:tw-p-0 tw-z-20"
          id="nav-content"
        >
          <ul
            class="tw-list-reset lg:tw-flex tw-justify-end tw-flex-1 tw-items-center"
          >
            <template v-if="isLoggedIn">
              <li class="tw-mr-3">
                <router-link
                  to="/messages"
                  class="link-item tw-inline-block tw-text-black tw-no-underline hover:tw-text-gray-800 hover:tw-text-underline tw-py-2 tw-px-4"
                  ><span
                    class="mdi mdi-message tw-text-blue-500 lg:tw-text-white"
                  ></span>
                  Messages
                </router-link>
              </li>
              <li class="tw-mr-3">
                <router-link
                  to="/messages"
                  class="link-item tw-inline-block tw-text-black tw-no-underline hover:tw-text-gray-800 hover:tw-text-underline tw-py-2 tw-px-4"
                  ><span
                    class="mdi mdi-heart tw-text-blue-500 lg:tw-text-white"
                  ></span>
                  Favorites
                </router-link>
              </li>
              <li class="tw-mr-3">
                <router-link
                  to="/userarea"
                  class="link-item tw-inline-block tw-text-black tw-no-underline hover:tw-text-gray-800 hover:tw-text-underline tw-py-2 tw-px-4"
                  ><span
                    class="mdi mdi-account tw-text-blue-500 lg:tw-text-white"
                  ></span>
                  User Area
                </router-link>
              </li>
              <li class="mr-3">
                <router-link
                  to="/"
                  @click="logout"
                  class="link-item tw-inline-block tw-text-black tw-no-underline hover:tw-text-gray-800 hover:tw-text-underline tw-py-2 tw-px-4"
                  >Sign out</router-link
                >
              </li>
            </template>
            <template v-else>
              <li class="mr-3">
                <router-link
                  to="/user/login"
                  class="link-item tw-inline-block tw-py-2 tw-px-4 tw-text-black tw-no-underline"
                  >Sign in</router-link
                >
              </li>
              <li class="mr-3">
                <router-link
                  to="/user/register"
                  class="link-item tw-inline-block tw-text-black tw-no-underline hover:tw-text-gray-800 hover:tw-text-underline tw-py-2 tw-px-4"
                  >Sign up</router-link
                >
              </li>
            </template>
          </ul>
          <button
            id="navAction"
            @click="createAd()"
            class="tw-mx-auto lg:tw-mx-0 hover:tw-underline tw-bg-white tw-text-gray-800 tw-font-bold tw-rounded-full tw-mt-4 lg:tw-mt-0 tw-p-4 tw-shadow tw-opacity-75 focus:tw-outline-none focus:tw-shadow-outline tw-transform tw-transition hover:tw-scale-105 tw-duration-300 tw-ease-in-out tw-relative"
          >
            Sell 4 Free!
          </button>
        </div>
      </div>
      <hr
        class="tw-border-b tw-border-blue-500 tw-opacity-25 tw-my-0 tw-py-0"
      />
    </div>

    <div
      v-if="searchIsOn"
      class="tw-pt-24 sm:tw-hidden tw-flex tw-justify-center tw-items-center"
    >
      <div class="">
        <search></search>
      </div>
    </div>
    <main class="about tw-pt-16 tw-text-gray-900">
      <router-view />
    </main>
    <pageFooter></pageFooter>
    <div
      class="tw-flex tw-fixed tw-text-white tw-bottom-0 tw-justify-between tw-w-full md:tw-hidden tw-h-12 tw-text-center"
    >
      <div
        class="tw-px-4 tw-w-1/3 tw-bg-gray-800 tw-rounded-tr-md"
        @click="showCategory()"
      >
        <span class="mdi mdi-menu"></span> <br />
        Categories
      </div>
      <div class="tw-w-1/3 gradient tw-rounded-t-md" @click="navigate('/')">
        <span class="mdi mdi-home tw-text-2xl"></span>
        <span class="-tw-mt-2 tw-block">Home</span>
      </div>
      <div
        @click="createAd()"
        class="tw-px-4 tw-w-1/3 tw-bg-gray-800 tw-rounded-tl-md"
      >
        <span class="mdi mdi-plus"></span> <br />Post Ad
      </div>
    </div>
    <div
      class="tw-fixed tw-bottom-0 tw-bg-gray-900 tw-p-4"
      v-if="showCookieMsg"
    >
      <p class="text-center">
        Please note that we use cookies to build a more engaging and effective
        service to our visitors by understanding their interests and to help us
        run this website more effectively. By continuing to use Hamsuper's
        website and it's associated subdomains, you agree to our use of cookies
        and privacy policy.
      </p>
      <span class="tw-flex tw-justify-center tw-items-center">
        <button
          @click="seenCookiesMsg()"
          class="tw-m-4 tw-bg-blue-900 tw-py-2 tw-px-8 tw-text-xl tw-rounded-xl tw-border tw-border-indigo-200 hover:tw-bg-black"
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
import M from "materialize-css";

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
      toastMessage: "From data variable",
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
    toast() {
      M.toast({ html: this.toastMessage, displayLength: 4000 });
    },
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
    //fetch user ad messages from server
    setTimeout(() => {
      if (this.user) {
        setInterval(() => {
          store.dispatch("messages", {
            user_id: this.user.id,
          });
        }, 30000);
      }
    }, 200);

    store.dispatch("checkLogin");
    var scrollpos = window.scrollY;
    var header = document.getElementById("header");
    var icons = document.getElementsByClassName("mdi");
    var navcontent = document.getElementById("nav-content");
    var navaction = document.getElementById("navAction");
    //var brandname = document.getElementById("brandname");
    var toToggle = document.querySelectorAll(".toggleColour");
    console.log(icons);

    document.addEventListener("scroll", function() {
      /*Apply classes for slide in bar*/
      scrollpos = window.scrollY;

      if (scrollpos > 10) {
        header.classList.add("tw-bg-white");
        icons[2].classList.add("tw-text-blue-500");
        icons[2].classList.remove("tw-text-white");
        navaction.classList.remove("tw-bg-white");
        navaction.classList.add("gradient");
        navaction.classList.remove("tw-text-gray-800");
        navaction.classList.add("tw-text-white");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("tw-text-gray-800");
          toToggle[i].classList.remove("tw-text-white");
        }
        header.classList.add("tw-shadow");
        navcontent.classList.remove("tw-bg-gray-100");
        navcontent.classList.add("tw-bg-white");
      } else {
        header.classList.remove("tw-bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("tw-bg-white");
        navaction.classList.remove("tw-text-white");
        navaction.classList.add("tw-text-gray-800");
        //Use to switch toggleColour colours
        for (let i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("tw-text-white");
          toToggle[i].classList.remove("tw-text-gray-800");
        }

        header.classList.remove("tw-shadow");
        navcontent.classList.remove("tw-bg-white");
        navcontent.classList.add("tw-bg-gray-100");
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
          if (navMenuDiv.classList.contains("tw-hidden")) {
            navMenuDiv.classList.remove("tw-hidden");
          } else {
            navMenuDiv.classList.add("tw-hidden");
          }
        } else {
          // click both outside link and outside menu, hide menu
          navMenuDiv.classList.add("tw-hidden");
        }
      }
    }
    let linkItems = document.querySelectorAll(".link-item");
    for (let linkItem of linkItems) {
      linkItem.addEventListener("click", function() {
        navMenuDiv.classList.add("tw-hidden");
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
  border-bottom: 2px solid #afd0e9;
  font-weight: bolder;
  color: #d9e3eb;
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
