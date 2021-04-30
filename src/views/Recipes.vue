<template>
  <div class="recipes">
    <section class="section bg-info bg-features mt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="text-center">
                        <h1 class="user-greeting mt-4 text-light"><b>Browse All Recipes</b></h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section-index bg-services">
      <div id= "user-recipes" class="container">
        <!-- Recipes Cards -->  
        <div class="row">
            <div class="col-lg-4" v-for="recipe in recipes" v-bind:key="recipe.id">
                <div class="services-box bg-danger p-4 mt-4">
                  <h2 class="text-warning mt-3 mb-3  bg-danger pt-3 pb-3 text-center" id="recipe-title"><b>{{ recipe.name }}</b></h2>
                  <img v-bind:src="recipe.image" width=300px><br>
                    <router-link v-bind:to="`/recipes/${recipe.id}`">
                      <button class="btn btn-danger mr-3 mt-3">See More</button>
                    </router-link>
                    <!-- Button for action -->
                    <button v-on:click="addToFavorites(recipe)" class="btn btn-warning mr-3 mt-3">Favorite</button>
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