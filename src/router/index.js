import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path : "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/forget',
    name : 'forget',
    component: () => import(/* webpackChunkName: "forget" */ '../views/forget.vue'),
    
  },
  {
    path: '/verification/',
    name : 'verification',
    component: () => import(/* webpackChunkName: "verification" */ '../views/verification.vue'),
    
  },

  {
    path: '/disconnect/',
    name : 'disconnect',
    component: () => import(/* webpackChunkName: "disconnect" */ '../views/disc.vue'),
    
  },
  {
    path: '/profile/:name',
    name : 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile.vue'),
    props : true
  },
  {
    path: '/categorie/:name',
    name : 'categorie',
    component: () => import(/* webpackChunkName: "categorie" */ '../views/categorie.vue'),
    props : true
  },
  {
    path: '/search/',
    name : 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue'),
    props : true
  },
  {
    path: '/cart/',
    name : 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/cart.vue'),
    props : true
  },
  {
    path: '/success/',
    name : 'success',
    component: () => import(/* webpackChunkName: "success" */ '../views/success.vue'),
  },
  {
    path: '/commandes/',
    name : 'commande',
    component: () => import(/* webpackChunkName: "commande" */ '../views/commande.vue'),
  },
  {
    path: '/commande/:reff',
    name : 'cmnds',
    component: () => import(/* webpackChunkName: "display" */ '../views/display.vue'),
    props : true
  },
  {
    path: '/reports/',
    name : 'report',
    component: () => import(/* webpackChunkName: "report" */ '../views/report.vue'),
    props : true
  },
  {
    path : '*',
    name : '404',
    component: () => import(/* webpackChunkName: "404Comp" */ '../components/404Comp.vue'),
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
