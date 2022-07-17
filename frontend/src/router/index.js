import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import PostPage from "../views/PostPage.vue";
// import Profile from "../views/Profile.vue";
import EditPublication from "../views/EditPublication.vue";

// import NotFound from "../views/NotFound.vue";



const routes = [
  { path: '/signUp', name: 'SignUp', component: SignUp },
  { path: '/', name: 'Home', component: Home },
  { path: '/PostPage', name: 'PostPage', component: PostPage},
  { path: '/publication/edit/:id', name: 'EditPublication', component: EditPublication},
  // { path: '/profile' , name: Profile, component: Profile},
  
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
