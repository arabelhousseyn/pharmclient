import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jquery from 'jquery'
window.$ = window.jquery = jquery
import 'popper.js'
import 'bootstrap';
import './scss/app.scss'
import './css/app.css'
import 'fontawesome'
import Carousel3d from 'vue-carousel-3d'
import common from './sharer/common'
import './sharer/app'
Vue.mixin(common)
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch,faCheckCircle,faLock,faRecycle,faCartPlus,faPlus,faHome,faMinus,faBoxes,faArrowLeft,faBinoculars,faFilePdf,faTimes,faArrowRight,faListAlt,faExclamation,faClipboardCheck,faEye} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import InfiniteLoading from 'vue-infinite-loading'
library.add(faSearch)
library.add(faCheckCircle)
library.add(faLock)
library.add(faRecycle)
library.add(faCartPlus)
library.add(faPlus)
library.add(faHome)
library.add(faMinus)
library.add(faBoxes)
library.add(faArrowLeft)
library.add(faBinoculars)
library.add(faFilePdf)
library.add(faTimes)
library.add(faArrowRight)
library.add(faListAlt)
library.add(faExclamation)
library.add(faClipboardCheck)
library.add(faEye)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(InfiniteLoading)
Vue.use(Carousel3d)



import VueTypedJs from 'vue-typed-js'
Vue.use(VueTypedJs)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
