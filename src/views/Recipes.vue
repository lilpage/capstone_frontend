<template>
  <div class="recipes">
    <h1>Drinking Buddy</h1>
      <div v-for="recipe in recipes" v-bind:key="recipe.id">
        <h2>{{ recipe.name }}</h2>
        <!-- List Ingredients -->
        <ul> 
          <li v-for="ingredient in recipe.ingredient_lists" v-bind:key="ingredient.id"> {{ ingredient.amount }} {{ ingredient.ingredients }}</li>
        </ul>
        <!-- List directions -->
        <h4>Directions: </h4>
        <ol>
          <li v-for="direction in recipe.directions" v-bind:key="direction.id">{{ direction }}</li>
        </ol>
        <!-- Buttons -->
        <!-- Router-link to push to new page -->
        <router-link v-bind:to="`/recipes/${recipe.id}`">
          <button>See More</button>
        </router-link>
        <!-- Button for action -->
        <button v-on:click="addToFavorites(recipe)">Favorite</button>
      </div>
  </div>
</template>

<style>
</style>

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
    addToFavorites: function (recipe) {
      let params = {
        user_id: localStorage.getItem("user_id"),
        recipe_id: recipe.id,
      };
      axios.post("/api/favorites", params).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>