const SPLIT_STR = '@'
const localStorage = window.localStorage

interface DataProcessMapping {
    [key: string]: {
        save(data: any): any
        parse(data: any): any
    }
}


const DATA_PROCESS_MAPPING = {
    number: {
        save: data => data,
        parse: data => Number.parseFloat(data)
    },
    object: {
        save: data => JSON.stringify(data),
        parse: data => JSON.parse(data)
    },
    default: {
        save: data => data,
        parse: data => data
    }
} as DataProcessMapping

function getProcess(type: string) {
    return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING.default
}

export default {
    get<T>(key: string) {
        const stringData = localStorage.getItem(key)
        if (stringData) {
            const indexSPL = stringData.indexOf(SPLIT_STR)
            const type = stringData.substr(0, indexSPL)
            const data = stringData.substr(indexSPL + 1)
            return getProcess(type).parse(data) as T
        }
        return null
    },
    put(key: string, value: any) {
        const type = typeof value
        const process = getProcess(type)
        value = type + SPLIT_STR + process.save(value)
        localStorage.setItem(key, value)
    },
    clear() {
        localStorage.clear()
    },
    remove(key: string) {
        localStorage.removeItem(key)
    }
}
