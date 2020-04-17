import HttpResponse from './httpResponse'

export default interface ResponseInterceptor {
    afterRequest: (response: HttpResponse) => void
}
