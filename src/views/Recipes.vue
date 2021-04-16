<template>
  <div class="recipes">
    <h1>Drinking Buddy</h1>
      <div v-for="recipe in recipes" v-bind:key="recipe.id">
        <h2>{{ recipe.name }}</h2>
        <!-- List Ingredients & AMOUNTS TBD -->
        <ul> 
          <li v-for="ingredient in recipe.ingredients" v-bind:key="ingredient.id"> {{ ingredient.name }}</li>
        </ul>
        <!-- List directions -->
        <h4>Directions: </h4>
        <ol>
          <li v-for="direction in recipe.directions" v-bind:key="direction.id">{{ direction }}</li>
        </ol>
        <router-link v-bind:to="`/recipes/${recipe.id}`">
          <button>See More</button>
        </router-link>
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
  },
};
</script>