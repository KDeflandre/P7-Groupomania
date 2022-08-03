<template>
  <footer>
    <div class="container">
      <div class="linkFooter">
        <!-- <ul>
          <router-link class="link" :to="{ name: 'PostPage' }">Accueil</router-link>
          <router-link class="link" :to="{ name: 'Login' }">Se connecter</router-link>
          <router-link class="link" :to="{ name: 'SignUp' }">Créer un compte</router-link>
        </ul> -->
      </div>
     <p> @ Copyright GROUPOMANIA 2022</p>
    </div>
  </footer>
</template>

<script>

export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  margin-top: auto;
  padding: 30px 25px;
  background-color: #303030;
  display: flex;
  justify-content: center;
}

.linkFooter a {
  padding: 10px;
  margin: auto;
  color: #fff;
}

footer .container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

footer .container {
  gap: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer .container ul li {
  width: 24px;
  height: auto;
  color: #fff;
}

footer .container ul .link {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}
@media (max-width: 750px) {
  footer .container ul .link {
    font-size: 11px ;
  }

}
footer .container p {
  margin-top: auto;
}

@media (min-width: 800px) {
  footer .container {
    flex-direction: row;
  }
}


</style>
