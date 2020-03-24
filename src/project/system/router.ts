import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterViews from './router-views'
import About from './views/About.vue'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  base: 'system',
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/home',
      component: About,
      children: RouterViews
    },
  ]
})
