import Superagent from 'superagent'
import Result from '@/model/Result.ts'
const superagent = Superagent
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

function requestProcess<T>(thenable: Promise<any>) {
    return new Promise<T>((resolve, reject) => {
        thenable.then((response) => {
            const data = response.body as Result<any>
            if (response.status !== 200) {
                reject(response)
            } else if (data.success) {
                resolve(data.data)
            } else {
                reject(data)
            }
        }).catch(({status, message, response}) => {
            console.error(response)
            reject({code: status, msg: message})
        })
    })
}
export default {
    post(url: string, params: any, header: any) {
        return Superagent.post(url).type('form').send(params).set(header)
    },
    postJson(url: string, params: any, header: any) {
        return Superagent.post(url).send(params).accept('application/json').set(header)
    },
    // postPercent(url, params, header, percentCallback) {
    //     return Superagent.post(url).send(params).set(header).on(`progress`, e => {
    //         if (typeof percentCallback === 'function') {
    //             percentCallback(e)
    //         }
    //     })
    // },
    // put(url, params, header) {
    //     params = serialize(params)
    //     return Superagent.put(`${url}?${params}`).type('json').send().set(header)
    // },
    // putAllKey(url, params, header) {
    //     params = object2KeyValueParnterWithNull(params).join('&')
    //     return Superagent.put(`${url}?${params}`).type('json').send().set(header)
    // },
    get(url: string, params: any, header = {}) {
        let buildGet = Superagent.get(url)
        object2KeyValueParnter(params).forEach(param => {
            buildGet = buildGet.query(param)
        })
        return buildGet.set(header)
    },
    // del(url, params, header) {
    //     return Superagent.del(url).query(params).set(header)
    // },
    // AuthorizationHeader(token) {
    //     return {
    //         [Const.AUTHORIZATION_HEADER]: token
    //     }
    // }
}
