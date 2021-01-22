import api from '@/utils/request2/api'
export const menuList = (params?: any) => {
    return api.get('/menuApi/menu/list', params) as Promise<any>
}
export const saveMenu = (params?: any) => {
    return api.postJson('/menuApi/menu/save', params) as Promise<any>
}
