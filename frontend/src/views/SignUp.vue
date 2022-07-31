<template>
    <div class="home">
        <aside class="section1">
            <div class="picture">
                <img src="../assets/Banner-home.png" alt="Logo de l'entreprise groupomania" title="logo groupomania" />
            </div>
        </aside>
        <div class="section2">
            <div class="connexion">
                <div id="logo">
                    <a href="http://localhost:8080/"> <img src="../assets/Groupomania-ok.png"
                            alt="Logo de l'entreprise groupomania" title="logo groupomania" /></a>
                </div>
                <div class='signup'>
                    <h1>Pour nous rejoindre, complétez votre inscription</h1>
                    <form class="formBox">
                        <h3>Nom</h3>
                        <input type="text" v-model="nom" placeholder="Nom" required>
                        <h3>Prénom</h3>
                        <input type="text" v-model="prenom" placeholder="Prénom" required>
                        <h3>Email</h3>
                        <input type="email" v-model="email" placeholder="Adresse email" required>

                        <div class="btnPassword">
                            <label for="password">
                                <h3> Mot de passe</h3>
                            </label>
                            <input :type="showPassword ? 'text' : 'password'" class="input" name="password"
                                v-model="password" placeholder="Mot de passe" required>
                            <span class="buttonTxt" @click="toggleShow">
                                <span class="icon is-small is-right">
                                    <i class="fa"
                                        :class="{ 'fa-eye-slash': !showPassword, 'fa-eye': showPassword }"></i>
                                </span>
                            </span>
                        </div>
                        <div class="infoPassword">
                            <p>Minimum 5 caractères, une lettre minuscule et en majuscule, un chiffre</p>
                        </div>
                        <h3>Confirmation du mot de passe</h3>
                        <input type="password" v-model="password2" class="password"
                            placeholder="Confirmation mot de passe" required>
                        <div v-show="error" class="error">{{ this.errorMsg }}</div>
                        <input type="submit" @click.prevent="sendFormSignup" class="btnHome" value="Inscription">
                    </form>
                    <div class="registerArea">
                        <div class="txtRegister">Vous avez déjà un compte ?</div>
                        <router-link class="returnLogin" :to="{ name: 'Login' }">Se connecter</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "SignUp",
    data() {
        return {
            // Permet de cacher ou pas le MDP
            showPassword: false,
            password: null,
            password2: null,
            //Permet de récupérer la valeur des inputs
            prenom: "",
            nom: "",
            email: "",
            password: "",
            //Gestion affichage des erreurs
            error: null,
            errorMsg: "",
        };
    },
    computed: {
        buttonLabel() {
            return (this.showPassword) ? "Hide" : "Show";
        }
    },
    methods: {
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
      
        sendFormSignup() {
            if (this.prenom == "" || this.nom == "" || this.email == "" || this.password == "") {
                this.error = true; 
                this.errorMsg = "Merci de remplir tous les champs";
            } else if (this.password !== this.password2) {
                this.error = true;
                this.errorMsg = "Les mots de passe ne sont pas indentiques";
            } else {
                this.error = false;
                this.errorMsg = "";
                let data = {
                    firstName: this.prenom,
                    lastName: this.nom,
                    email: this.email,
                    userName: this.email,
                    password: this.password,
                }
                this.$store.dispatch('signup', data)
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

.signup {
    display:flex;
    flex-direction: column;
    /* align-content: center; */
    align-items: center;
}
.signup h1 {
    padding:20px;
}
.btnPassword {
    position: relative;
}

label.password {
    display: block;
}

.buttonTxt {
    bottom: 20px;
    right: 10%;
    position: absolute;
    width: 0px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.home {
    display: flex;
    flex-direction: row-reverse;
}

.section1 {
    width: 50%;
}

.section2 {
    width: 50%;
    display: flex;
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
    padding: 20px;
}

.login {
    width: 50%;
    font-size: 1.3rem;
    height: 3rem;
    border: solid 1px #333;
    cursor: pointer;
}

/* .login_box,
.register_box {
    width: 80%;
    margin: 0 auto;
}

.login_box,
.register_box h1 {
    padding-top: 30px;
} */

/* .connexion p {
    padding: 0px 52px 0 52px;
} */
.formBox {
    width:90%;
}
.formBox h3 {
    text-align: left;
    /* padding-left: 85px; */
    margin-bottom: 10px;
    /* display: flex; */
}
.infoPassword {
    color: #4E5166;
    font-weight: 200;
    font-size: small;
    text-align: justify;
    padding-bottom: 20px;
    padding-left: 15px;
}
h1 {
    font-size: 2rem;
    color: #FD2D01;
    padding-top: 0.5rem;
}

form input {
    width: 100%;
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
    color: white;
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

.registerArea {
    display: flex;
    justify-content: center;
    padding-top: 15px;
}

.txtRegister {
    padding-right: 6px;
    color: black;
    font-weight: 500;
}

.signup,
.returnLogin {
    color: #FD2D01;
    font-weight: bold;
    /* cursor: pointer; */
}

@media screen and (max-width: 1024px) {

    .home {
        display: flex;
        flex-direction: initial;
    }

    .section1 {
        display: none;
    }

    .section2 {
        width: 100%;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        display: block;
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

    /* .login__box,
    .register_box {
        width: 100%;
    } */

}
</style>
