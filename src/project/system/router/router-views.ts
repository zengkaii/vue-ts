import { RouteConfig } from 'vue-router'
const routerChildren = [
    {
        path: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/home-2',
        component: () => import('../views/home/index.vue')
    },
] as RouteConfig[]

export default routerChildren
