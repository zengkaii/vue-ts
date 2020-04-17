import { GlobalType } from '@/global'
import GlobalDefine from '@/global/globalDefine'

export interface ProgressEvent {
    loaded: number,
    total: number,
    percent: number
}

export const RequestType = new GlobalDefine<Request>(Symbol('Request'))
export default interface Request extends GlobalType {
    getToken(): string
    setToken(token?: string): void

    post<T>(url: string, params: any, header?: any): Promise<T>
    postJson<T>(url: string, params: any, header?: any): Promise<T>
    postPercent<T>(
        url: string, params: any,
        percentCallback: (event: ProgressEvent) => void, header?: any): Promise<T>,

    put<T>(url: string, params: any, header?: any): Promise<T>

    get<T>(url: string, params: any, header?: any): Promise<T>
    del<T>(url: string, params: any, header?: any): Promise<T>

    getAuthorizationHeader(): {Authorization?: string}
}
