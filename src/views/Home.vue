<template>
  <div class="home">

    <section class="bg-home bg-primary" id="home">
        <div class="home-center">
            <div class="home-desc-center">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="home-content">
                                <h1 id="greeting-message">You <br> deserve <br> a drink</h1>
                                <p class="text-muted mt-4 f-20"></p>
                                <div class="mt-4 pt-2">
                                    <a href="/recipes" class="btn btn-primary mr-3">Get drinking</a>
                                    <router-link v-bind:to="`/recipes/${path}`" class="btn btn-primary mr-3">I can't decide!</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="home-img">

                                <div class="animation-1"></div>
                                <div class="animation-2"></div>
                                <div class="animation-3"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<style>
.home h1 {
  font-size: 60px;
  top: 200px;
  width: 100%;
}
</style>

<script>
export default {
  data: function () {
    return {
      path: this.getRandomInt(10),
    };
  },
  methods: {
    getRandomInt: function (max) {
      return Math.floor(Math.random() * max);
    },
  },
};
</script>
