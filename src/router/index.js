/*
  * index.js
  * Router link to all component. 
  * @author natirut duangpak 59161030
  * @create Date	2019-09-05
*/
import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
Vue.use(Router);
const routerOptions = [
  {
    path: '/',
    component: 'v_login',
    meta:{title: 'Login'}
  },
  {
    path: '/signup',
    component: 'v_signup',
     title: 'Home',
     meta:{title: 'Signup'}
  },

  {
  path: '/person/:timeStart/:timeEnd',
    component: 'v_person',
    meta:{
      requiresAuth:true,
      title: 'Person'
    }
  },

  {
    path: '/home',
    component: 'v_home',
    meta:{
      requiresAuth:true,
      title: 'Home'
    }
  },
]

/*
	* routerOptions
	* import component. 
	* @author natirut duangpak 59161030
	* @create Date	2019-09-05
*/
const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import (`@/components/${route.component}.vue`),
    meta: route.meta
  }
})

/*
	* Router
	* redirect path root
	* @author natirut duangpak 59161030
	* @create Date	2019-09-05
*/
const router = new Router({
  mode: 'history',
  routes: [
    ...routes, {
      path: '*',
      redirect: '/'
    }
  ]
})

/*
	* beforeEach
	* check requiresAuth if null go to login
	* @author natirut duangpak 59161030
	* @create Date	2019-09-05
*/
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const requiresAuth = to
    .matched
    .some(record => record.meta.requiresAuth)
  const user = firebase
    .auth()
    .currentUser
  if (requiresAuth && !user) {
    next('/')
  }
  next()
})

export default router