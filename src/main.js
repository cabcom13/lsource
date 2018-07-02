// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCodeMirror from 'vue-codemirror-lite'

import VueFire from 'vuefire'
import 'firebase/firestore'

import Vuetify from 'vuetify'

Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueCodeMirror)

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'codemirror/lib/codemirror.css'
import './main.css'
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
