<template>
     <div class="home">
    <aside class="section1">
     <div class="picture">
       <img src="../assets/Banner-home.png" alt="Logo de l'entreprise groupomania" title="logo groupomania"/>
    </div>    
    </aside>
    <div class="section2">
         <div class="connexion">
         <div id="logo">
            <a href="http://localhost:8080/"> <img src="../assets/Groupomania-ok.png" alt="Logo de l'entreprise groupomania" title="logo groupomania" /></a>
        </div>
        
     <div class=login>
        <h1>Bienvenue sur votre réseau social d'entreprise</h1>
            <p>Ce portail a été mis en place pour simplifier la communication au sein de l’entreprise
                        Groupomania. Pour cela vos devez vous connecter.</p>
                <form class="formBox">
                        <h3>Email</h3>
                        <input type="email" v-model="email" placeholder="Votre Email">
                        <h3>Mot de passe </h3>
                        <input type="password" v-model="password" placeholder="Mot de Passe">
                        <input type="submit" @click.prevent="sendFormLogin" class="btnHome" value="Connexion" >
                    </form>
                    <div class="registerArea">
                    <div class="txtRegister">Vous n'avez pas de compte ?</div>
                    <!-- <div class="signup" @click="page = 'signup'">
                        Créer un compte
                    </div> -->
                    <router-link class="signup" :to="{ name: 'SignUp' }">Créer un compte</router-link>
                    </div>
                    </div>
                </div>
    </div>
    </div>

</template>

<script>
import Modal from "../components/Modal.vue";
import axios from "axios";

export default {
  name: "Login",
  components: {
    Modal,
  },
  data() {
    return {
      email: "",
      password: "",
      //ERRORS HANDLER
      error: null,
      errorMsg: "",
      // MODAL
      modalActive:false,
      modalMessage:"",
    };
  },
  methods: {
    //ACTIVER/DESACTIVER MODAL
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
    //Log user
    sendFormLogin() {
      if (this.email == "" && this.password == "") {
        this.error = true;
        this.errorMsg = "Merci de remplir tous les champs";
      } else {
        this.error = false;
        this.errorMsg = "";
        axios
          .post("http://localhost:3000/api/auth/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("userName", response.data.userName);
            sessionStorage.setItem("firstName", response.data.firstName);
            sessionStorage.setItem("lastName", response.data.lastName);
            sessionStorage.setItem("userEmail", response.data.userEmail);
            sessionStorage.setItem("avatar", response.data.avatar);
            sessionStorage.setItem("role", response.data.role);
            console.log(response.data);
            this.$router.push({ name: "PostPage" }); //REDIRECT
          })
          .catch((error) => {
            this.error = true;
            this.errorMsg = error.response.data.error;
          });
      }
    },
  },
};
</script>

<style scoped>
body {
    margin: 0 auto;
    min-width: 320px;
    max-width: 1920px;
  }

.home {
    display:flex;
    flex-direction: row-reverse;
}

.section1 {
    width: 50%;
}

.section2 {
    width: 50%;
    display:flex;
    flex-direction: column;
    padding-top: 20px; 
    justify-content: center;
}

#logo img {
    width: 500px;
    padding-bottom: 60px;
    padding-top: 5px;
    margin: 0 auto;
    text-align: center;
}

.connexion {
    text-align: center;
    align-items: center;
    padding:20px;
}

.btnHome {
    width:50%;
    font-size: 1.3rem;
    height: 3rem;
    border: solid 1px #333;
    cursor: pointer;
} 

.login_box, .register_box {
    width: 80%;  
    margin: 0 auto;
}

.login_box, .register_box h1 {
    padding-top: 30px;
} 
.connexion p {
    padding: 0px 52px 0 52px ;
} 

/* .formBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
} */
.formBox h3 {
    text-align: left;
    padding-left: 85px;
    margin-bottom: 10px;
    display: flex;
}

h1 {
    font-size: 2rem;
    color: #FD2D01;
    padding-top: 0.5rem;
}

form input{
    width: 80%;
    outline: none;
    border: 1px solid #FFD7D7;
    padding: 15px 0;
    margin-bottom: 20px;
    border-radius: 10px;
    text-align: left;
    padding-left: 15px;
}

.btnHome {
    text-align: center;
    font-size: 1.1rem;
    margin-top: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 82%;
    height: 40px;
    background: #FD2D01;
    border-radius: 12px;
    border-color: none;
    color:white;
    border: none;
    cursor: pointer;
}
.btnHome:hover {
    background: #4E5166;
    color: #FFF;
    transition: 0.8s;
}

.btnHome a {
    color: #FFF;
}
.btnHome:hover a {
    color: #fd2d01;
    transition: 0.8s;
}
a:hover {
    text-decoration: underline;
}

.post_text,
.post_media {
    font-size: 1rem;
}

.registerArea {
    display:flex;
    justify-content: center;
    padding-top: 15px;
}
.txtRegister {
    padding-right: 6px;
}

.signup, .returnLogin {
    color:#FD2D01;
    font-weight: bold;
    cursor:  pointer;
}

@media screen and (max-width: 1024px) {

    .home {
        display:flex;
        flex-direction: initial;
    }
   .section1{
    display: none;
   }

   .section2 {
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    display:block;
   }

   #logo img {
    width: 300px;
    padding-bottom: 30px;
}
   .connexion {
    width: auto;
    margin: auto;
   }

   .registerArea {
    display: block;
   }

   .login__box, .register_box {
    width: 100%;
   }

  }
</style>