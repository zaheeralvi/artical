import { ADD_NAME, UPDATE_ACTIVE_INDEX, UPDATE_ACTIVE_ITEM, UPDATE_ACTIVITY_LIST, UPDATE_LOGIN_STATUS, UPDATE_TOKEN } from '../../mutations-type'

export default {
  [ADD_NAME](state, payload) {
    state.name = payload
  },

  [UPDATE_LOGIN_STATUS](state, payload) {
    state.isUserLoggedIn = payload
  },

  [UPDATE_LOGIN_STATUS](state, payload) {
    state.isUserLoggedIn = payload
  },

  [UPDATE_TOKEN](state, payload) {
    state.token = payload
  },

  [UPDATE_ACTIVITY_LIST](state, payload) {
    state.topicList = payload
  },

  [UPDATE_ACTIVE_INDEX](state, payload) {
    state.activeIndex = payload
  },

  [UPDATE_ACTIVE_ITEM](state, payload) {
    state.activeItem = payload
  },
}
