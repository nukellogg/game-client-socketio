import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3080')

Vue.config.productionTip = false

Vue.use(VueSocketIOExt, socket)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
