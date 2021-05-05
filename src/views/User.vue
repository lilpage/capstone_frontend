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
        <div class="text-light mt-3"><ul>
          <h2><b>You can make:</b></h2>
          <div v-if="display_rn">
          <router-link v-bind:to="`/recipes/1`">
            <li><h2 class="text-light">Rusty Nail</h2></li>
            </router-link>
          </div>
          <div v-if="display_rr">
            <router-link v-bind:to="`/recipes/2`">
            <li><h2 class="text-light">Rob Roy</h2></li>
            </router-link>
          </div>
          <div v-if="display_bd">
            <router-link v-bind:to="`/recipes/3`">
            <li><h2 class="text-light">Brown Derby</h2></li>
            </router-link>
          </div>
          <div v-if="display_mj">
            <router-link v-bind:to="`/recipes/4`">
            <li><h2 class="text-light">Mint Julep</h2></li>
            </router-link>
          </div>
          <div v-if="display_moj">
            <router-link v-bind:to="`/recipes/5`">
            <li><h2 class="text-light">Mojito</h2></li>
            </router-link>
          </div>
          <div v-if="display_mt">
            <router-link v-bind:to="`/recipes/6`">
            <li><h2 class="text-light">Mai Tai</h2></li>
            </router-link>
          </div>
          <div v-if="display_gt">
            <router-link v-bind:to="`/recipes/7`">
            <li><h2 class="text-light">Gin & Tonic</h2></li>
            </router-link>
          </div>
          <div v-if="display_pl">
            <router-link v-bind:to="`/recipes/8`">
            <li><h2 class="text-light">Pink Lady</h2></li>
            </router-link>
          </div>
          <div v-if="display_mm">
            <router-link v-bind:to="`/recipes/9`">
            <li><h2 class="text-light">Moscow Mule</h2></li>
            </router-link>
          </div>
          <div v-if="display_pc">
            <router-link v-bind:to="`/recipes/10`">
            <li><h2 class="text-light">Pimm's Cup</h2></li>
            </router-link>
          </div>
        </ul></div>
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
      // Display Recipe Booleans
      display_rn: false,
      display_rr: false,
      display_bd: false,
      display_mj: false,
      display_moj: false,
      display_mt: false,
      display_gt: false,
      display_pl: false,
      display_mm: false,
      display_pc: false,
    };
  },
  created: function () {
    this.favoritesIndex();
    this.userShow();
    this.fridgeIndex();
    this.fridgeArray();
    this.indexPossibleRecipes();
  },
  mounted: function () {},
  methods: {
    // User Methods
    userShow: function () {
      axios.get("/api/users").then((response) => {
        // console.log(response.data);
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
        // console.log(response.data);
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
        // console.log(response.data);
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
        this.displayRN();
        this.displayRR();
        this.displayBD();
        this.displayMJ();
        this.displayMJ();
        this.displayMOJ();
        this.displayMT();
        this.displayGT();
        this.displayPL();
        this.displayMM();
        this.displayPC();
      });
    },
    // A travesty:
    displayRN: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(
          this.rustynail.ingredient_lists[0]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.rustynail.ingredient_lists[1]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.rustynail.ingredient_lists[2]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_rn = true;
      }
    },
    displayRR: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(this.robroy.ingredient_lists[0]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.robroy.ingredient_lists[1]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.robroy.ingredient_lists[2]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.robroy.ingredient_lists[3]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_rr = true;
      }
    },
    displayBD: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(
          this.brownderby.ingredient_lists[0]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.brownderby.ingredient_lists[1]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.brownderby.ingredient_lists[2]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.brownderby.ingredient_lists[3]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_bd = true;
      }
    },
    displayMJ: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(
          this.mintjulep.ingredient_lists[0]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.mintjulep.ingredient_lists[1]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.mintjulep.ingredient_lists[2]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.mintjulep.ingredient_lists[3]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_mj = true;
      }
    },
    displayMOJ: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(this.mojito.ingredient_lists[0]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.mojito.ingredient_lists[1]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.mojito.ingredient_lists[2]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.mojito.ingredient_lists[3]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.mojito.ingredient_lists[4]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.mojito.ingredient_lists[5]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.mojito.ingredient_lists[6]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_moj = true;
      }
    },
    displayMT: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(this.maitai.ingredient_lists[0]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.maitai.ingredient_lists[1]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.maitai.ingredient_lists[2]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.maitai.ingredient_lists[3]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.maitai.ingredient_lists[4]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(this.maitai.ingredient_lists[5]["ingredient_id"])
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_mt = true;
      }
    },
    displayGT: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(
          this.gintonic.ingredient_lists[0]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.gintonic.ingredient_lists[1]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.gintonic.ingredient_lists[2]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_gt = true;
      }
    },
    displayPL: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(
          this.pinklady.ingredient_lists[0]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pinklady.ingredient_lists[1]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pinklady.ingredient_lists[2]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pinklady.ingredient_lists[3]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pinklady.ingredient_lists[4]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pinklady.ingredient_lists[5]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_pl = true;
      }
    },
    displayMM: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(
          this.moscowmule.ingredient_lists[0]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.moscowmule.ingredient_lists[1]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.moscowmule.ingredient_lists[2]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.moscowmule.ingredient_lists[3]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.moscowmule.ingredient_lists[4]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_mm = true;
      }
    },
    displayPC: function () {
      var fridge_array = [];
      var checker = true;
      this.fridge_id_array.map(function (x) {
        fridge_array.push(x.ingredient_id);
      });

      if (
        fridge_array.includes(
          this.pimmscup.ingredient_lists[0]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pimmscup.ingredient_lists[1]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pimmscup.ingredient_lists[2]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pimmscup.ingredient_lists[3]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pimmscup.ingredient_lists[4]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pimmscup.ingredient_lists[5]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      if (
        fridge_array.includes(
          this.pimmscup.ingredient_lists[6]["ingredient_id"]
        )
      ) {
        console.log(true);
      } else {
        checker = false;
      }
      // FINAL CHECK
      if (checker) {
        this.display_pc = true;
      }
    },
  },
};
</script>