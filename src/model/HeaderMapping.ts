import { CreateElement, VNode } from 'vue'
import { FormatType } from '@/utils/HeaderMappingUtils'
import { TableColumnType } from 'element-ui/types/table-column'

export enum SummaryType {
    sum,
    avg
}
export declare class HeaderMapping {
    label: string
    prop: string
    width?: string | number
    type?: TableColumnType
    summaryType?: SummaryType
    dataMapping?: {
        [key: string]: any
    }
    children?: HeaderMapping[]
    /**
     * 不推荐使用
     */
    format?: (v: any, row?: any) => any
    formatType?: FormatType
    selectable?: (row: any, index: number) => boolean
    render?: (
        h: CreateElement,
        $scope: {
            $index: number
            row: any
        },
        header: HeaderMapping) => VNode
}


export interface HeaderWithoutFunction {
    prop: string
    label: string
    formatType?: FormatType
    dataMapping?: {
        [key: string]: any
    }
}

export function getHeaderWithoutFunction(header: HeaderMapping) {
    const {prop, label, formatType, dataMapping} = header
    return {prop, label, formatType, dataMapping}
}
