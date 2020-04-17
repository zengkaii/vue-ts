import { Route } from 'vue-router'
export default interface ApplicationInterface {
    login(): any
    isLogin(): boolean
    noPagePermission(to: Route): void
    exit(): void
    permissionPromise(): Promise<{
        allPermission: string[],
        userPermission: string[]
    }>
}
