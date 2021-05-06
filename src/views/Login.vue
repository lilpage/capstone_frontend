<template>
<div id="login">

    <div class="account-home-btn d-none d-sm-block">
        <a href="/" class="text-primary"><i class="mdi mdi-home h1"></i></a>
    </div>

    <section class="bg-login vh-100">
        <div class="display-table">
            <div class="display-table-cell">
                <div class="container">
                    <div class="row no-gutters align-items-center">

                        <div class="col-lg-12">
                            <div class="login-box">
                                <div class="row align-items-center no-gutters">
                                    <div class="col-lg-6">
                                        <div>

                                            <div class="row justify-content-center">
                                                <div class="col-lg-10">

                                                    <div
                                                        class="home-img login-img text-center d-none d-lg-inline-block">

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div class="bg-light col-lg-6">

                                        <div class="row justify-content-center">
                                            <div class="col-lg-11">

                                                <div class="p-4">
                                                    <div class="text-center mt-3">
                                                        <h1 id="db-logo">Welcome back!</h1>
                                                    </div>
                                                    <div class="p-3 custom-form">
                                                        <form v-on:submit.prevent="submit()">
                                                            <ul>
                                                                <li class="text-danger" v-for="error in errors" v-bind:key="error">
                                                                {{ error }}
                                                                </li>
                                                            </ul>
                                                            <div class="form-group">
                                                                <label>Email:</label>
                                                                <input type="email" class="form-control" v-model="email">
                                                            </div>
                                                            <div class="form-group">
                                                                <label>Password:</label>
                                                                <input type="password" class="form-control" v-model="password">
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
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("admin", response.data.admin);
          this.$router.push("/user");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>