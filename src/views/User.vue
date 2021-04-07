<template>
  <div class="user">
    <h1>This is your user page</h1>
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <p>{{ favorite }}</p>
      <button>Remove</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      favorites: [],
    };
  },
  created: function () {
    this.favoritesShow();
  },
  methods: {
    favoritesShow: function () {
      axios.get("/api/favorites").then((response) => {
        console.log(response.data);
        this.favorites = response.data;
      });
    },
  },
};
</script>