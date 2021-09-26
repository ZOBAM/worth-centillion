import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import UserArea from "../views/UserArea.vue";
import AdDetails from "../views/AdDetails.vue";
import SearchResult from "../views/SearchResult.vue";
import VTU from "../views/VTU.vue";
import Verify from "../views/Verify.vue";
import NotFound from "../views/NotFound.vue";
import CreateAd from "../views/CreateAd.vue";
import Messages from "../views/Messages.vue";
import Favorite from "../views/Favorite.vue";
import Invite from "../views/Invite.vue";
import SVG from "../views/SVG.vue";
import store from "../store";
import HowItWorks from "../views/HowItWorks.vue";
import FAQ from "../views/FAQ.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:action/:refID?",
    name: "User",
    component: User,
    beforeEnter(to, from, next) {
      if (!store.state.isLoggedIn) {
        //alert("Logged in at route check")
        next();
      } else {
        next({ path: "/userarea" });
      }
    },
    meta:{
      title: "Sign In"
    }
  },
  {
    path: "/userarea",
    name: "UserArea",
    component: UserArea,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.tel_verified == 1) {
          if (store.state.destinationURL) {
            store.dispatch("moveToDestination");
          } else {
            next();
          }
        } else {
          next({ path: "/verify/tel" });
        }
      } else {
        next({ path: "/user/login" });
      }
    },
    meta:{
      title: "User Area"
    }
  },
  {
    path: "/messages",
    name: "Message",
    component: Messages,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.tel_verified == 1) {
          if (store.state.destinationURL) {
            store.dispatch("moveToDestination");
          } else {
            next();
          }
        } else {
          next({ path: "/verify/tel" });
        }
      } else {
        next({ path: "/user/login" });
      }
    },
    meta:{
      title: "Messages"
    }
  },
  {
    path: "/favorites",
    name: "Favorite",
    component: Favorite,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.tel_verified == 1) {
          next();
        } else {
          next({ path: "/verify/tel" });
        }
      } else {
        store.dispatch("setProps", { destinationURL: "/favorites" });
        next({ path: "/user/login" });
      }
    },
    meta:{
      title: "Favorites"
    }
  },
  {
    path: "/invite",
    name: "Invite",
    component: Invite,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.tel_verified == 1) {
          next();
        } else {
          next({ path: "/verify/tel" });
        }
      } else {
        store.dispatch("setProps", { destinationURL: "/invite" });
        next({ path: "/user/login" });
      }
    },
    meta:{
      title: "Invite Friends"
    }
  },
  {
    path: "/create_ad",
    name: "CreateAd",
    component: CreateAd,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.tel_verified == 1) {
          next();
        } else {
          next({ path: "/verify/tel" });
        }
      } else {
        store.dispatch("setProps", { destinationURL: "/create_ad" });
        next({ path: "/user/login" });
      }
    },
    meta:{
      title: "Creat New Ad"
    }
  },
  {
    path: "/verify/:type",
    name: "Verify",
    component: Verify,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.tel_verified == 1) {
          next({ path: "/userarea" });
        } else {
          next();
        }
      } else {
        next({ path: "/user/login" });
      }
    },
    meta:{
      title: "Verify Contact"
    }
  },
  {
    path: "/ads/:id",
    name: "AdDetails",
    component: AdDetails,
    meta:{
      title: "Ad Details"
    }
  },
  {
    path: "/searchresult",
    name: "SearchResult",
    component: SearchResult,
    meta:{
      title: "Search Results"
    }
  },
  {
    path: "/how_it_works",
    name: "HowItWorks",
    component: HowItWorks,
    meta:{
      title: "How it Works"
    }
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    meta:{
      title: "FAQs"
    }
  },
  {
    path: "/vtu/:ref_id?",
    name: "VTU",
    component: VTU,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.tel_verified == 1) {
          next();
        } else {
          next({ path: "/verify/tel" });
        }
      } else {
        store.dispatch("setProps", { destinationURL: "/vtu" });
        next({ path: "/user/login" });
      }
    },
    meta:{
      title: "VTU Deals"
    }
  },
  {
    path: "/svg",
    name: "SVG",
    component: SVG,
  },
  {
    path: "/privacy_policy",
    name: "PrivacyPolicy",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/privacy_policy.vue"),
    meta:{
      title: "Privacy Policy"
    }
  },
  {
    path: "/terms",
    name: "Terms",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Terms.vue"),
    meta:{
      title: "Terms of Use"
    }
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Contact.vue"),
    meta:{
      title: "Contact Us"
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta:{
      title: "About Us"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta:{
      title: "Page Not Found"
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
