<template>
  <div class="user">
    <section class="section bg-services mt-4" id="services">
    <div class="container">

        <div class="row">
            <div class="col-lg-12">
                <div class="title-box text-center">
                    <h1 class="user-greeting text-warning"><b>Hello {{ this.current_user.user.name}}</b></h1>
                </div>
            </div>
        </div>
        <!-- Recipes Start -->
        <div id= "user-recipes" class="container">
          <h2 class="text-info">Your Favorited Recipes</h2>
          <!-- Recipes Cards -->  
          <div class="row">
              <div class="col-lg-4" v-for="favorite in favorites" v-bind:key="favorite.id">
                  <div class="services-box p-4 mt-4">
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
        <!-- Recipes End -->
        <!-- Fridge Start -->
        <div id="user-fridge">
          <h2 class="pt-4 mt-4 text-info">Your Fridge</h2> 
          <!-- Ingredient List -->
          <div v-for="fridge in fridges" v-bind:key="fridge.id">  
            <ul class="list-group">
              <li class="list-group-item list-group-item-primary">
                <p> {{ fridge.ingredient }} </p>
                <button v-if="fridge.in_stock" v-on:click="fridgeUpdate(fridge)" class="btn btn-primary mr-3">Out of Stock</button>
                <button v-else v-on:click="fridgeUpdate(fridge)" class="btn btn-primary mr-3">In Stock</button>
                <button v-if="!fridge.in_stock" v-on:click="fridgeRemove(fridge)" class="btn btn-primary mr-3">Remove</button>
              </li>
            </ul>
          </div>
        </div>
        <!-- Fridge End -->
      </div>
    </section>
    <!-- ACCOUNT MANAGEMENT -->
    <!-- Delete Account -->
    <div class="container">
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
    };
  },
  created: function () {
    this.favoritesIndex();
    this.userShow();
    this.fridgeIndex();
  },
  methods: {
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
    fridgeIndex: function () {
      axios.get("/api/fridges").then((response) => {
        console.log(response.data);
        this.fridges = response.data;
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
  },
};
</script>