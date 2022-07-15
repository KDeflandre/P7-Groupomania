<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/Groupomania-ok.png" id="logo" alt="Logo de l'entreprise groupomania" title="logo groupomania" /></router-link>
      </div>
      <div class="nav-links">
        <button> 
            <router-link class="link" :to="{ name: 'PostPage' }">Créer une publication</router-link>
            </button>
          <router-link v-if="!userData" class="link" :to="{ name: 'Home' }">Se déconnecter</router-link>
       
        <div v-if="userData" @click="toggleProfileMenu" class="profile" ref="profile">
          <span>{{ userInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ userInitials }}</p>
              <div class="right">
                <p>{{ firstName }} {{ lastName }}</p>
                <p>{{ email }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <p>Profile</p>
                </router-link>
              </div>
            </div>
            <div v-if="role == 'Administrateur'" class="options">
              <div class="option">
                <router-link class="option" to="/admin">
                  <p>Admin</p>
                </router-link>
              </div>
            </div>
            <div class="options">
              <div @click="signOut" class="option">
                <!-- < class="icon" /> ajouter icon pour signOut -->
                <p>Déconnexion</p>
              </div>
            </div>
          </div>
        </div>
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
      userInitials: "",
      // input user
      firstName: "",
      lastName: "",
      role: "",
      profileMenu: null,
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
      sessionStorage.clear();
      location.href = "/";
    },
    
    getUser() {
      //Récup user in session storage
      const userId = sessionStorage.getItem("userId");
      const userToken = sessionStorage.getItem("token");
      if (userId) {
        axios
          .get("http://localhost:3000/api/users/" + userId, { headers: { Authorization: "Bearer " + localStorage.getItem('token') },})
          .then((response) => {
            this.userData = response.data;
            this.firstName = response.data.firstName;
            this.lastName = response.data.lastName;
            this.email = response.data.email;
            this.role = response.data.role;
            sessionStorage.setItem("role", response.data.role);
            console.log("response getUser");
            console.log(response.data);
          })
          //Recup des initiales de l'user
          .then(() => {
            let name = `${this.firstName} ${this.lastName}`;
            let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
            let initials = [...name.matchAll(rgx)] || [];
            this.userInitials = ((initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")).toUpperCase();
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
}
header nav .branding .header {
  width: 200px;
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