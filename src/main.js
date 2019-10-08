// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from '@/plugins/vuetify'
import Vue from 'vue'
import App from './App'
import router from './router'
import { auth } from './api'
import { store } from './store'
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

Vue.config.productionTip = false
// const unsubscribe = firebase
//   .auth()
//   .onAuthStateChanged((firebaseUser) => {
//     new Vue({
//       el: '#app', router, store, template: '<App/>', components: {
//         App
//       },
//       created() {
//         store.dispatch('autoSignIn', firebaseUser)
//       }
//     })
//    unsubscribe()
// })

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>',

//   created () {
//     firebase.auth().onAuthStateChanged((firebaseUser) => {
//       if (firebaseUser) {
//         store.dispatch('autoSignIn', firebaseUser)
//       }
//     })
//   }

// })

const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
    new Vue({
      vuetify,
      el: '#app', router, store, template: '<App/>', components: {
        App
      },
      created() {
        store.dispatch('autoSignIn', firebaseUser)
      }
    })
   unsubscribe()
})
