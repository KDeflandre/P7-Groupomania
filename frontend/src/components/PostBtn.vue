<template>
  <div class="container">
    <CreatePost v-if="modalActive" v-on:close-modal="closeModal" />
    <div class="createPost__main">
      <div class="btn" @click="modalActive = true"> Créer une publication</div>    
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "./CreatePost.vue";

export default {
  name: "CreatePublication",
    components: { CreatePost },
  data() {
  return {
      //USER DATA
      firstName: "",
      avatar: "",
      //FONCTIONNALITY
      modalActive: false,
    };
  },

  created: function () {},

  mounted() {
    this.getUser();
    this.avatar = sessionStorage.getItem("avatar");
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
      this.loading = false;
    },

    getUser() {
      //Récupération de notre user dans le session storage
      const userId = sessionStorage.getItem("userId");
      const userToken = sessionStorage.getItem("token");
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
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 4px 4px 4px 30px;
  height: 50px;
}
.createPost__main {
  display: flex;
  padding-right: 20px;
}
img {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  object-fit: cover;
}
.btn {
  border: none;
  background-color: #f2f7f6;
  width: 100%;
  border-radius: 25px;
  padding: 5px 5px 5px 20px;
  font-size: 15px;
  display: flex;
  align-items: center;
}
.btn:hover {
  cursor: pointer;
  filter: brightness(95%);
  transition: all 0.2s ease;
}
</style>
