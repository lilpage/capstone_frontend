<template>
  <div class="recipe-show">
    <h1>{{ recipe.name }}</h1>
    <div>
      <h2>Ingredients:</h2>
      <ul> 
          <li v-for="ingredient in recipe.ingredient_lists" v-bind:key="ingredient.id"> {{ ingredient.amount }} {{ ingredient.ingredients }}</li>
        </ul>
    </div>
    <div>
      <h2>Directions: </h2>
      <ol id ="tags">
        <li v-for="direction in recipe.directions" v-bind:key="direction.id">{{ direction }}</li>
      </ol>
    </div>
    <!-- Tags list -->
    <ul> 
      <li v-for="tag in recipe.tags" v-bind:key="tag.id"> {{ tag.name }} </li>
    </ul>
    <!-- Favorite  -->
    <button v-on:click="addToFavorites(recipe)">favorite</button>
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
    addToFavorites: function (recipe) {
      let params = {
        user_id: localStorage.getItem("user_id"),
        recipe_id: recipe.id,
      };
      axios.post("/api/favorites", params).then((response) => {
        console.log(response.data);
        this.$router.push("/recipes");
      });
    },
  },
};
</script>