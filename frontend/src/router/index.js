import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signUp', name: 'SignUp', component: () => import("../views/SignUp.vue") },
  { path: '/PostPage', name: 'PostPage', component: () => import("../views/PostPage.vue") },
  { path: '/post/edit/:id', name: 'EditPost', component: () => import("../views/EditPost.vue")},
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
