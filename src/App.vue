<template>
  <div id="app">
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark">
        <div class="container">
            <!-- LOGO -->
            <a  href="/">
                <h1 id="db-logo">Drinking Buddy</h1>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <i class="mdi mdi-menu"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto navbar-center" id="mySidenav">

                    <li class="nav-item">
                        <a href="/recipes" class="nav-link smoothlink">All Drinks</a>
                    </li>
                    <li class="nav-item">
                        <router-link v-bind:to="`/recipes/${path}`" class="nav-link smoothlink">Roll the Dice</router-link>
                    </li>
                    <li class="nav-item" v-if="isLoggedIn()">
                        <a href="/user" class="nav-link smoothlink">My Profile</a>
                    </li>
                </ul>

                <ul class="navbar-nav navbar-center">
                    <li class="nav-item" v-if="!isLoggedIn()">
                        <a href="/login" class="nav-link">Log In</a>
                    </li>
                    <li class="nav-item" v-else>
                        <a href="/logout" class="nav-link">Log Out</a>
                    </li>
                    <li class="nav-item d-inline-block d-lg-none" v-if="!isLoggedIn()">
                        <a href="/signup" class="nav-link">Sign Up</a>
                    </li>
                </ul>
                <div class="navbar-button d-none d-lg-inline-block" v-if="!isLoggedIn()">
                    <a href="/signup" class="btn btn-sm btn-soft-primary btn-round">Sign Up</a>
                </div>  
            </div>
        </div>
    </nav>
    <router-view />
  <!-- FOOTER -->
      <section class="section bg-light bg-footer pb-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                </div>
                <div class="col-lg-6">
                    <p> <a id="db-logo">Drinking Buddy</a> | made by Lil | 2021</p>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function () {
    return {
      path: this.getRandomInt(9),
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getRandomInt: function (max) {
      return Math.floor(Math.random() * max + 1);
    },
  },
};
</script>
