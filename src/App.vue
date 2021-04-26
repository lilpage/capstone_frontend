<template>
  <div id="app">
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark">
        <div class="container">
            <!-- LOGO -->
            <a class="navbar-brand logo text-uppercase" href="/">
                <p id="db-logo">Drinking Buddy</p>
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
                <div class="col-lg-4">
                    <div class="footer-info mt-4">
                        <p id="db-logo">Drinking Buddy</p>
                        <!-- <div class="team-social mt-4 pt-2">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item">
                                    <a href="" class="text-reset"><i class="mdi mdi-facebook"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="" class="text-reset"><i class="mdi mdi-twitter"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="" class="text-reset"><i class="mdi mdi-google"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="" class="text-reset"><i class="mdi mdi-pinterest"></i></a>
                                </li>
                            </ul>
                        </div> -->

                    </div>
                </div>

                <!-- <div class="col-lg-4">
                    <div class="row  pl-0 md-lg-5">
                        <div class="col-lg-6">
                            <div class="mt-4">
                                <h5 class="f-20">Services</h5>
                                <ul class="list-unstyled footer-link mt-3">
                                    <li><a href="">Web Design</a></li>
                                    <li><a href="">Lorem Test</a></li>
                                    <li><a href="">Credit</a></li>
                                    <li><a href="">Ui Design</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mt-4">
                                <h5 class="f-20">Company</h5>
                                <ul class="list-unstyled footer-link mt-3">
                                    <li><a href="">Features</a></li>
                                    <li><a href="">Faq</a></li>
                                    <li><a href="">Contact us</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="mt-4">
                        <h5 class="f-20">Subscribe</h5>

                        <div class="subscribe mt-4 pt-1">
                            <form action="#">
                                <input placeholder="Enter Email" type="text">
                                <button type="submit" class="btn btn-primary"><i class="mdi mdi-send"></i></button>
                            </form>
                        </div>
                    </div>
                </div> -->

            </div>

            <hr class="my-5">

            <div class="row">
                <div class="col-12">
                    <div class="text-center">
                        <p class="text-muted mb-0">This is the copyright line</p>
                    </div>
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
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>
