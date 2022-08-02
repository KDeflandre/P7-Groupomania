<template>
  <div>
    <article class="card" v-if="currentpost.content">
      <header class="card-header card-header-avatar">
        <img src="../../public/assets/avatar.svg" alt="avatar" width="45" height="45" class="card-avatar" />
        <div class="infos-date">
          <div class="infos-user">
            <p>
              {{ currentpost.user[0].firstName }}
              {{ currentpost.user[0].lastName }}
            </p>
          </div>
          <time class="card-date">
            Publié le {{ moment(currentpost.createdAt, "DD/MM/YYYY [à] HH[h]mm") }}
          </time>
        </div>
      </header>
      <div class="card-body">
        <p class="text-content" v-show="currentpost.content">
          {{ currentpost.content }}
        </p>
        <div v-if="currentpost.imageUrl">
          <img :src="currentpost.imageUrl" alt="img posted" class="fullwidth" />
        </div>
      </div>
      <footer class="card-footer">

        <button @click="likePost(currentpost._id)"
          :class="{ 'active': currentpost.usersLiked.includes($store.getters.getUserId) }">
          {{ currentpost.likes }}
          <i class="fa fa-thumbs-o-up"></i>
        </button>

        <button class="delete" @click="deletePublication()"
          v-if="$store.getters.getUserId == currentpost.userId || $store.getters.isAdmin">
          <span class="card-icon">Supprimer</span>
        </button>

        <button @click="showModal = true"
          v-if="$store.getters.getUserId == currentpost.userId || $store.getters.isAdmin">
          <span class="card-icon">Modifier</span>
        </button>

      </footer>
    </article>

    <div class="modal" v-if="showModal">
      <div class="main">
       
        <header class="modal-header">
        
          <h2>Modifier la publication</h2>
           <span class="iconClose">
        <img src="../../public/assets/close.svg" Close class="icon-close" @click="showModal = false" />
        </span>
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
            <input type="file" @change="selectFile" ref="image" id="inputImage" name="inputImage"
              aria-describedby="image" accept=".jpg, .jpeg, .gif, .png" />
          </section>
          <footer>
            <button @click="editPublication">Enregistrer</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import axios from "axios";
export default {
  name: "PostCard",
  props: ["currentpost"],
  data() {
    return {
      showModal: false,
      imageName: "",
      image: "",
      imageUrl: "",
      role: "",
      post: {}
    }
  },

  mounted() {
    this.post = { ... this.currentpost }
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

    editPublication() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("content", this.post.content);
      axios
        .put(`http://localhost:3000/api/posts/${this.post._id}`, formData, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.showModal = false
          this.$emit("refreshPosts")
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
            this.$emit("refreshPosts")
          })
          .catch((err) => {
            console.log("this is error from deletePublication");
            console.log(err);
          });
      } else {
        return;
      }
    },

    // like les posts 

    likePost() {
      this.submitted = true;
      axios
        .post(`http://localhost:3000/api/posts/${this.post._id}/like`, {}, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        })
        .then((response) => {
          this.$emit("refreshPosts")
        })
    }
  },

}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

button.active {
  background: #4E5166;
}

/* CARD START */
.card {
  border: solid 1px #dbdbdb;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  margin:40px;
}
@media only screen and (max-width: 1050px) {
  .card{
    margin-bottom: 20px;
  }
  .modal .main {
    width: 60%;
  }
}
  @media only screen and (max-width: 750px) {
  .card{
    margin-right: 0;
    margin-left: 0;
  }
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
  /* display: flex; */
  flex-direction: column;
  align-items: flex-start;
}

.text-content {
  padding: 20px;
  padding-top: 30px;
}
button.delete:hover {
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
  align-items: center;
  padding: 10px;
  border-bottom: solid 1px #dbdbdb;
}

.card-avatar {
  width: 50px;
  height: 50px;
  position: left;
}

.card-date {
  color: #4E5166;
  font-size: 12px;
  padding-left: 15px;
  margin: auto;
  margin-top: -10px;
}

.card-body {
  padding: 0 10px;
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
  padding-bottom: 10px;
  font-size: 12px;
  color: #dbdbdb;
  justify-content: space-around;
  border-bottom: solid 1px #dbdbdb;
}
@media only screen and (max-width: 750px) {
  .card-footer button {
    background-color: transparent;
    color:#FD2D01;
    padding:12px 17px;
    font-size: medium;
  }

  .card-footer button:hover {
  color: rgba(48, 48, 48, 0.7);
}
button.active {
  color: #4E5166;
  display: flex;
  align-items: center;
}
.fa.fa-thumbs-o-up {
  padding:5px
}
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
/* Modal part */
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

#inputImage {
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
@media only screen and (max-width: 900px){
  .modal .main{
    width: 75%;
  }
}
@media only screen and (max-width: 750px){
  .modal .main{
    width: 100%;
  }
  /* .btn-image {
    color:#FD2D01;
    background-color: transparent;
  } */
    /* .btn-image:hover {
  color: rgba(48, 48, 48, 0.7); */
}
  /* .footer-btn button {
    background-color: transparent;
    color:#FD2D01;
  } */

  /* .footer-btn button:hover {
  color: rgba(48, 48, 48, 0.7);
} */
/* } */

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
  background-color: #FFD7D7;
  width: 100%;
  padding: 5px 5px 5px 20px;
  max-height: 250px;
  outline: none;
  resize: none;
  height: auto;
}

footer {
  display: flex;
  justify-content: space-around;
}
</style>