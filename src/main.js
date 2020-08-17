import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VTooltip from 'v-tooltip'

import './main.less'

Vue.use(VTooltip)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
