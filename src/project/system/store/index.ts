import Vue from 'vue'
import Vuex from 'vuex'
import { MenuList } from '@/model/Store.ts'
import Types from './types'
Vue.use(Vuex)

export interface StoreState {
  isLogin: boolean
  menuList: MenuList[]
}
export default new Vuex.Store<StoreState>({
  state: {
    isLogin: false,
    menuList: [{
      id: 1,
      label: '数据看板',
      children: [{
        id: 4,
        label: '看板一',
        path: '/dashboard'
      },{
        id: 10,
        label: '看板二',
        path: '/dashboard'
      },{
        id: 9,
        label: '看板三',
        path: '/dashboard'
      },]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
  },
  mutations: {
  },
  getters: {
    isLogin: state => state.isLogin
  },
  actions: {
  }
})
