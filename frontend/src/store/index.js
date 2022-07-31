import { createStore } from 'vuex'
import axios from "axios";
import router from "../router/index";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token"),
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getUserId(state) {
      if (state.user.email) {
        return state.user.userId
      }
      return false
    },
    getUserFirstName(state) {
      if (state.user.userId) {
        return state.user.firstName
      }
      return false
    },
    getUserInfos(state) {
      if (state.user.userId) {
        return state.user.email, state.user.firstName, state.user.lastName
      }
      return false
    },
    isLogged(state) {
      if (state.user.email && state.token) {
        return true
      }
      return false
    },
    isAdmin(state) {
      if (state.user.email && state.token && state.user.role) {
        return true
      }
      return false
    }
  },
  mutations: {
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
    },
  },
  actions: {
    signup(context, data) {
      axios
        .post("http://localhost:3000/api/auth/signup", data)
        .then((response) => {
          context.commit('updateUser', response.data.user)
          context.commit('updateToken', response.data.token)
          router.push({ name: "PostPage" });
        })
        .catch(error => {
          this.error = true;
          this.errorMsg = error.response.message;
          console.log(error.response.data.message);

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
      router.push({ name: "Login" });
    },

  },
  modules: {
  }
})