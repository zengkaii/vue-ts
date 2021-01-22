export interface MenuList {
    id: number
    label: string
    path?: string,
    type: string,
    name: string,
    parentId?: number,
    children?: MenuList[]
}
