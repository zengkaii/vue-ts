import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Types from './store/types'
import InitType from './model/InitType'

// import requestAgent from '@/utils/request/requestAgent'
// import ElementUIResponseIntercpetorFactory from '@/utils/request/elementUIResponseIntercpetorFatcotry'
// import { ApplicationContext } from '@/global'
// import { Config } from './config'
Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = false
const init: InitType = {
  async login() {
    await store.dispatch(Types.LOGIN)
    // await store.commit(Types.LOGIN)
  }
}
const app = new Vue({
  name: 'App',
  router,
  store,
  render: h => h(App),
  data() {
      return {
          initLoadPromise: Promise.resolve()
      }
  },
  methods: init,
}).$mount('#app') as any
// new Vue({
//   router,
//   store,
//   render: h => h(App),
//   methods: init,
// }).$mount('#app')
// const interceptor = ElementUIResponseIntercpetorFactory()
// const request = new requestAgent(interceptor)
// ApplicationContext.setBean(request)
// ApplicationContext.setBean(new Config())
