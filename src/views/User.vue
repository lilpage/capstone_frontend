<template>
  <div class="user">
    <h1>Hello {{ this.current_user.user.name}}</h1>
    <!-- Your Favorited Recipes -->
    <h2>Your Recipes</h2> 
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <p>{{ favorite.name }}</p>
      <button v-on:click="favoritesDestroy(favorite)" >Remove</button>
    </div>
    <!-- Your Fridge -->
    <div id="fridge">
      <h2>Your Fridge </h2>
      <div v-for="fridge in fridges" v-bind:key="fridge.id">
        <p> {{ fridge.ingredient }} </p>
        <button v-if="fridge.in_stock" v-on:click="fridgeUpdate(fridge)">Out of Stock</button>
        <button v-else v-on:click="fridgeUpdate(fridge)">In Stock</button>
        <button v-if="!fridge.in_stock" v-on:click="fridgeRemove(fridge)">Remove</button>
      </div>
    </div>
    <!-- Delete Account -->
    <button v-on:click="userDestroy()">Delete account</button>
      <!-- ADMIN ONLY -->
      <div id="admin-access" v-if="this.current_user.user.admin">
        <router-link to="/admin/recipes/edit">
        <button>Edit Recipes</button>
        </router-link>
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