<template>
<!-- Admin access -->
  <div id="admin-edit" v-if="this.current_user.user.admin">
    <h1>This is the recipe edit page. ADMIN ONLY!!</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
        <h2>{{ recipe.name }}</h2>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Directions: {{ recipe.directions }}</p>
        <button v-on:click="recipeUpdate(recipe)">Update</button>
        <button v-on:click="recipeDestroy(recipe)">Delete</button>
      </div>
  </div>
  <!-- Admin denied -->
  <div v-else>
    <h1>Looks like you're not supposed to be here...</h1>
    <router-link v-bind:to="`/recipes`">
      <button>Take me back</button>
    </router-link>
  </div>
</template> 

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipes: [],
      current_user: {},
    };
  },
  created: function () {
    this.indexRecipes();
    this.userShow();
  },
  mounted: function () {
    console.log(this.$admin);
  },
  methods: {
    indexRecipes: function () {
      axios.get("/api/recipes").then((response) => {
        console.log(response.data);
        this.recipes = response.data;
      });
    },
    userShow: function () {
      axios.get("/api/users").then((response) => {
        console.log(response.data);
        this.current_user = response.data;
      });
    },
    recipeUpdate: function (recipe) {
      axios.patch("/api/recipes/" + recipe.id).then((response) => {
        console.log(response.data);
      });
    },
    deleteCheck: function () {
      document.querySelector("delete-check").showModal();
    },
    recipeDestroy: function (recipe) {
      if (confirm("Are you sure?")) {
        axios.delete("/api/recipes/" + recipe.id).then(() => {
          console.log("Successfully deleted");
          this.recipes.splice(this.recipes.indexOf(recipe), 1);
        });
      }
    },
  },
};
</script>