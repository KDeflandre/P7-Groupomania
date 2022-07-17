<template>
  <div>
    <div class="container site">
      <main class="main">
        <p> test </p>
        <article v-for="publication in publicationsList" :key="publication.id" class="card" :class="{ active: publication === activeItem }">
          <header class="card-header card-header-avatar">
            <img :src="publication.avatar" alt="avatar" width="45" height="45" class="card-avatar" />
            <section class="card-header-wrapper">
              <div class="card-title">{{ publication.firstName }} {{ publication.lastName }}</div>
              <time class="card-date">
                {{ "Publié le " + publication.createdAt.slice(0, 10).split("-").reverse().join("/") + " à " + publication.createdAt.slice(11, 16) }}
              </time>
            </section>
          </header>
          <div class="card-body">
            <!-- Ne s'affiche que si on a un fichier uploadé  -->
            <div v-if="publication.imageUrl">
              <img :src="publication.imageUrl" alt="img posted" class="fullwidth" />
            </div>
            <p v-show="publication.content">
              {{ publication.content }}
            </p>
          </div>
          <footer class="card-footer">
            <div @click="like"><span class="card-icon">0 like</span></div>
          <!-- Si l'utilisateur est admin ou si le userId correpsondant à l'UserId de la publication alors on affiche l'icone modifier -->

            <div v-if="userId == publication.userId || role == 'Administrateur'">
              <a class="link" :href="'/publication/edit/' + publication.id"> /><span class="card-icon">Modifier</span></a>
            </div>
          </footer>
          
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//ICONS
export default {
  name: "PostCard",
  data() {
    return {
     publicationsList: [],
      role: "",
      avatar: "",
      userId: localStorage.getItem("userId"),
      activeItem: null,
      activeMessage: null,
      // Pour la modal
      modalActive: false,
      modalMessage: "",

      modeMobile: null,
    };
  },
  
  // computed: {},
  
  mounted() {
    this.getAllPosts();
    this.firstName = localStorage.getItem("firstName");
    this.lastName = localStorage.getItem("lastName");
    this.userId = localStorage.getItem("userId");
    this.avatar = localStorage.getItem("avatar");
  },
  methods: {
    //SELECT 1 ELEMENT
    selectItem(publication) {
      this.activeItem = publication.id;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.modeMobile = true;
        return;
      } else {
        this.modeMobile = false;
      }
      return;
    },

    
    // like() {
    //  
    // },

    //EDIT PUBLICATION
    // editPublication(publication) {
    //   axios
    //     .get("http://localhost:3000/api/posts/" + publication.id 
    //     , { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    //     .then((res) => {
    //       console.log("edit post");
    //       console.log(res);
    //       this.$router.push({ name: "PostPage" }); //REDIRECT TO FEEDPAGE
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },

    //Tt les posts
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/posts", {
          headers: { Authorization: "Bearer " + localStorage.getItem('token') }, })
        .then((response) => {
          this.publicationsList = response.data.ListePosts;
          this.role = localStorage.getItem("role");
          console.log(localStorage.getItem("role"));
          console.log("response to get all posts");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};


</script>

<style>
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
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #dbdbdb;
}
.card-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 10px;
}
.card-avatar {
  border-radius: 50%;
  filter: brightness(0.4) invert(1);
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
</style>