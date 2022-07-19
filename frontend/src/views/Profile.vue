<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalPost="modalPost" v-on:close-modal="closeModal" />
    <div class="container">
      <h2>Options du compte</h2>
      <div class="profile-info">
        <div class="poubelle" @click="deleteUser"></div>
        <div class="initials">{{ userInitials }}</div>
        <div v-if="role == 'Administrateur'" class="admin-badge">
          <!-- <AdminIcon class="icon" /> -->
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">Prenom:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Nom:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input disabled">
          <label for="username">Email:</label>
          <input type="text" id="username" v-model="email" />
        </div>
        <button @click="updateProfile">Sauvegarder</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//COMPONENTS
import Modal from "../components/Modal.vue";
//ICONS
// import AdminIcon from "../assets/Icons/user-crown-light.svg";
// import Trash from "../assets/Icons/delete_forever.svg";
export default {
  name: "Profile",
  components: {
    Modal
  },
  data() {
    return {
      modalPost: "Changement effectué!",
      modalActive: null,,
      userData: "",
      userInitials: "",
      //On pré-remplit les inputs avec les info de l'user
      firstName: "",
      lastName: "",
      role: "",
      email: "",
    };
  },
  mounted() {
    this.getUser();
    this.role = localStorage.getItem("role");
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      if (this.modalPost == "Le compte a bien été supprimé !") {
        this.$router.push({ name: "PostPage" });
      }
      window.location.reload(true);
    },
    updateProfile() {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");
      axios
        .put(
          "http://localhost:3000/api/users/" + userId,
          {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.username,
          },
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.modalActive = !this.modalActive; //On active la modal
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUser() {
      //Récupération de notre user dans le localstorage
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/users/" + userId, {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then((response) => {
          this.userData = response.data;
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.email = response.data.email;
          console.log(response.data);
        })
        //Recupération des initiales de l'user
        .then(() => {
          let name = `${this.firstName} ${this.lastName}`;
          let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
          let initials = [...name.matchAll(rgx)] || [];
          this.userInitials = ((initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")).toUpperCase();
        })
        .catch((err) => console.log(err));
    },
    //DELETE USER
    deleteUser() {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");
      axios
        .delete("http://localhost:3000/api/users/" + userId, {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then((response) => {
          localStorage.clear();
          this.modalPost = response.data.modalPost; //On recup le message du back
          this.modalActive = !this.modalActive; //On active la modal
          console.log(response.data.post);
        });
    },
  },
};
</script>
<style>
.profile .container {
  max-width: 1000px;
  padding: 60px 25px;
}
.profile .container h2 {
  text-align: center;
  margin-bottom: 16px;
  font-weight: 300;
  font-size: 32px;
}
.profile .container .profile-info {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 32px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 32px auto;
  position: relative;
}
.profile .container .profile-info .initials {
  position: initial;
  width: 80px;
  height: 80px;
  font-size: 32px;
  background-color: #303030;
  color: #fff;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.profile .container .profile-info .admin-badge {
  display: flex;
  align-self: center;
  color: #fff;
  font-size: 14px;
  padding: 8px 24px;
  border-radius: 8px;
  background-color: #303030;
  margin: 16px 0;
  text-align: center;
  text-transform: capitalize;
}
.profile .container .profile-info .admin-badge .icon {
  width: 14px;
  height: auto;
  margin-right: 8px;
}
.profile .container .profile-info .input {
  margin: 16px 0;
}
.profile .container .profile-info .input label {
  font-size: 14px;
  display: block;
  padding-bottom: 6px;
}
.profile .container .profile-info .input input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 8px;
  height: 50px;
}
.profile .container .profile-info .input input:focus {
  outline: none;
}
.profile .container .profile-info button {
  align-self: center;
}
.trash-delete {
  fill: #303030;
}
.trash-delete:hover {
  cursor: pointer;
  fill: rgba(48, 48, 48, 0.7);
}
.poubelle {
  position: absolute;
  right: 3px;
  bottom: 0;
}
.disabled {
  pointer-events: none;
  filter: brightness(95%);
}
</style>