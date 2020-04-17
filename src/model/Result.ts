export default interface Result<T> {
    code: number
    success: boolean
    msg: string
    data: T
}
