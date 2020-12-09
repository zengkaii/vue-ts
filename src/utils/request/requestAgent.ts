import Superagent from 'superagent'
import Result from '@/model/Result.ts'
import ResponseInterceptor from './responseInterceptor'
import Request, { ProgressEvent, RequestType } from './request'
function object2KeyValueParnter(obj: any = {}) {
    if (typeof obj !== 'object') {
        return []
    }
    const params: string[] = []
    Object.keys(obj).forEach(k => {
        let val = obj[k]
        if (val !== '' && val !== undefined && val !== null) {
            if (Array.isArray(val)) {
                val = val.join(',')
            } else if (val instanceof Date) {
                val = val.getTime()
            } else if (typeof val === 'string') {
                val = val.trim()
            }
            params.push(`${k}=${encodeURIComponent(val)}`)
        }
    })
    return params
}
function serialize(obj: {}) {
    const params = object2KeyValueParnter(obj)
    return params.join('&')
}
Superagent.serialize['application/x-www-form-urlencoded'] = serialize

export default class SuperagentRequest implements Request {
    public type = RequestType
    private token?: string
    private authorizationHeader: {Authorization?: string} = {}
    private responseInterceptor: ResponseInterceptor

    constructor(responseInterceptor: ResponseInterceptor, token?: string) {
        this.responseInterceptor = responseInterceptor
        this.setToken(token)
    }
    public requestProcess<T>(thenable: Promise<any>) {
        return new Promise<T>((resolve, reject) => {
            thenable.then((response) => {
                this.responseInterceptor.afterRequest(response)
                const data = response.body as Result<any>
                if (response.status !== 200) {
                    reject(response)
                } else if (data.success) {
                    resolve(data.data)
                } else {
                    reject(data)
                }
            }).catch(({status, message, response}) => {
                this.responseInterceptor.afterRequest(response)
                console.error(response)
                reject({code: status, msg: message})
            })
        })
    }
    public getToken() {
        return this.token || ''
    }
    public setToken(token?: string) {
        if (token) {
            this.token = token
            this.authorizationHeader = {Authorization: token}
        }
    }
    public getAuthorizationHeader() {
        return this.authorizationHeader
    }

    public post<T>(url: string, params: any, header: any = this.authorizationHeader) {
        return this.requestProcess<T>(Superagent.post(url).type('form').send(params).set(header))
    }
    public postJson<T>(url: string, params: any, header: any = this.authorizationHeader) {
        return this.requestProcess<T>(Superagent.post(url).send(params).accept('application/json').set(header))
    }
    public postPercent<T>(
        url: string, params: any, header: any = this.authorizationHeader,
        percentCallback: (event: ProgressEvent) => void) {
        return this.requestProcess<T>(Superagent.post(url).send(params).set(header).on(`progress`, e => {
            percentCallback({
                loaded: e.loaded || 0,
                total: e.total || 0,
                percent : e.percent || 0
            })
        }))
    }
    public put<T>(url: string, params: any, header: any = this.authorizationHeader) {
        params = serialize(params)
        return this.requestProcess<T>(Superagent.put(`${url}?${params}`).type('json').send().set(header))
    }
    public get<T>(url: string, params: any, header = this.authorizationHeader) {
        let buildGet = Superagent.get(url)
        object2KeyValueParnter(params).forEach(param => {
            buildGet = buildGet.query(param)
        })
        return this.requestProcess<T>(buildGet.set(header))
    }
    public del<T>(url: string, params: any, header = this.authorizationHeader) {
        return this.requestProcess<T>(Superagent.del(url).query(params).set(header))
    }
}
