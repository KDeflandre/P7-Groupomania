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
import { mapState } from "vuex";
import CreatePost from "./CreatePost.vue";

export default {
  name: "CreatePublication",
    components: { CreatePost },
  data() {
  return {
      firstName: "",
      avatar: "",
      //FONCTIONNALITY
      modalActive: false,
    };
  },

  created: function () {},

  mounted() {
    // this.getUser();
    this.avatar = localStorage.getItem("avatar");
    this.$store.dispatch("getUserInfos");

  },

  // computed: {
  //   ...mapState(["user"])
  // },

  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  
    // getUser() {
    //   //Récupération de notre user dans le local storage
    //   const userId = localStorage.getItem("userId");
    //   axios
    //     .get("http://localhost:3000/api/users/" + parseInt(localStorage.getItem("userId")), {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem('token') }, })
    //     .then((response) => {
    //       this.userData = response.data;
    //       this.firstName = response.data.firstName;
    //       this.lastName = response.data.lastName;
    //       this.email = response.data.email;
    //     })
    //     .catch((err) => console.log(err));
    //     }
    },
  };
// };
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
