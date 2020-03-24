import {HeaderMapping} from '../model/HeaderMapping'

import dateformat from 'dateformat'

export enum FormatType {
    date = 1,
    datetime = 2
}

function safeDate(val: any): Date | any {
    try {
        const date = val && parseInt(val, 10) && new Date(parseInt(val, 10))
        return date
    } catch (e) {
        console.warn('tran date error: ', e)
    }
    return null
}

function safeFormat(val: any, format: string) {
    try {
        const date = safeDate(val)
        if (date) {
            return dateformat(date, format)
        }
    } catch (e) {
        console.warn('safeFormat error: ', e)
    }
    return ''
}

export const FormatTypeFunction = {
    [FormatType.date]: (val: any) => {
        return safeFormat(val, 'yyyy-mm-dd')
    },
    [FormatType.datetime]: (val: any) => {
        return safeFormat(val, 'yyyy-mm-dd HH:MM:ss')
    }
}

export function getFieldValue(data: any, key: string) {
    if (!data) {
        return data
    }
    if (key.indexOf('.') > -1) {
        const keyArray = key.split('.')
        let value
        let tempData = data
        keyArray.forEach((k) => {
            if (tempData) {
                value = tempData[k]
                tempData = value
            }
        })
        return tempData
    }
    return data[key]
}

export function resolveHeader(data: any, header: HeaderMapping) {
    const rawValue = getFieldValue(data, header.prop)
    let finalValue = rawValue
    if (header.dataMapping) {
        finalValue = header.dataMapping[rawValue]
    } else if (header.format) {
        finalValue = header.format(rawValue, data)
    } else if (header.formatType) {
        finalValue = FormatTypeFunction[header.formatType](rawValue)
    }
    return finalValue
}

export function coverByHeaderMappings(data: any[], headerMappings: HeaderMapping[]) {
    return data && data.map(item => {
        const realData = {} as {[key: string]: any}
        headerMappings.filter(header => header.prop).forEach(header => {
            realData[header.label] = resolveHeader(item, header)
        })
        return realData
    })
}
