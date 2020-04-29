import Vue from 'vue'
import Vuex from 'vuex'
import { MenuList } from '@/model/Store.ts'
import Types from './types'
Vue.use(Vuex)

export interface StoreState {
  isLogin: boolean
  menuList: MenuList[],
  dynamicTags: MenuList[]
}
export default new Vuex.Store<StoreState>({
  state: {
    isLogin: false,
    menuList: [{
      id: 1,
      label: '数据看板',
      children: [{
        id: 4,
        label: '看板一1',
        path: '/dashboard'
      },{
        id: 10,
        label: '看板二1',
        path: '/dashboard2'
      },{
        id: 9,
        label: '看板三',
        path: '/dashboard3'
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
    }],
    dynamicTags: []
  },
  mutations: {
    // 添加tags
    [Types.SET_DYNAMIC_TAGS](state, dynamicTags) {
      state.dynamicTags.push(dynamicTags)
    },
    // 移除tags
    [Types.REMOVE_DYNAMIC_TAGS](state, index) {
      state.dynamicTags.splice(index, 1)
    },
    // 登录
    [Types.LOGIN](state, isLogin) {
      state.isLogin = isLogin
    }

  },
  getters: {
    isLogin: state => state.isLogin,
    dynamicTags: state => state.dynamicTags
  },
  actions: {
    [Types.SET_DYNAMIC_TAGS]({ commit }, dynamicTags) {
      console.log(Types.SET_DYNAMIC_TAGS)
      commit(Types.SET_DYNAMIC_TAGS, dynamicTags)
    },
    [Types.REMOVE_DYNAMIC_TAGS]({ commit }, dynamicTags) {
      console.log(Types.REMOVE_DYNAMIC_TAGS)
      commit(Types.REMOVE_DYNAMIC_TAGS, dynamicTags)
    },
    [Types.LOGIN]() {
      console.log(Types.LOGIN)
      this.commit(Types.LOGIN, true)
    },
  }
})
