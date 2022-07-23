<template>
  <div class="container site">
    <main class="main">
      <div class="header-btn">
        <div class="welcome"><p>Bienvenue </p> <p class="userWelcome"> {{lastName}} {{ firstName }}  ! </p> </div>
      <button class="onPage" @click="openModal">Créer un post</button>
      </div>
      <div class="modal" v-show="showModal">
        <div class="main">
          <img src="../../public/assets/close.svg" Close class="icon-close" @click="closeModal" />
          <header class="modal-header">
            <h2>Créer une publication</h2>
          </header>
          <section class="modal-body">
            <textarea v-model="content" id="content" type="text" :placeholder="`Publication`" />
          </section>

          <div class="footer-btn">
          <section class="modal-file">
           <!-- <p>Ajouter des photos</p>
        <label for="file" class="icon"></label>
        <input type="file" @change="selectFile" ref="file" id="file" name="image" accept=".jpg, .jpeg, .gif, .png" />
        <img v-show="messageUrl" class="publication-photo" :src="messageUrl" alt="picture" /> -->



            <!-- <label class="btn-image" >
              Ajouter une image
            <input type="file" @change="selectFile" ref="image" id="image" name="image"
              accept=".jpg, .jpeg, .gif, .png" />
              
            <img v-show="imageUrl" class="publication-photo" :src="imageUrl" alt="picture" />
            </label> -->

            <div class="btn-image">
             <label class="btn-image-label" for="inputImage" > 
                Ajouter une image 
              </label> 
              <img v-show="imageUrl" class="publication-photo" :src="imageUrl" alt="picture"/> 
            </div>
            <input 
              type="file" 
              @change="selectFile" 
              ref="image" 
              id="inputImage" 
              name="inputImage"
              aria-describedby="image"
              accept=".jpg, .jpeg, .gif, .png" 
              />

            
          </section>
          <footer>
            <button @click="postPublication">Publier</button>
          </footer>
          </div>
        </div>
      </div>
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
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
      image: "",
      imageUrl: "",
      content: "",
      posts: [],
      firstName:this.$store.getters.getUserFirstName,
      lastName:this.$store.getters.getUserInfos,
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
        });
    },
    selectFile() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    //CREATE PUBLICATION
    postPublication() {
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

<style>
.container {
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}
.welcome {
  font-size: large;
  display:flex;
}

.header-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button.onPage {
  width: 20%;
  margin-bottom: 30px;
  padding:15px;
  border-radius: 10px;
}

.userWelcome {
  font-weight: bold;
  padding-left: 7px;
  color:#FD2D01;
}

.site {
  margin-top: 20px;
  margin-bottom: 20px;
}

.main {
  margin-bottom: 20px;
}

@media only screen and (min-width: 1050px) {
  .site {
    display: flex;
  }

  .main {
    width: 100%;
    margin-left: 30px;
    margin-right: 30px;
  }

  .aside {
    flex: none;
    width: 310px;
  }
}

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
.addImage {
  text-transform: none;
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
}

#inputImage {
  /* visibility: hidden;
  width:0;
  height: 0; */
  display: none;
}

.footer-btn {
  display:flex;
  justify-content: space-between;
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

.modal-body #content {
  padding:50px;
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
.icon-close {
  width: 35px;
  height: auto;
  position: relative;
  top:-15px;
  left:710px;
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

footer {
  display: flex;
  justify-content: space-around;
}


</style>