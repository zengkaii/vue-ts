import Request from './request'
function AuthorizationHeader(tokens: any) {
    return {
        Authorization: tokens
    }
}

function requestProcess(thenable: Promise<any>) {
    return new Promise((resolve, reject) => {
        thenable.then((response) => {
            // Interceptor.afterRequest(response)
            const data = response.body
            if (response.status !== 200) {
                reject(response)
            } else if (data.success) {
                resolve(data)
            } else {
                reject(data)
            }
        }).catch(({status, message, response}) => {
            // Interceptor.afterRequest(response)
            console.error(response)
            reject({code: status, msg: message})
        })
    })
}
const token = '' as any
export default {
    // setToken(tokenData) {
    //     token = tokenData
    // },
    // getToken() {
    //     return token
    // },
    // authHeader() {
    //     return AuthorizationHeader(token)
    // },
    // baseRequest(type, url, params, headers, callback) {
    //     Interceptor.beforeRequest({type, url, params, headers})
    //     return Request[type](url, params, headers, callback)
    // },
    postJson(url: string, params: any) {
        return requestProcess((Request.postJson(url, params, AuthorizationHeader(token))))
    },
    // postPercent(url, params, percentCallback) {
//     return requestProcess(this.baseRequest('postPercent', url, params, AuthorizationHeader(token), percentCallback))
    // },
    post(url: string, params: any) {
        return requestProcess(Request.post(url, params, AuthorizationHeader(token)))
    },
    // put(url, params) {
    //     return requestProcess(this.baseRequest('put', url, params, AuthorizationHeader(token)))
    // },
    // putAllKey(url, params) {
    //     return requestProcess(this.baseRequest('putAllKey', url, params, AuthorizationHeader(token)))
    // },
    // del(url, params) {
    //     return requestProcess(this.baseRequest('del', url, params, AuthorizationHeader(token)))
    // },
    get(url: string, params: any) {
        // console.log(requestProcess(Request.get(url,params,AuthorizationHeader(token))))
        return requestProcess(Request.get(url, params, AuthorizationHeader(token)))
    }
}
