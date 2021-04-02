<template>
  <div class="recipe-show">
    <h2>{{ recipe.name }}</h2>
    <div>Ingredients: {{ recipe.ingredients }}</div>
    <div>Directions: {{ recipe.directions }}</div>
    <!-- Favorite  -->
    <button v-on:click="addToFavorites()">favorite</button>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {},
    };
  },
  created: function () {
    this.recipeShow();
  },
  methods: {
    recipeShow: function () {
      axios.get("/api/recipes/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.recipe = response.data;
      });
    },
    addToFavorites: function () {
      console.log("added to favorites");
      // ?????
    },
  },
};
</script>