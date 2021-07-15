import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './modules/user/user.store'

Vue.use(Vuex)

const store = new Vuex.Store(userStore)

export default store
