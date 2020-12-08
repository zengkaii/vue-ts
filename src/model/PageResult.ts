export default interface PageResult<T = object> {
    pageCount?: number
    total?: number
    currentPage: number
    pageSize: number
    data?: T[]
}
