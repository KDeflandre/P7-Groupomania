<template>
  <article class="card">
    <header class="card-header card-header-avatar">
      <img src="../../public/assets/avatar.svg" alt="avatar" width="45" height="45" class="card-avatar" />
      <div class="infos-date">
        <div class="infos-user">
          <p>
            {{ post.user[0].firstName}}
            {{ post.user[0].lastName}}
          </p>
        </div>
        <time class="card-date">
          Publié le {{ moment(post.createdAt, "DD/MM/YYYY [à] HH[h]mm") }}
        </time>
      </div>
    </header>
    <div class="card-body">
      <p class="text-content" v-show="post.content">
        {{ post.content }}
      </p>
      <div v-if="post.imageUrl">
        <img :src="post.imageUrl" alt="img posted" class="fullwidth" />
      </div>
    </div>
    <footer class="card-footer">
      
      <!-- <button @click="">
      <img src="../../public/assets/Like.svg" alt="like" width="45" height="45" class="card-like" />
        <span class="card-icon">0 like</span>
        </button> -->
      <button  @click="toggleLike" v-if="$store.getters.getUserId">
      <i class="fa fa-thumbs-o-up"></i> {{ likesCount }}
      </button>

      <button @click="deletePublication()" v-if="$store.getters.getUserId == post.userId || $store.getters.isAdmin">
        <span class="card-icon">Supprimer</span>
      </button>
      
      <button @click="showModal = true" v-if="$store.getters.getUserId == post.userId || $store.getters.isAdmin">
        <span class="card-icon">Modifier</span>
      </button>

    </footer>
  </article>
  
  <div class="modal" v-if="showModal">
    <div class="main">
      <img src="../../public/assets/close.svg" Close class="icon-close" @click="showModal = false" />
      <header class="modal-header">
        <h2>Modifier la publication</h2>
      </header>
      <section class="modal-body">
        <textarea v-model="post.content" id="content" type="text" :placeholder="`Publication`" />
      </section>

      <div class="footer-btn">
        <section class="modal-file">
          <div class="btn-image">
            <label class="btn-image-label" for="inputImage">
              {{ post.imageUrl ? "Modifier l'image" : "Ajouter une image" }}
            </label>
          </div>
          {{ imageName }}
          <input type="file" @change="selectFile" ref="image" id="inputImage" name="inputImage" aria-describedby="image"
            accept=".jpg, .jpeg, .gif, .png" />
        </section>
        <footer>
          <button @click="editPublication">Enregistrer</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import axios from "axios";
export default {
  name: "PostCard",
  props: ["post"],
  data() {
    return {
      showModal: false,
      imageName: "",
      image: "",
      imageUrl: "",
      role:"",
      likes: false,
      likesCount: 0
    }
  },

  mounted() {
    this.getAllPosts();
  },

  methods: {
    moment(date, format) {
      return moment(date).format(format)
    },

    

    selectFile() {
      this.imageName = this.$refs.image.files[0].name
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },

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
      openModal() {
      this.showModal = true
      },

      closeModal() {
      this.showModal = false
    },
      postPublication() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("content", this.post.content);
      axios
        .put(`http://localhost:3000/api/posts/${this.post._id}`, formData, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.closeModal()
          this.getAllPosts()
        })
        .catch(error => (this.error = error));
    },

      editPublication() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("content", this.post.content);
      axios
        .put(`http://localhost:3000/api/posts/${this.post._id}`, formData, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.closeModal()
          this.$router.go(0);
        })
        .catch(error => (this.error = error));
    },

    deletePublication() {
       let confirmDeletePost = confirm(
        "voulez-vous vraiment supprimer votre publication ?"
      );
      if (confirmDeletePost == true) {
      axios
        .delete(`http://localhost:3000/api/posts/${this.post._id}`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.$router.go(0);
          console.log("this is response from deletePublication");
          console.log(response);
        })
        .catch((err) => {
          console.log("this is error from deletePublication");
          console.log(err);
        });
      } else {
        return;
  }},
// like les posts 

toggleLike() { 
            if (this.likes) {
              this.unlikePost()
            } else {
              this.likePost()
            }
},

  likePost() {
    this.submitted = true;
      axios 
      .post(`http://localhost:3000/api/posts/)${this.post._id}/like`, {
        headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
      })
      .then((response) => {
        this.likes = true;
        this.submitted = false;
        this.text = 'Unlike';
      })
},

unlikePost: function() {
    this.submitted = true;
      axios
     .post(`http://localhost:3000/api/posts/)${this.post._id}/dislike`, {
        headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },

     })
     .then((response) => {
        this.likes = false;
        this.submitted = false;
        this.text = 'Like';
     })
    }
}
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* CARD START */
.card {
  border: solid 1px #dbdbdb;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
}

.post.imageUrl {
  border-radius: 5px;
  width: 350px;
  height: 300px;
}

img {
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  width: 100%;
  max-height: 300px;
}

.infos-user {
  display: flex;
  font-size: medium;
  color: black;
  font: bold;
  padding-left: 6px;
}

.infos-user p {
  padding-left: 10px;
}

.infos-date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text-content {
  padding: 20px;
  padding-top: 30px;
}

.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.delete:hover {
  cursor: pointer;
  fill: red;
  transition: all 0.2s ease;
}

.card:last-child {
  margin-bottom: 0;
}

/*CARD HEADER */
.card-header {
  display: flex;
  padding: 10px;
  display: flex;
  border-bottom: solid 1px #dbdbdb;
}

.card-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 10px;
}

.card-avatar {
  width: 50px;
  height: 50px;
  position: left;
}

.card-title {
  font-weight: bold;
  font-size: 18px;
  color: #000;
  margin-bottom: 5px 0;
}

.card-date {
  color: rgba(0, 0, 0, 0.38);
  font-size: 12px;
  padding-left: 15px;
  margin: auto;
  margin-top: -10px;

}

/* CARD BODY */
.card-body {
  padding: 0 10px;
}

.card-body p {
  padding-top: 5px;
  padding-bottom: 5px;
}

.card-body a {
  color: #34aaff;
  text-decoration: underline;
}

.card-body .fullwidth {
  width: calc(100% + 20px);
  display: block;
  margin-left: -10px;
  margin-right: -10px;
  object-fit: cover;
  height: 300px;
}

/*CARD FOOTER*/
.card-footer {
  border-top: solid 1px #dbdbdb;
  background: #fbfbfb;
  display: flex;
  padding: 10px;
  font-size: 12px;
  color: #dbdbdb;
  justify-content: space-around;
  border-bottom: solid 1px #dbdbdb;
}

.card-footer div {
  display: flex;
  align-items: flex-end;
}

.card-icon {
  padding-left: 5px;
}

.card-footer div:hover {
  text-decoration: underline;
  cursor: pointer;
}

/*ASIDE*/
aside p {
  margin-top: 0;
}

.bio {
  display: none;
}

/*ASIDE SUGGESTION FRIEND*/
.sidebar-title {
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #000;
  font-size: 15px;
}

.sidebar-title::after {
  content: "";
  display: block;
  height: 1px;
  width: 100%;
  margin-top: 4px;
  background: #000;
}

.friend {
  margin: 14px 0;
  display: flex;
}

.friend-body {
  display: flex;
  flex-direction: column;
}

.friend-avatar {
  width: 70px;
  height: 70px;
  margin-right: 10px;
  flex: none;
}

.friend-avatar {
  display: block;
  font-weight: bold;
  color: #000;
}

.friend-name {
  display: block;
  font-weight: bold;
  color: #000;
  font-size: 15px;
  margin-bottom: 2px;
}

.friend-common {
  color: rgba(0, 0, 0, 0.38);
  font-size: 12px;
}

.friend-add {
  display: flex;
  font-size: 12px;
  color: #000;
  margin-top: auto;
}

.add-icon {
  padding-left: 5px;
}

.edit {
  text-decoration: none;
}

.edit span {
  padding-left: 5px;
  color: #000;
}

.edit:hover {
  color: #000;
  font-weight: 600;
  text-decoration: underline;
}

.container {
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}

.welcome {
  font-size: large;
  display: flex;
}

.header-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button.onPage {
  width: 20%;
  margin-bottom: 30px;
  padding: 15px;
  border-radius: 10px;
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
  display: flex;
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
  padding: 50px;
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
  top: -15px;
  left: 710px;
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