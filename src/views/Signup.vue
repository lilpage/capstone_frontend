<template>
  <div id="signup">

    <div class="account-home-btn d-none d-sm-block">
        <a href="index-1.html" class="text-primary"><i class="mdi mdi-home h1"></i></a>
    </div>

    <section class="bg-account-pages vh-100">
        <div class="display-table">
            <div class="display-table-cell">
                <div class="container">
                    <div class="row no-gutters align-items-center">

                        <div class="col-lg-12">
                            <div class="login-box">
                                <div class="row align-items-center no-gutters">
                                    <div class="col-lg-6">
                                        <div class="bg-signup">

                                            <div class="row justify-content-center">
                                                <div class="col-lg-10">

                                                    <div
                                                        class="home-img login-img text-center d-none d-lg-inline-block">

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div class="col-lg-6">

                                        <div class="row justify-content-center">
                                            <div class="col-lg-11">

                                                <div class="p-4">
                                                    <div class="text-center mt-3">
                                                        <h1 id="db-logo">Welcome</h1>
                                                        <h2 id="db-logo">to Drinking Buddy</h2>
                                                   
                                                    </div>
                                                    <div class="p-3 custom-form">
                                                        <form v-on:submit.prevent="submit()">
                                                          <ul>
                                                            <li class="text-danger" v-for="error in errors" v-bind:key="error">
                                                              {{ error }}
                                                            </li>
                                                          </ul>
                                                          <div class="form-group">
                                                            <label>Name:</label> 
                                                            <input type="text" class="form-control" v-model="name">
                                                          </div>
                                                          <div class="form-group">
                                                            <label>Email:</label>
                                                            <input type="email" class="form-control" v-model="email">
                                                          </div>
                                                          <div class="form-group">
                                                            <label>Password:</label>
                                                            <input type="password" class="form-control" v-model="password">
                                                          </div>
                                                          <div class="form-group">
                                                            <label>Password confirmation:</label>
                                                            <input type="password" class="form-control" v-model="passwordConfirmation">
                                                          </div>
                                                          <input type="submit" class="btn btn-primary" value="Submit">
                                                        </form>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
        </div>
    </section>
</div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>