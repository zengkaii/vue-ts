import Vue from 'vue'
import App from '../../App.vue'
import './registerServiceWorker'
import router from './router/router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Types from './store/types'
import InitType from './model/InitType'
Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = false
const init: InitType = {
  async login() {
    await store.dispatch(Types.LOGIN)
    // await store.commit(Types.LOGIN)
  }
}
new Vue({
  router,
  store,
  render: h => h(App),
  methods: init,
}).$mount('#app')
