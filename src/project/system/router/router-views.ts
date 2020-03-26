import { RouteConfig } from 'vue-router'
const routerChildren = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/index.vue')
    }
] as RouteConfig[]

export default routerChildren
