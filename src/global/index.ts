import GlobalDefine from './GlobalDefine'


export interface GlobalType {
    type: GlobalDefine<any>
}

class Context {
    private context = new Map<symbol, any>()
    public getBean<T>(arg: GlobalDefine<T>): T {
        return this.context.get(arg.getDefine()) || {}
    }
    public setBean(arg: GlobalType) {
        this.context.set(arg.type.getDefine(), arg)
    }
}
export const ApplicationContext = new Context()
