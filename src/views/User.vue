<template>
  <div class="user">
    <section class="section bg-warning bg-userpage mt-5" id="services">
    <div class="container">

        <div class="row">
            <div class="col-lg-12">
                <div class="title-box text-center">
                    <h1 class="user-greeting text-light"><b>Hello {{ this.current_user.user.name}}</b></h1>
                    <p class="text-light mb-3">Your Fridge | Account Management</p>
                </div>
            </div>
        </div>
      </div>
    </section>


    <!-- Recipes Start -->
    <section class="section bg-favorites">
      <div>
        <div id= "user-recipes" class="container">
          <h2 class="text-light"><b>Your Favorited Recipes</b></h2>
 

          <!-- Empty Favorties Array -->
          <div v-if="this.favorites.length === 0">
            <p>You don't like anything yet! Go looking?</p>
          </div>
          <div v-else>
            <div class="row">
              <div class="col-lg-4" v-for="favorite in favorites" v-bind:key="favorite.id">
                    <div class="services-box bg-light p-4 mt-4">
                        <img :src="favorite.image" width="300">
                        <h5 class="mt-4">{{ favorite.name }}</h5>
                        <div class="mt-3">
                            <router-link v-bind:to="`/recipes/${favorite.recipe_id}`" class="btn btn-primary mr-3">Full Recipe</router-link>
                            <button v-on:click="favoritesDestroy(favorite)" class="btn btn-primary mr-3">Remove</button>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
          <!-- Recipes Cards End-->
        </div>
      </div>
    </section>



    <!-- Fridge Start -->
    <section class="section bg-fridge">
      <div id="user-fridge" class="container">
        <h2 class="pt-4 mt-4 text-light"><b>Your Fridge</b></h2> 

        <!-- Add to Fridge -->
        <label for="add-to-fridge">Add to Fridge</label>
        <input type="text" id="add-to-fridge" v-model="ingredient_id" placeholder="ingredient id...">
        <button v-on:click="fridgeAdd()">Add</button>

        <!-- Empty Fridge -->
        <div v-if="this.fridges.length === 0">
          <p>Your fridge is empty! Add something?</p>
        </div>

        <!-- Display Fridge -->
        <div v-else>
          <div v-for="fridge in fridges" v-bind:key="fridge.id">  
            <ul class="list-group">
              <li class="list-group-item list-group-item-light">
                <p> {{ fridge.ingredient }} </p>
                <button v-if="fridge.in_stock" v-on:click="fridgeUpdate(fridge)" class="btn btn-primary mr-3">Out of Stock</button>
                <button v-else v-on:click="fridgeUpdate(fridge)" class="btn btn-primary mr-3">In Stock</button>
                <button v-if="!fridge.in_stock" v-on:click="fridgeRemove(fridge)" class="btn btn-primary mr-3">Remove</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- You Can Make List -->
        <h2 class="text-light mt-3"><b>You can make:</b></h2>
          <!-- v-for of recipes -->
         <!-- <div v-for="recipe in recipes" v-bind:key="recipe.id">
           <h3>{{recipe.name}}</h3>
           <div v-for="ingredient in recipe.ingredient_lists" v-bind:key="ingredient.id"> 
             {{ ingredient.ingredient_id }}
             
           </div>
         </div> -->

         <h1>FRIDGE</h1>
         {{fridge_id_array}}
        <h2>TESTING</h2>
        {{ rustynail.ingredient_lists }}
        {{ pinklady.ingredient_lists }}
        {{ maitai.ingredient_lists }}
        {{ robroy.ingredient_lists }}
      
      </div>
    <!-- Fridge End -->
    </section>



    <!-- ACCOUNT MANAGEMENT -->

    <!-- Delete Account -->
    <div class="container mt-3 mb-3">
      <h2 class="text-info">Account Management</h2>
      <button v-on:click="userDestroy()" class="btn btn-primary mt-3 mb-3">Delete account</button>

        <!-- ADMIN ONLY -->
        <div id="admin-access" v-if="this.current_user.user.admin">
          <router-link to="/admin/recipes/edit">
          <button class="btn btn-primary mb-3">Edit Recipes</button>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      favorites: [],
      fridges: [],
      current_user: {},
      ingredient_id: "",
      recipes: [],
      possible_recipes: [],
      fridge_id_array: [],
      // Recipes
      rustynail: {},
      robroy: {},
      brownderby: {},
      mintjulep: {},
      mojito: {},
      maitai: {},
      gintonic: {},
      pinklady: {},
      moscowmule: {},
      pimmscup: {},
    };
  },
  created: function () {
    this.favoritesIndex();
    this.userShow();
    this.fridgeIndex();
    this.fridgeArray();
  },
  mounted: function () {
    this.indexPossibleRecipes();
  },
  methods: {
    // User Methods
    userShow: function () {
      axios.get("/api/users").then((response) => {
        console.log(response.data);
        this.current_user = response.data;
      });
    },
    userDestroy: function () {
      if (confirm("Are you sure?")) {
        axios.delete("/api/users/" + this.current_user.user.id).then(() => {
          console.log("User deleted.");
          this.$router.push("/");
        });
      }
    },

    // Favorite Methods
    favoritesIndex: function () {
      axios.get("/api/favorites").then((response) => {
        console.log(response.data);
        this.favorites = response.data;
      });
    },
    favoritesDestroy: function (favorite) {
      axios.delete("/api/favorites/" + favorite.id).then(() => {
        console.log("Successfully deleted");
        this.favorites.splice(this.favorites.indexOf(favorite), 1);
      });
    },

    // Fridge Methods
    fridgeIndex: function () {
      axios.get("/api/fridges").then((response) => {
        console.log(response.data);
        this.fridges = response.data;
      });
    },
    fridgeAdd: function () {
      let params = {
        ingredient_id: this.ingredient_id,
        user_id: localStorage.getItem("user_id"),
      };
      axios.post("/api/fridges", params).then((response) => {
        console.log(response.data);
      });
    },
    fridgeUpdate: function (fridge) {
      axios.patch("/api/fridges/" + fridge.id).then((response) => {
        console.log(response.data); // This should update the item on the page
      });
    },
    fridgeRemove: function (fridge) {
      axios.delete("/api/fridges/" + fridge.id).then(() => {
        console.log("Deleted!");
        this.fridges.splice(this.fridges.indexOf(fridge), 1);
      });
    },

    // You Can Make Methods
    fridgeArray: function () {
      axios.get("/api/fridges/array").then((response) => {
        this.fridge_id_array = response.data;
        console.log(response.data);
      });
    },
    indexPossibleRecipes: function () {
      axios.get("/api/recipes/array").then((response) => {
        console.log(response.data);
        this.rustynail = response.data[0];
        this.robroy = response.data[1];
        this.brownderby = response.data[2];
        this.mintjulep = response.data[3];
        this.mojito = response.data[4];
        this.maitai = response.data[5];
        this.gintonic = response.data[6];
        this.pinklady = response.data[7];
        this.moscowmule = response.data[8];
        this.pimmscup = response.data[9];
      });
    },
  },
};
</script>