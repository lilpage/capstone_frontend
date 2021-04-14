<template>
  <div class="user">
    <h1>Hello {{ this.current_user.user.name}}</h1>
    <h6>This is your user page</h6>
    <h1>Favorites</h1> 
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <p>{{ favorite.name }}</p>
      <button v-on:click="favoritesDestroy(favorite)" >Remove</button>
    </div>
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
      current_user: {},
    };
  },
  created: function () {
    this.favoritesIndex();
    this.userShow();
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
  },
};
</script>