<template>
  <div class="container site">
    <main class="main">
      <div class="modal" v-show="showModal">
      <div class="main">
        <img src="../../public/assets/close.svg" Close class="icon-close" @click="closeModal" />
        <header class="modal-header">
        <h2>Modifier votre post</h2>
        </header>     
      <section class="modal-body">
        <textarea v-model="editedPost" @input="resize($event)" type="text" />
      </section>

      <div class="footer-btn">
      <section class="modal-file">

        <label class="btn-image">
              Changer de photos
            <span><input type="file" @change="selectFile" ref="image" id="image" name="image"
              accept=".jpg, .jpeg, .gif, .png" /></span>
            <img v-show="editedPostUrl" class="post-photo" :src="editedPostUrl" alt="picture" />
            </label>
        </section>
      <footer>

        <button @click="deletePost">Supprimer </button>
        <button @click="updatePost">Modifier </button>
      </footer>
    </div>
  </div>
  </div>
  </main>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "updatePost",
  data() {
    return {
      firstName:this.$store.getters.getUserFirstName,
      lastName:this.$store.getters.getUserInfos,
      userId:this.$store.getters.getUserId,
      role: "",
      editedPost: "",
      editedPostUrl: "",
      image: "",
      showModal: false,
    };
  },
  mounted() {
    this.getPostData();
  },

  methods: {

    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.$router.push({ name: "PostPage" });
    },
    
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.editedPostUrl = URL.createObjectURL(this.file);
    },
    
    //GET THE DATA OF THE MESSAGE:id
    getPostData() {
      axios
        .get("http://localhost:3000/api/posts/" + this.$route.params.id, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
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

    updatePost() {
      const formData = new FormData();
      formData.append("post", this.editedPost);
      formData.append("image", this.file);
      axios
        .put("http://localhost:3000/api/posts/" + this.$route.params.id, formData, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.modalPost = response.data.post; // message du back
          this.openModal() 
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletePost() {
      axios
        .delete("http://127.0.0.1:3000/api/posts/" + this.$route.params.id, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.modalPost = response.data.post; //On recup le message du back
          this.modalActive = !this.modalActive; //On active la modal
          console.log("this is response from deletePost");
          console.log(response);
        })
        .catch((err) => {
          console.log("this is error from deletePost");
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
.post-photo {
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