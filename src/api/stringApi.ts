import api from '@/utils/request2/api'
export const all = (params: any) => {
    return api.get('/string/all', params)
}
export const allPost = (params: any) => {
    return api.post('/post-test', params)
}
