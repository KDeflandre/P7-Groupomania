import { createStore } from 'vuex'

export default createStore({
  state: {
    editPost: null,
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
