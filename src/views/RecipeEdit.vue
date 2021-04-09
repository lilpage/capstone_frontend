<template>
  <div id="admin-edit">
    <h1>This is the recipe edit page. ADMIN ONLY!!</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
        <h2>{{ recipe.name }}</h2>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Directions: {{ recipe.directions }}</p>
        <button v-on:click="recipeUpdate(recipe)">Update</button>
        <button v-on:click="recipeDestroy(recipe)">Delete</button>
      </div>
  </div>
</template> 

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipes: [],
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("/api/recipes").then((response) => {
        console.log(response.data);
        this.recipes = response.data;
      });
    },
    recipeUpdate: function (recipe) {
      axios.patch("/api/recipes/" + recipe.id).then((response) => {
        console.log(response.data);
      });
    },
    recipeDestroy: function (recipe) {
      axios.delete("/api/recipes/" + recipe.id).then(() => {
        console.log("Successfully deleted");
        this.recipes.splice(this.recipes.indexOf(recipe), 1);
      });
    },
  },
};
</script>