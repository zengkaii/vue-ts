export interface MenuList {
    id: number
    label: string
    path?: string,
    type: string,
    children?: MenuList[]
}
