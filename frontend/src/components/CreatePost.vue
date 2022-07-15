<template>
  <div class="modal">
    <Modal v-if="modalActive" :modalPost="modalPost" v-on:close-modal="closeModal" />

    <div class="main">
      <a :href="'/publications'"><Close class="icon close" /></a>
      <header class="modal-header">
        <h2>Créer une publication</h2>
      </header>
      <section class="modal-body">
        <img :src="avatar" alt="user-avatar" class="card-avatar" />
        <textarea v-model="newPost" @input="resize($event)" type="text" :placeholder="`Votre publication`" />
      </section>
      <section class="modal-file">
        <p>Ajouter une photos</p>
        <label for="file"> AddImage class="icon" /></label>
        <input type="file" @change="selectFile" ref="file" id="file" name="image" accept=".jpg, .jpeg, .gif, .png" />
        <img v-show="postUrl" class="publication-photo" :src="postUrl" alt="picture" />
      </section>
      <footer>
        <button @click="postPublication">Publier</button>
      </footer>
      <div v-show="error" class="error">{{ this.errorMsg }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/Modal.vue";
import AddImage from "../assets/Icons/image-gallery.svg";
// import Close from "../assets/";
export default {
  name: "CreatePost",
  components: 
  { Modal, AddImage },

  data() {
    return {
      firstName: "",
      userId: "",
      role: "",
      avatar: "",
      postUrl: "",
      //Gestion affichage des erreurs
      error: null,
      errorMsg: "",
      newPost: "",
      file: null,
      modalActive: false,
      modalPost: "",
      loading: null,
    };
  },
  mounted() {
    this.firstName = sessionStorage.getItem("firstName");
    this.userId = sessionStorage.getItem("userId");
    this.role = sessionStorage.getItem("role");
    this.avatar = sessionStorage.getItem("avatar");
  },
  methods: {
    //SELECT FILE
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.postUrl = URL.createObjectURL(this.file);
    },
    //CLOSE MODAL
    closeModal() {
      this.$emit("close-modal"); //On envoi un emit au store a chaque fois qu'on clique le bouton
    },
    //RESIZE TEXT AREA
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    //CREATE PUBLICATION
    postPublication() {
      const userToken = sessionStorage.getItem("token");
      const formData = new FormData();
      formData.set("image", this.file);
      formData.set("UserId", this.userId.toString());
      formData.set("post", this.newPost.toString());
      console.log(formData);
      if (this.newPost || this.file) {
        axios
          .post("http://localhost:3000/api/posts", formData, {
            headers: { Authorization: "Bearer " + userToken },
          })
          .then((response) => {
            this.modalPost = response.data.post; 
            this.modalActive = !this.modalActive; 
            console.log("response to postPublication");
            console.log(response.data.post);
            window.location.reload(true);
            this.closeModal();
          });
      } else {
        this.error = true; // Si au moins 1 champ est vide on signal une erreur
        this.errorMsg = "Merci de publier au moins un message ou une image"; //le message d'erreur
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  width: 800px;
  min-height: 500px;
  padding: 40px 30px;
  background-color: #fff;
  position: relative;
}
.main a {
  position: absolute;
  top: 7px;
  right: 10px;
}
.main header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main header h2 {
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;
  text-decoration: underline 1px #dbdbdb;
  text-underline-offset: 10px;
  padding-bottom: 3px;
  padding-bottom: 10px;
  border-radius: 3px;
}
.modal-body {
  display: flex;
  padding: 15px 0;
}
.icon {
  width: 35px;
  height: auto;
}
.modal-file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-file p {
  padding-bottom: 10px;
}
input#file {
  padding-top: 10px;
  padding-bottom: 24px;
}
textarea {
  border: none;
  background-color: #f2f7f6;
  width: 100%;
  border-radius: 25px 25px 0px 25px;
  padding: 5px 5px 5px 20px;
  max-height: 250px;
  outline: none;
  resize: none;
  height: auto;
}
.close:hover {
  cursor: pointer;
  fill: rgba(48, 48, 48, 0.7);
}
.publication-photo {
  border-radius: 5px;
  width: 350px;
  height: 300px;
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
footer {
  display: flex;
  justify-content: space-around;
}
</style>