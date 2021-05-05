<template>
<!-- Admin access -->
  <div id="admin-edit" v-if="this.current_user.user.admin">
    <!-- Banner -->
    <section class="section bg-danger bg-userpage mt-5" id="banner">
      <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="title-box text-center">
                    <h1 class="user-greeting text-light"><b>Admin Edit page</b></h1>
                </div>
            </div>
        </div>
      </div>
    </section>
    <!-- Create Recipe -->
    <section class="section bg-create-recipe">
      <div class="container text-light">
      <h2><b>Add Recipe</b></h2>
        <form>
          <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Recipe Name" v-model="name">
          </div>

          <div class="form-group">
              <label for="directions">Directions</label>
              <input type="text" class="form-control" id="directions" placeholder="Enter directions..." v-model="directions">
          </div>

          <div class="form-group">
              <label for="image">Image</label>
              <input type="text" class="form-control" id="image" placeholder="Enter image url" v-model="image">
          </div>

          <div class="mt-3">
              <button v-on:click="recipeCreate()" class="btn btn-danger btn-block">Create</button>
          </div>
        </form>
      </div>
    </section>
    <!-- List Recipes -->
    <section class="section bg-admin-recipes">
      <div class="container">
        <h2><b>All Recipes</b></h2>
        <div class="row">
          <div class="col-lg-4" v-for="recipe in recipes" v-bind:key="recipe.id">
            <!-- Recipes Cards -->
            <div class="services-box p-4 mt-4 bg-light"> 
              <h2>{{ recipe.name }}</h2>
              <img :src="recipe.image" width="300px">
              <!-- List Ingredients -->
              <ul> 
                <li v-for="ingredient in recipe.ingredient_lists" v-bind:key="ingredient.id"> {{ ingredient.amount }} {{ ingredient.ingredients }}</li>
              </ul>
              <!-- List directions -->
              <h4>Directions: </h4>
              {{ recipe.directions }}
              <br>
              <button v-on:click="recipeShow(recipe)">Edit</button>
              <!-- Delete Recipe -->
              <button v-on:click="recipeDestroy(recipe)">Delete</button>
            </div>
              <!-- Update Recipe Modal -->
              <dialog id="recipe-info">
                <form method="dialog">
                  <h3>{{ currentRecipe.name }}</h3><br>
                  Name: <input type="text" v-model="currentRecipe.name"> <br>
                  Directions: <input type="text" v-model="currentRecipe.directions"> <br>
                  Image Url: <input type="text" v-model="currentRecipe.image"> <br>
                  <button v-on:click="recipeUpdate(currentRecipe)">Update</button><br> 
                  INGREDIENTS<br>
                  <ul> 
                    <li v-for="ingredient in currentRecipe.ingredient_lists" v-bind:key="ingredient.id">
                      {{ ingredient.amount }} {{ ingredient.ingredients }}
                      <button v-on:click="ingredientsDestroy(ingredient)">Remove</button>
                    </li>
                  </ul>
                  Ingredient Id:<input type="text" v-model="ingredient_id"><br>
                  Amount:<input type="text" v-model="amount"><br>
                  <button v-on:click="ingredientsCreate(currentRecipe)">Add Ingredient</button><br>
                  <button>Close</button>
                </form>
              </dialog>
          </div>
        </div> 
      </div>
    </section>
  </div>
  <!-- Admin denied -->
  <div v-else>
    <!-- router to 404 page -->
  </div>
</template> 

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipes: [],
      current_user: {},
      name: "",
      directions: [],
      image: "",
      errors: [],
      currentRecipe: {},
      ingredient_id: "",
      ammount: "",
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
    recipeUpdate: function (currentRecipe) {
      var params = {
        name: currentRecipe.name,
        directions: currentRecipe.directions,
        image: currentRecipe.image,
      };
      axios
        .patch("/api/recipes/" + currentRecipe.id, params)
        .then((response) => {
          console.log(response.data);
        });
    },
    recipeCreate: function () {
      var params = {
        name: this.name,
        directions: this.directions,
        image: this.image,
      };
      axios
        .post("/api/recipes", params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    recipeShow: function (recipe) {
      this.currentRecipe = recipe;
      document.querySelector("#recipe-info").showModal();
    },
    ingredientsCreate: function (currentRecipe) {
      var params = {
        ingredient_id: this.ingredient_id,
        recipe_id: currentRecipe.id,
        amount: this.amount,
      };
      axios
        .post("/api/ingredientlists", params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    ingredientsDestroy: function (ingredient) {
      if (confirm("Are you sure?")) {
        axios.delete("/api/ingredientlists/" + ingredient.id).then(() => {
          console.log("Successfully deleted");
        });
      }
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