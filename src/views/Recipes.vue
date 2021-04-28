<template>
  <div class="recipes">
    <section class="section bg-primary bg-features mt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="text-center">
                        <h1 class="text-light mt-4"><b>Browse All Recipes</b></h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section bg-services">
      <div id= "user-recipes" class="container">
        <!-- Recipes Cards -->  
        <div class="row">
            <div class="col-lg-4" v-for="recipe in recipes" v-bind:key="recipe.id">
                <div class="services-box p-4 mt-4">
                  <img src="https://images.unsplash.com/photo-1554219962-f71d858fa121?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" width=300px>
                  <h2 class="text-warning mt-3 mb-3"><b>{{ recipe.name }}</b></h2>
                    <router-link v-bind:to="`/recipes/${recipe.id}`">
                      <button class="btn-info mr-3">See More</button>
                    </router-link>
                    <!-- Button for action -->
                    <button v-on:click="addToFavorites(recipe)" class="btn-info">Favorite</button>
                </div>
            </div>
        </div>
        <!-- Cards Ends -->
        
      </div>
    </section>
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