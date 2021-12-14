import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import i18n from './i18n'
// import VeeValidate from 'vee-validate'

// sweet alert
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'admin-lte/plugins/jquery/jquery'
import $ from 'jquery'
window.$ = $
window.jQuery = $
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'admin-lte/plugins/fontawesome-free/css/all.css'
import 'admin-lte/dist/css/adminlte.css'
import 'admin-lte/dist/js/adminlte'

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
}

axios.defaults.baseURL = 'http://school-management-api.test/api'
// if (store.state.auth.user) {
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.user.access_token
// }
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Vue.use(VeeValidate)
Vue.use(VueSweetalert2, options)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
