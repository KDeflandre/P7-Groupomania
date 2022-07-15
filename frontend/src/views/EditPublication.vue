<template>
  <div class="modal">
    <Modal v-if="modalActive" :modalPost="modalPost" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="main">
      <a :href="'/publications'"><Close class="icon close" /></a>

      <header class="modal-header">
        <h2>Modifier votre publication</h2>
      </header>
      <section class="modal-body">
        <img :src="avatar" alt="user-avatar" class="card-avatar" />
        <textarea v-model="editedPost" @input="resize($event)" type="text" />
      </section>
      <section class="modal-file">
        <p>Changer d'image</p>
        <label for="file"> <AddImage class="icon" /></label>
        <input type="file" @change="selectFile" ref="file" id="file" name="image" accept=".jpg, .jpeg, .gif, .png" />
        <img v-show="editedPostUrl" class="publication-photo" :src="editedPostUrl" alt="picture" />
      </section>
      <footer>
        <button @click="deletePublication"><Trash /></button>
        <button @click="updatePublication">Modifier</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/Modal.vue";
// import AddImage from "../assets/Icons/image-gallery.svg";
// import Close from "../assets/Icons/close.svg";
// import Trash from "../assets/Icons/delete_forever.svg";
export default {
  name: "updatePublication",
  components: {  Modal },
  data() {
    return {
      firstName: "",
      userId: "",
      role: "",
      avatar: "",
      editedPost: "",
      editedPostUrl: "",
      file: null,
    //   modalActive: false,
    //   modalMessage: "",
    //   loading: null,
    };
  },
  mounted() {
    this.getPostData();
    this.firstName = sessionStorage.getItem("firstName");
    this.userId = sessionStorage.getItem("userId");
    this.role = sessionStorage.getItem("role");
    this.avatar = sessionStorage.getItem("avatar");
  },
  methods: {
    //CLOSE MODAL
    closeModal() {
      this.$emit("close-modal"); //On envoi un emit au store a chaque fois qu'on clique le bouton
      this.$router.push({ name: "PostPage" }); //REDIRECT TO FEEDPAGE
    },
    //SELECT FILE
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.editedPostUrl = URL.createObjectURL(this.file);
    },
    //RESIZE TEXT AREA
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    //GET THE DATA OF THE MESSAGE:id
    getPostData() {
      axios
        .get("http://127.0.0.1:3000/api/posts/" + this.$route.params.id, {
          headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        })
        .then((res) => {
          this.editedPost = res.data.post;
          this.editedPostUrl = res.data.postUrl;
          console.log("this is res from getData");
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //UPDATE THE PUBLICATION
    updatePublication() {
      const userToken = sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("post", this.editedPost.toString());
      formData.append("image", this.file);
      console.log("what is this.file");
      console.log(this.file);
      console.log("what is this.editedPost");
      console.log(this.editedPost);
      axios
        .put("http://localhost:3000/api/posts/" + this.$route.params.id, formData, {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then((response) => {
          this.loading = false; //On eteint le spinner "loading"
          this.modalPost = response.data.post; //On recup le message du back
          this.modalActive = !this.modalActive; //On active la modal
          console.log("response to updatePublication");
          console.log(response.data.post);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletePublication() {
      axios
        .delete("http://127.0.0.1:3000/api/posts/" + this.$route.params.id, {
          headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        })
        .then((response) => {
          this.modalPost = response.data.post; //On recup le message du back
          this.modalActive = !this.modalActive; //On active la modal
          console.log("this is response from deletePublication");
          console.log(response);
        })
        .catch((err) => {
          console.log("this is error from deletePublication");
          console.log(err);
        });
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
  width: 400px;
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
/* 
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
.modal .modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  width: 400px;
  min-height: 500px;
  padding: 40px 30px;
  background-color: #fff;
}
.modal .modal-content p {
  text-align: center;
}
.icon {
  width: 35px;
  height: auto;
}
.publication-photo {
  border-radius: 0;
  width: 350px;
  height: 300px;
}
.close {
  display: block;
  margin-left: auto;
}
.close:hover {
  cursor: pointer;
}
.modal .modal-content h2 {
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;
  text-decoration: underline 1px #dbdbdb;
  text-underline-offset: 10px;
  padding-bottom: 3px;
  border-radius: 3px;
}
.modal .modal-content button {
  align-self: center;
}
.createPost__main {
  display: flex;
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
.createPost__addPictures {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.createPost__addPictures:hover {
  cursor: pointer;
}
.createPost__addPictures p {
  padding-bottom: 5px;
} */
</style>