<template>
  <div class="user">
    <h6>This is your user page</h6>
    <h1>Favorites</h1> 
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <p>{{ favorite }}</p>
      <button v-on:click="favoritesDestroy(favorite)" >Remove</button>
    </div>
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
    // hasAdminAccess: function () {
    //   if (this.current_user.admin === true) {
    //     return true;
    //   }
    // },
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