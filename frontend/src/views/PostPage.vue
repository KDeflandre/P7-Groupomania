<template>
  <div class="container site">
    <main v-if="userId" class="main">
      <PostBtn />

      <PostCard />
    </main>

    <main v-if="!userId">Vous devez être connecté</main>
    
  </div>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import PostBtn from "../components/PostBtn.vue";

export default {
  name: "PostPage",
  components: { PostCard, PostBtn },
  data() {
    return {
      userId: "",
    };
  },
  computed: {
    //store
    sampleBlogPost() {
      return this.$store.state.sampleBlogPost;
    },
  },
  mounted() {
    this.userId = sessionStorage.getItem("userId");
  },
};
</script>

<style>
.container {
  /* padding: 0 15px; */
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
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
</style>