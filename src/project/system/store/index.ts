import Vue from 'vue'
import Vuex from 'vuex'
import Types from './types'
Vue.use(Vuex)

export interface StoreState {
  isLogin: boolean
}
export default new Vuex.Store<StoreState>({
  state: {
    isLogin: false
  },
  mutations: {
  },
  getters: {
    isLogin: state => state.isLogin
  },
  actions: {
  }
})
