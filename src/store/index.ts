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
        menuList: [
            {
                id: 1,
                label: '管理',
                type: 'bar',
                children: [
                    {
                        id: 4,
                        label: '看板',
                        path: '/dashboard',
                        type: 'menu'
                    },
                    {
                        id: 10,
                        label: '菜单',
                        path: '/menu-page',
                        type: 'menu'
                    },
                    {
                        id: 8,
                        label: '管理',
                        type: 'bar',
                        children: [
                            {
                                id: 9,
                                label: '看板',
                                path: '/dashboard',
                                type: 'menu'
                            },
                            {
                                id: 7,
                                label: '菜单',
                                path: '/menu-page',
                                type: 'menu'
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                label: '管理',
                type: 'bar',
                children: [
                    {
                        id: 5,
                        label: '看板',
                        path: '/dashboard',
                        type: 'menu'
                    },
                    {
                        id: 6,
                        label: '菜单',
                        path: '/menu-page',
                        type: 'menu'
                    }
                ]
            }
        ],
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
        dynamicTags: state => state.dynamicTags,
        menuList: state => state.menuList
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
