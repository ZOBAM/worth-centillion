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
import SVG from "../views/SVG.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:action",
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
        store.dispatch("setProps", {
          name: "destinationURL",
          value: "/create_ad",
        });
        next({ path: "/user/login" });
      }
    },
  },
  {
    path: "/verify/:type",
    name: "Verify_email",
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
  },
  {
    path: "/ads/:id",
    name: "AdDetails",
    component: AdDetails,
  },
  {
    path: "/searchresult",
    name: "SearchResult",
    component: SearchResult,
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
        store.dispatch("setProps", {
          name: "destinationURL",
          value: "/vtu",
        });
        next({ path: "/user/login" });
      }
    },
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
  },
  {
    path: "/terms",
    name: "Terms",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Terms.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Contact.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
