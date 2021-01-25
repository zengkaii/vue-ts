import api from '@/utils/request2/api'
import {DeleteMenu} from './model/menuApi'
export const menuList = (params?: any) => {
    return api.get('/menuApi/menu/list', params) as Promise<any>
}

export const saveMenu = (params?: any) => {
    return api.postJson('/menuApi/menu/save', params) as Promise<any>
}

export const deleteMenu = (params: DeleteMenu) => {
    return api.postJson('/menuApi/menu/delete', params) as Promise<any>
}
