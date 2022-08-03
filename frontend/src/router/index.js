import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import PostPage from '../views/PostPage.vue';

const routes = [
  {
    path: '/',
    name: 'PostPage',
    component: PostPage,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue"),
    meta: {
      requireNotLoggedIn: true
    }
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import("../views/SignUp.vue"),
    meta: {
      requireNotLoggedIn: true
    }
  },
]
// Return sur les bonne pages en fonction de si nous sommes log ou pas 
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requireLogin && !store.getters.isLogged) {
    return {
      path: '/login',
    }
  } else if (to.meta.requireNotLoggedIn && store.getters.isLogged) {
    return {
      path: '/',
    }
  }
})

export default router
