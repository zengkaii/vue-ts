import { ApplicationContext } from '@/global'
import { RequestType, ProgressEvent } from '@/utils/request/Request'
import { ProjectConfigType } from '@/model/ProjectConfig'
import PageResult from '../model/PageResult'
interface ServiceProxyOptions {
    rootUrl?: string,
    baseUrl?: string,
    requestMethodMap?: {
        [key: string]: string
    },
    requestPathMap?: {
        [key: string]: string
    }
}

export default class BaseService<E> {
    rootUrl = ''
    baseUrl = ''
    public createProxy<T>(options?: ServiceProxyOptions) {
        const target = this
        if (options) {
            const {rootUrl, baseUrl, requestMethodMap, requestPathMap} = options
            target.rootUrl = rootUrl || target.rootUrl
            target.baseUrl = baseUrl || target.baseUrl
        }
        return new Proxy(target, {
            get(proxy: any, key: string) {
                return (...form: any) => {
                    if (proxy[key] instanceof Function) {
                        return proxy[key](...form)
                    } else {
                        let url
                        let requestMethod = proxy.post
                        if (options) {
                            const {requestMethodMap, requestPathMap} = options
                            if (requestPathMap && requestPathMap[key]) {
                                url = requestPathMap[key]
                            } else {
                                url = key.replace(/([A-Z])/g, '-$1').toLowerCase()
                            }
                            url = target.buildUrl(url)
                            if (requestMethodMap) {
                                requestMethod = proxy[requestMethodMap[key] || 'post']
                            }
                        }
                        return requestMethod.call(target, url, ...form)
                    }
                }
            }
        }) as T
    }

    buildUrl(url: string = '') {
        if (this.baseUrl && !url.startsWith('/')) {
            url = this.baseUrl + '/' + url
        }
        const httpRoot = this.rootUrl || this.getProjectConfig().httpRoot
        if (httpRoot && !url.startsWith('/')) {
            url = httpRoot + '/' + url
        }
        return url
    }

    public getProjectConfig() {
        return ApplicationContext.getBean(ProjectConfigType)
    }

    public getRequest() {
        return ApplicationContext.getBean(RequestType)
    }

    public post<T>(url: string, params: object = {}) {
        return this.getRequest().post<T>(url, params)
    }

    public get<T>(url: string, params: object = {}) {
        return this.getRequest().get<T>(url, params)
    }

    public postJson<T>(url: string, params: object = {}) {
        return this.getRequest().postJson<T>(url, params)
    }

    public put<T>(url: string, params: object = {}) {
        return this.getRequest().put<T>(url, params)
    }

    public delete<T>(url: string, params: object = {}) {
        return this.getRequest().del<T>(this.buildUrl(url), params)
    }

    public postPercent<T>(url: string, params: object = {}, percentCallback: (event: ProgressEvent) => void) {
        return this.getRequest().postPercent<T>(url, params, percentCallback)
    }

    /**
     * 通用分页查询接口
     */
    public list(form?: any) {
        return this.get<PageResult<E>>(this.buildUrl(), form)
    }

    /**
     * 通用保存接口
     */
    public save(form: any) {
        return this.post<E>(this.buildUrl(), form)
    }

    /**
     * 通用更新接口
     */
    public update(form: any) {
        return this.put<E>(this.buildUrl(), form)
    }

    /**
     * 通用通过ID获取对象
     */
    public getById(id: any) {
        return this.get<E>(this.buildUrl() + id)
    }

    public deleteById(id: any) {
        return this.delete(this.buildUrl() + id)
    }
}

export function createProxy<T, E>(options?: ServiceProxyOptions) {
    const proxy = new BaseService()
    return proxy.createProxy(options) as T & BaseService<E>
}
