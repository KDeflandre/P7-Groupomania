import { createStore } from 'vuex'
import axios from "axios";
import router from "../router/index";

export default createStore({
  state: {
    editPost: null,
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
  },
  getters: {
    getToken(state) {
      return state.token
    },
    isLogged(state) {
      if (state.email && state.token) {
        return true
      }
      return false
    },
    isAdmin(state) {
      if (this.isLogged && state.user.isAdmin) {
        return true
      }
      return false
    }
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, user) {
      this.state.user = user
      localStorage.setItem("user", JSON.stringify(user))
    },
    updateToken(state, token) {
      this.state.token = token
      localStorage.setItem("token", token)
    },
    removeToken(state) {
      this.state.token = null
      localStorage.removeItem("token")
    },
    removeUser(state) {
      this.state.user = {}
      localStorage.removeItem("user")
    }
  },
  actions: {
    signup(context, data) {
      axios
        .post("http://localhost:3000/api/auth/signup", data)
        .then((response) => {
          context.commit('updateUser', response.data.user)
          context.commit('updateToken', response.data.token)
          // this.$router.push({ name: "PostPage" }); //REDIRECT
          router.push({ name: "PostPage" });
        })
        .catch((err) => {
        });
    },
    login(context, data) {
      axios
        .post("http://localhost:3000/api/auth/login", data)
        .then((response) => {
          context.commit("updateUser", response.data.user)
          context.commit("updateToken", response.data.token)
          router.push({ name: "PostPage" });
        })
        .catch((err) => {
        });
    },
    logout(context) {
      context.commit("removeToken")
      context.commit("removeUser")
    }
  },
  modules: {
  }
})