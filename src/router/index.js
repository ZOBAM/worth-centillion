import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import UserArea from "../views/UserArea.vue";
import AdDetails from "../views/AdDetails.vue";
import SearchResult from "../views/SearchResult.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/user/:action",
    name: "User",
    component: User
  },
  {
    path: "/userarea",
    name: "UserArea",
    component: UserArea
  },
  {
    path: "/ads/:id",
    name: "AdDetails",
    component: AdDetails
  },
  {
    path: "/searchresult",
    name: "SearchResult",
    component: SearchResult
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
