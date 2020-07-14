import { RouteConfig } from 'vue-router'
const routerChildren = [
    {
        path: '/',
        name: '/',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/index.vue')
    },
    {
        path: '/menu-page',
        name: 'menu-page',
        component: () => import('../views/menu-page/index.vue')
    }
] as RouteConfig[]

export default routerChildren
