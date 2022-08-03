<template>
  <div class="container site">
    <main class="main">
      <div class="header-btn">
        <div class="welcome">
          <p>Bienvenue </p>
          <p class="userWelcome"> {{ lastName }} {{ firstName }} ! </p>
        </div>
        <button class="onPage" @click="openModal">Créer un post</button>
      </div>
      <div class="modal" v-if="showModal">
        <div class="main">
         
          <header class="modal-header"> 
            <h2>Créer une publication</h2>
            <span class="iconClose">
             <img src="../../public/assets/close.svg" Close class="icon-close" @click="closeModal" />
             </span>
          </header>
          <section class="modal-body">
            <textarea v-model="content" id="content" type="text" :placeholder="`Publication`" />
            <div class="errorContent" v-if="error">{{ error }}</div>
          </section>

          <div class="footer-btn">
            <section class="modal-file">
              <div class="btn-image">
                <label class="btn-image-label" for="inputImage">
                  Ajouter une image
                </label>
              </div>
              <p class="imageName">
              {{ imageName }}
              </p>
              <input type="file" @change="selectFile" ref="image" id="inputImage" name="inputImage"
                aria-describedby="image" accept=".jpg, .jpeg, .gif, .png" />
            </section>
            <footer>
              <button @click="postPublication">Publier</button>
            </footer>
          </div>
        </div>
      </div>
      <PostCard v-for="post in posts" :key="post._id" :currentpost="post" @refreshPosts="getAllPosts" />
    </main>
  </div>
</template>

<script>
import axios from "axios";
import PostCard from "../components/PostCard.vue";

export default {
  name: "PostPage",
  components: { PostCard },
  data() {
    return {
      showModal: false,
      imageName: "",
      image: "",
      imageUrl: "",
      content: "",
      posts: [],
      firstName: this.$store.getters.getUserFirstName,
      lastName: this.$store.getters.getUserInfos,
      error:false,
    }
  },
  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/posts", {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.posts = response.data.posts;
          
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
          this.$store.dispatch("logout")
          }
        });
    },
    selectFile() {
      this.imageName = this.$refs.image.files[0].name
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    
    // Création d'une publication
    postPublication() {
      this.error = false
      if(this.content.trim() === "") return this.error = "Pas de contenu !"
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("userId", this.$store.getters.getUserId);
      formData.append("content", this.content);
      axios
        .post("http://localhost:3000/api/posts", formData, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.closeModal()
          this.getAllPosts()
        })
        .catch(error => (this.error = error));
    },
  },
  mounted() {
    this.getAllPosts()
  }
};
</script>

<style scoped>
.container {
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}

.site {
  display: flex;
  justify-content: center;
}

.welcome {
  font-size: large;
  display: flex;
  margin:20px;
}

.header-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button.onPage {
  margin-bottom: 30px;
  padding: 15px;
  border-radius: 10px;
  margin:20px;
}

.userWelcome {
  font-weight: bold;
  padding-left: 7px;
  color: #FD2D01;
}

.site {
  margin-top: 20px;
  margin-bottom: 20px;
}
.errorContent {
  padding:10px;
  font-size: large;
  color:#FD2D01;
  display: flex;
  justify-content: center;
}

@media only screen and (min-width: 1050px) {
  .site {
    display: flex;
  }

  .main {
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px

  }

  .aside {
    flex: none;
    width: 310px;
  }
}
/* Modal part */
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
.modal-header {
  display:flex;
  align-items: center;
  justify-content: space-between;
}
.iconClose {
  width: 6%;
  cursor: pointer;
}
@media only screen and (max-width: 1200px){
  .iconClose {
    width:8%;
  }
}
  @media only screen and (max-width: 900px){
  .iconClose {
    width:8%;
  }
}
 @media only screen and (max-width: 800px){
  .iconClose {
    width:8%;
  }
 }

.btn-image {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #FD2D01;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  font-size: small;
}

.btn-image-label {
  cursor: pointer;
}

#inputImage {
  /* visibility: hidden;
  width:0;
  height: 0; */
  display: none;
}

.footer-btn {
  display: flex;
  justify-content: space-between;
}

.modal .main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  padding: 40px 30px;
  background-color: #fff;
  position: relative;
  width: 55%;
  height: 55%;
}
@media only screen and (max-width:900px){
  .modal .main {
    width:75%;
  }
  
}
@media only screen and (max-width: 750px)  {
  .modal .main{
    width:100%;
  }
}

.main a {
  position: absolute;
  top: 7px;
  right: 10px;
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
  flex-direction: column;
  padding: 15px 0;
}

.modal-body #content {
  padding: 20px;
  min-height: 150px;
  margin-bottom: 20px;
}

.icon {
  width: 35px;
  height: auto;
}

.modal-file {
  display: flex;
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
  background-color:#ebe8e8;
  width: 100%;
  padding: 5px 5px 5px 20px;
  max-height: 250px;
  outline: none;
  resize: none;
  height: auto;
  white-space: pre-line;
}
img {
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  width: 100%;
  max-height: 300px;
}
.imageName {
  margin-top:30px;
  padding-left: 15px;
}

footer {
  display: flex;
  justify-content: space-around;
}
@media only screen and (max-width: 750px) {
.header-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  .onPage {
    width: 70%;
  }
}


</style>