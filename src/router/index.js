import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import User from "../views/User.vue";
import RecipeShow from "../views/RecipeShow.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import RecipeEdit from "../views/RecipeEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
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
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  // ADMIN ONLY
  {
    path: "/admin/recipes/edit",
    name: "edit",
    component: RecipeEdit,
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
