<template>
  <div class="blog-wrapper">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <p v-if="post.welcomeScreen">{{ post.welcomeMessage }}</p>
        <router-link v-if="post.welcomeScreen" class="link" :to="{ name: 'Login' }">
          <div class="login-register" v-if="!userId">Se connecter<Arrow class="arrow arrow-light" /></div>
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="" />
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
  name: "Publication",
  props: ["post"], //creation d'un props utilisé dans Home.vue
  components: {
    Arrow,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
    };
  },
};
</script>

<style scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
@media (min-width: 700px) {
  .blog-wrapper {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
}
.blog-wrapper .blog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 4;
  order: 2;
}
@media (min-width: 700px) {
  .blog-wrapper .blog-content {
    order: 1;
  }
}
@media (min-width: 800px) {
  .blog-wrapper .blog-content {
    flex: 3;
  }
}
.blog-wrapper .blog-content div {
  max-width: 375px;
  padding: 72px 24px;
}
@media (min-width: 700px) {
  .blog-wrapper .blog-content div {
    padding: 0 24px;
  }
}
.blog-wrapper .blog-content div h2 {
  font-size: 32px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 24px;
}
@media (min-width: 700px) {
  .blog-wrapper .blog-content div h2 {
    font-size: 40px;
  }
}
.blog-wrapper .blog-content div p {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
}
.blog-wrapper .blog-content div .content-preview {
  font-size: 13px;
  max-height: 24px;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blog-wrapper .blog-content div .link {
  display: inline-flex;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease-in all;
}
.blog-wrapper .blog-content div .link:hover {
  border-bottom-color: #303030;
}
.blog-wrapper .blog-content div .link-light:hover {
  border-bottom-color: #fff f;
}
.blog-wrapper .blog-photo {
  order: 1;
  flex: 3;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
@media (min-width: 700px) {
  .blog-wrapper .blog-photo {
    order: 2;
  }
}
@media (min-width: 800px) {
  .blog-wrapper .blog-photo {
    flex: 4;
  }
}
.blog-wrapper .blog-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blog-wrapper:nth-child(even) .blog-content {
  order: 2;
}
.blog-wrapper:nth-child(even) .blog-photo {
  order: 1;
}
.no-user:first-child .blog-content {
  background-color: #303030;
  color: #fff;
}
.arrow {
  margin-left: 7px;
}
.login-register {
  padding: 0 !important;
}
</style>