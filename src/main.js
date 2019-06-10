import Vue from 'vue'
import App from './App.vue'

import {rtdbPlugin} from 'vuefire'
import VueRouter from 'vue-router'
import {routes} from './routes'
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

Vue.use(rtdbPlugin)
Vue.use(VueRouter)
Vue.config.productionTip = false

let app;

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) =>{
//   let currentUser = firebase.auth().currentUser;
//   let reqAuth = to.matched.some(record=> record.meta.requiresAuth);

//   if(reqAuth && !currentUser) next('/login')
//   else next()
// })

firebase.auth().onAuthStateChanged(function(){
  if(!app){
    
    app = new Vue({
      render: h => h(App),
      router
    }).$mount('#app')
  }
});
