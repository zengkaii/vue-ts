import api from '@/utils/request2/api'
export const all = (params: any) => {
    console.log(params)
    return api.get('/string/all', params)
}
export const allPost = (params: any) => {
    console.log(params)
    return api.post('/post-test', params)
}
