<template>
  <div class="recipes-show">
    <section class="bg-account-pages vh-100 mt-3">
        <div class="display-table">
            <div class="display-table-cell">
                <div class="container">
                    <div class="row no-gutters align-items-center">

                        <div class="col-lg-12">
                            <div class="login-box">
                                <div class="row align-items-center no-gutters">
                                    <div class="col-lg-6">
                                        <div class="bg-light">

                                            <div class="row justify-content-center">
                                                <div class="col-lg-10">

                                                    <div
                                                        class="home-img text-center d-none d-lg-inline-block">

                                                        <div class="animation-1"></div>
                                                        <div class="animation-3"></div>


                                                        <img :src="recipe.image" class="img-fluid" alt="">
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div class="col-lg-6">

                                        <div class="row justify-content-center">
                                            <div class="col-lg-11">

                                                <div class="p-4 br-dotted">
                                                    <div class="text-center mt-3">
                                                        <h1 class="text-warning"><b>{{ recipe.name }}</b></h1>
                                                        <img src="/images/home-border.png">
                                                        <div>
                                                          <h2 class="text-info mt-3">Ingredients:</h2>
                                                          <ul> 
                                                              <li v-for="ingredient in recipe.ingredient_lists" v-bind:key="ingredient.id"> {{ ingredient.amount }} {{ ingredient.ingredients }}</li>
                                                            </ul>
                                                        </div>
                                                        <div>
                                                          <h2 class="text-info">Directions: </h2>
                                                          <p>{{recipe.directions}}</p>
                                                        </div>
                                                         <!-- Tags list -->
                                                        <ul id ="tags"> 
                                                          <li v-for="tag in recipe.tags" v-bind:key="tag.id"> {{ tag.name }} </li>
                                                        </ul>
                                                        <!-- Favorite  -->
                                                        <button v-on:click="addToFavorites(recipe)" class="btn-primary">Add to Favorites</button>
                                                        <router-link v-bind:to="`/recipes`">
                                                          <button class="btn-primary ml-3">Back to All Recipes</button>
                                                        </router-link>
                                                        <p>TEST</p>
                                                        <p v-if="recipe.favorited">YAY!</p>
                                                        <p v-else>Boo!</p>
                                                    </div>
                                                    <div class="p-3 custom-form">
  
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>



                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
        </div>
    </section>
    <!-- end account-pages  -->

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
      });
    },
    isFavorited: function () {
      if (this.recipe.favorited == true) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>