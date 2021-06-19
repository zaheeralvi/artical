import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTree from '@ssthouse/vue-tree-chart'

Vue.component('vue-tree', VueTree)


// import MyPlugin from './plugins/my-plugin'

Vue.use(BootstrapVue)
// Vue.use(MyPlugin)

Vue.config.productionTip = false
Vue.prototype.$log = console.log

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
