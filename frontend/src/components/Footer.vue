<template>
  <footer>
    <div class="container">
          <div class="linkFooter">
          <ul>
            <router-link class="link" :to="{ name: 'PostPage' }">Accueil</router-link>
            <router-link class="link" :to="{ name: 'Home' }">Se connecter</router-link>
            <router-link class="link" :to="{ name: 'SignUp' }">Créer un compte</router-link>
          </ul>
          </div>
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
}
.linkFooter a {
  padding:10px;
  margin:auto;
  color:#fff;
}
footer .container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

footer .container{
  gap: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer .container .left .col-2 {
  gap: 32px;
  display: flex;
  flex: 1;
}
@media (min-width: 800px) {
  footer .container .left .col-1,
  footer .container .left .col-2 {
    gap: 0;
  }
}
footer .container .left .col-1 {
  flex-direction: column;
  align-items: center;
}
footer .container .left .col-1 h2 {
  text-align: center;
}
@media (min-width: 800px) {
  footer .container .left .col-1 h2 {
    text-align: initial;
  }
}
footer .container .left .col-1 ul {
  margin-top: auto;
}
footer .container .left .col-1 ul li {
  display: flex;
  align-items: center;
}
footer .container .left .col-1 ul li .svg-icon {
  width: 24px;
  height: auto;
  color: #fff;
}
footer .container .left .col-2 ul {
  height: 100%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
@media (min-width: 800px) {
  footer .container .left .col-2 ul {
    flex-direction: column;
  }
}
footer .container .left .col-2 ul .link {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}
footer .container .right {
  gap: 32px;
  color: #fff;
  align-items: center;
  flex-direction: column;
}
@media (min-width: 800px) {
  footer .container .right {
    align-items: flex-end;
    gap: 0;
  }
}
footer .container p {
  margin-top: auto;
}
.col-1 .brand {
  width: 40px;
}


@media (min-width: 800px) {
  footer .container {
    flex-direction: row;
    gap: 0px;
  }
}

@media (min-width: 800px) {
  footer .container .left {
    flex-direction: row;
    align-items: initial;
    gap: 0;
  }
}



</style>
