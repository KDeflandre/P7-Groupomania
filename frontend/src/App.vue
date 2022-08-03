<template>
  <div class="app-wrapper">
    <div id="app">
      <!--Ne s'affichera que si la data nav est à false -->
      <Navigation v-if="!navigation" />
      <router-view />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "app",
  components: { Navigation, Footer },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    this.checkRoute();
  },
  mounted() { },
  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "SignUp") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  /* display: flex;
  flex-direction: column; */
  min-height: 100vh;
  width: 100%;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  color: #fff;
  width: 12px;
}

.arrow path {
  fill: #000;
}

.arrow-light path {
  fill: #303030;
}

/* BUTTON */
button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #FD2D01;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

button:focus,
.router-button:focus {
  outline: none;
}

button:hover,
.router-button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>
