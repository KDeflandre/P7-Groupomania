<template>
  <article class="card">
    <header class="card-header card-header-avatar">
            <img src="../../public/assets/avatar.svg" alt="avatar" width="45" height="45" class="card-avatar" />
            <div class="infos-date">
              <div class="infos-user">
                <p> 
                  {{ firstName }} 
                  {{ lastName }} 
                  <!-- {{post.user[0].userName}} -->
                    <!-- {{ post.user[0].firstName }} -->
                <!-- {{ post.user[0].lastName }} -->
                <!--  postId  -->
                </p>
              </div> 
              <time class="card-date">
               <!-- {{post.datePost}} -->
                {{ "Publié le" + currentDate() }}
                {{ "Publié le" + post.createdAt }}
                <!-- {{ "Publié le " + post.createdAt.slice(0, 10).split("-").reverse().join("/") + " à " + post.createdAt.slice(11, 16) }} -->
                

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
            <div @click="like">
            <span class="card-icon">0 like</span>
            </div>

            <button>
              <!-- <div class="dropdown" v-if="user.isAdmin==true || user.username == post.User.username"></div> -->
            <div v-if="userId == post.UserId || role == 'Administrateur'">
              <a class="link" :href="'/post/edit/' + post.id"> <span class="card-icon">Modifier</span> </a>
            </div>
            </button>
  </footer>
  </article>
</template>

<script>
import axios from "axios";
export default {
  name: "PostCard",
  props: ["post"],
data() {
    return {
      firstName:this.$store.getters.getUserFirstName,
      lastName:this.$store.getters.getUserInfos,
      email:this.$store.getters.getUserInfos,
      userId:this.$store.getters.getUserId,
      isAdmin:this.$store.getters.isAdmin,

      role: "",
      // Pour la modal
      modalActive: false,
      modalMessage: "",
      
    }
  },
  
 methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} à ${current.getHours()}:${current.getMinutes()}`;
      return date;
    },

    //Edit Post
    editPost(post) {
      axios
        .get("http://localhost:3000/api/posts/" + post.id, 
        { headers: { Authorization: `Bearer ${this.$store.getters.getToken}`},
         })
        .then((response) => {
          this.$router.push({ name: "PostPage" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }

}
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
  width:100%;
  max-height: 300px;
}
.infos-user {
  display: flex;
  font-size:medium;
  color:black;
  font:bold;
  padding-left: 6px;
}
.infos-user p {
  padding-left:10px;
}
.infos-date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text-content {
  padding:20px;
  padding-top:30px;
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
  display:flex;
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
  position:left;
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
  margin:auto;
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
</style>