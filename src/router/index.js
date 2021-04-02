import Vue from "vue";
import VueRouter from "vue-router";
import Recipes from "../views/Recipes.vue";
import User from "../views/User.vue";
import RecipeShow from "../views/RecipeShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/recipes",
    name: "recipes-index",
    component: Recipes,
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/recipes/:id",
    name: "recipes-show",
    component: RecipeShow,
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
