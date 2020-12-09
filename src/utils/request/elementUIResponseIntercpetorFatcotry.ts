import BaseResponseInterceptor from './baseResponseInterceptor'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ApplicationInterface from '@/model/ApplicationInterface'

let showStack: string[] = []
let currentTimer: any = 0
export default function(exitAble: ApplicationInterface) {
    return new BaseResponseInterceptor({
        msg(msg) {
            showStack.push(msg || '网络异常')
            clearTimeout(currentTimer)
            currentTimer = setTimeout(() => {
                if (showStack.length) {
                    const data = showStack.pop() as string
                    ElementUI.Message.error(data)
                    showStack = []
                }
            }, 500)
        },
        alert(msg) {
            ElementUI.MessageBox.alert(msg)
        },
        exit() {
            exitAble.exit()
        }
    })
}
