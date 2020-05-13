import { createProxy } from './index'
import Testparam from './model/test'


interface BsSysparamController {
    all(): Promise<Testparam[]>
}
export default createProxy<BsSysparamController, Testparam>({
    baseUrl: 'string',
    requestPathMap: {
    },
    requestMethodMap: {
        all: 'get'
    },
})
