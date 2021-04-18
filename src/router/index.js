import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import UserArea from "../views/UserArea.vue";
import AdDetails from "../views/AdDetails.vue";
import SearchResult from "../views/SearchResult.vue";
import VTU from "../views/VTU.vue";
import Pay from "../views/Pay.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
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
        if (store.state.user.email_verified_at) {
          next();
        } else {
          next({ path: "/verify_email" });
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
        if (store.state.user.email_verified_at) {
          next();
        } else {
          next({ path: "/verify_email" });
        }
      } else {
        next({ path: "/user/login" });
      }
    },
  },
  {
    path: "/verify_email",
    name: "Verify_email",
    component: VerifyEmail,
    beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        if (store.state.user.email_verified_at) {
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
        if (store.state.user.email_verified_at) {
          next();
        } else {
          next({ path: "/verify_email" });
        }
      } else {
        next({ path: "/user/login" });
      }
    },
  },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
  },
  {
    path: "/svg",
    name: "SVG",
    component: SVG,
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
