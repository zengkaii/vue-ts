export default class GlobalDefine<T> {
    private define: symbol
    constructor(define: symbol) {
        this.define = define
    }
    public getDefine() {
        return this.define
    }
}
