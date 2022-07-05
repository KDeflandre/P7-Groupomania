<template>
<div class="home">
    <aside class="section1">
     <div class="picture">
       <img src="../../assets/Banner-home.png" alt="Logo de l'entreprise groupomania" title="logo groupomania"/>
    </div>    
    </aside>
    <div class="section2">
         <div class="connexion">
         <div id="logo">
            <a href="http://localhost:8080/"> <img src="../../assets/Groupomania-ok.png" alt="Logo de l'entreprise groupomania" title="logo groupomania" /></a>
        </div>
        
        <div v-if="page === 'login'">
                    <h1>Bienvenue sur votre réseau social d'entreprise</h1>
                    <p>Ce portail a été mis en place pour simplifier la communication au sein de l’entreprise
                        Groupomania. Pour cela vos devez vous connecter.</p>
                    <form class="formBox">
                        <h3>Email</h3>
                        <input type="email" v-model="email" placeholder="Votre Email" @change="validateEmail">
                        <div class="alignleft" v-if="errors.email">{{ errors.email }}</div>
                        <h3>Mot de passe </h3>
                        <input type="password" v-model="password" placeholder="Mot de Passe">
                        <input type="submit" @click.prevent="sendForm" class="btnHome" value="Connexion" >
                    </form>
                    <div class="registerArea">
                    <div class="txtRegister">Vous n'avez pas de compte ?</div>
                    <div class="signup" @click="page = 'signup'">
                        Créer un compte
                    </div>
                    </div>
                </div>
                <div v-if="page === 'signup'">
                    <h1>Pour nous rejoindre, complétez votre inscription</h1>
                    <form class="formBox">
                        <h3>Nom</h3>
                        <input type="text" v-model="lastname" placeholder="Martin" required>
                        <h3>Prénom</h3>
                        <input type="text" v-model="name" placeholder="Bertrand" required>
                        <h3>Email</h3>
                        <input type="email" v-model="email" placeholder="martin-bertrand@gmail.com" required>
                        <h3>Mot de passe</h3>
                        <input type="password" v-model="password" placeholder="Mot de Passe" required>
                        <h3>Confirmation du mot de passe</h3>
                        <input type="password" v-model="confirmpassword" placeholder="Confirmation mot de passe" required>
                        <input type="submit" @click.prevent="sendForm" class="btnHome" value="Inscription" >
                    </form>
                    <div class="registerArea">
                    <div class="txtRegister">Vous avez déjà un compte ?</div>
                    <div class="returnLogin" @click="page = 'login'">
                        Se connecter
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoginStuff',
    data() {
        return {
            userId: localStorage.getItem("userId"),
            page: "login",
            lastname: "",
            name: "",
            birthdate: "",
            email: "",
            password: "",
            errors: {}
        }
    },
    methods: {
        validate(regx, name, message) {
            delete this.errors[name]
            if (!this[name].test(regx)) this.errors[name] = message
        },
        sendForm() {
            this.validate("\[Az]@\g", "email", "Email non valide")
            this.validate("\[Az]@\g", "firstname", "Votre prénom ne doit contenir que blabla")

            if (Object.keys(this.errors).length != 0) return
            this.$store.commit("login", this.email, this.password)
        }
    }
}
</script>
<style src='./LoginStuff.css'>
</style>