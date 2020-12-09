import ResponseInterceptor from './ResponseInterceptor'
import Result from '@/model/Result'
import HttpResponse from './HttpResponse'
interface BaseResponseInterceptorOptions {
    msg: (data?: string) => void
    alert: (data: string) => void
    exit?: (response: HttpResponse) => void
}

export default class BaseResponseInterceptor implements ResponseInterceptor {
    private options: BaseResponseInterceptorOptions
    constructor(options: BaseResponseInterceptorOptions) {
        this.options = options
    }

    public afterRequest(response: HttpResponse): void {
        this.baseProcessResponse(response)
    }

    public baseProcessResponse(response: HttpResponse) {
        const result = response.body as Result<any>
        if (result) {
            if (!result.success) {
                switch (result.code) {
                case 10001:
                    this.errorMsg('登录已过期，请重新登录')
                    // this.options.exit(response)
                    break
                case 34012:
                    this.options.alert(result.msg)
                    break
                default:
                    this.errorMsg(result.msg)
                    break
                }
            }
        } else {
            switch (response.statusCode) {
            case 200:
                break
            case 404:
                this.errorMsg('404 NOT FOUND')
                break
            case 0:
                this.errorMsg('互联网链接中断，请检查网络情况')
                break
            case 504:
                this.errorMsg('无法连接到服务器，请检查网络情况')
                break
            default:
                console.error(response)
                this.errorMsg(response.statusText)
                break
            }
        }
    }

    private errorMsg(msg?: string) {
        this.options.msg(msg)
    }

}
