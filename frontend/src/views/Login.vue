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

                <div class=login>
                    <h1>Bienvenue sur votre réseau social d'entreprise</h1>
                    <p>Ce portail a été mis en place pour simplifier la communication au sein de l’entreprise
                        Groupomania. Pour cela vos devez vous connecter.</p>
                    <form class="formBox">
                        <h3>Email</h3>
                        <input type="email" v-model="email" placeholder="Votre Email">
                        <h3>Mot de passe </h3>
                        <input type="password" v-model="password" placeholder="Mot de Passe">
                        <div v-show="error" class="error">{{ this.errorMsg }}</div>
                        <input type="submit" @click.prevent="sendFormLogin" class="btnHome" value="Connexion">
                    </form>
                    <div class="registerArea">
                        <div class="txtRegister">Vous n'avez pas de compte ?</div>
                        <router-link class="signup" :to="{ name: 'SignUp' }">Créer un compte</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            //ERRORS HANDLER
            error: null,
            errorMsg: "",
        };
    },
    methods: {
        
        //Log user
        sendFormLogin() {
            if (this.email == "" && this.password == "") {
                this.error = true;
                this.errorMsg = "Merci de remplir tous les champs"; 
            } else if  (this.email == "" || this.password == "") {
                this.error = true;
                this.errorMsg = "Merci de remplir tous les champs";
            } else {
                this.error = false;
                this.errorMsg = "";
                let data = {
                    email: this.email,
                    password: this.password,
                }
                this.$store.dispatch("login", data)
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

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.formBox{
    width: 90%;
}

.picture img {
    max-height: 100vh;
    max-width: 100%;
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
    width: auto;
    margin: auto;
}

.btnHome {
    width: 50%;
    font-size: 1.3rem;
    height: 3rem;
    border: solid 1px #333;
    cursor: pointer;
}

.connexion p {
    padding: 25px 52px 40px 52px;
}

.formBox h3 {
    text-align: left;
    margin-bottom: 10px;
    
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

}
</style>