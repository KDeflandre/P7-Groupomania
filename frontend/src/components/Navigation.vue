<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/Groupomania-ok.png" id="logo" alt="Logo de l'entreprise groupomania" title="logo groupomania" /></router-link>
      </div>
      <div class="nav-links">
        <button class="onPage2" > Accueil
        <router-link class="header" :to="{ name: 'Home' }"> </router-link>
        </button>
        <button class="logout" v-if="$store.getters.isLogged" @click="signOut">Se déconnecter </button>
          
      </div>
    </nav>
 
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: "Navigation",
  data() {
    return {
      userData: "",
      firstName: "",
      lastName: "",
      role: "",
      showModal: false,
    };
  },
  mounted() {
    this.getUser();
  },
  computed: {
    connected() {
      return this.currentUser;
    },
  },
  methods: {
    // deconnexion
    signOut() {
      this.$store.dispatch("logout")
    },
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },

    getUser() {
      //Récup user in localstorage
      const userId = localStorage.getItem("userId");
      if (userId) {
        axios
          .get("http://localhost:3000/api/users/" + userId, { 
            headers: { 
              Authorization: `Bearer ${this.$store.getters.getToken}` },
              })
          .then((response) => {
            this.userData = response.data;
            this.firstName = response.data.firstName;
            this.lastName = response.data.lastName;
            this.email = response.data.email;
            this.role = response.data.role;
            localStorage.setItem("role", response.data.role);

            console.log("response getUser");
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
<style scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}
a.header {
  width: 500px;
}
header .link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
}
header .link:hover {
  color: #1eb8b8;
}
header nav {
  display: flex;
  padding: 20px 0;
}
header nav .branding {
  display: flex;
  align-items: center;
  width: auto;
  height: auto ;
}
header nav .branding .header {
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
}
#logo {
  width: 300px;
}

button.logout {
  margin-left: 10px;
}

header nav .nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}
@media (max-width: 750px) {
  header nav .nav-links {
    padding-right: 50px;
  }
}
header nav .nav-links ul {
  margin-right: 30px;
}
header nav .nav-links ul .link {
  margin-right: 30px;
}
header nav .nav-links ul .link:last-child {
  margin-right: 0;
}
header nav .nav-links .profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
  user-select: none;
}


</style>