import XLSX, { JSON2SheetOpts } from 'xlsx'
import FileSaver from 'file-saver'
import { HeaderMapping, HeaderWithoutFunction, getHeaderWithoutFunction } from '@/model/HeaderMapping'
import { resolveHeader } from './HeaderMappingUtils'
import ExportWorker from 'worker-loader!./export.worker.js'

export interface ExcelExportOptions extends JSON2SheetOpts {
    headerMapping: HeaderMapping[]
    filename?: string
}

function s2ab(s: any): BlobPart {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
}

function jsonShellToBook(jsonData: any[], opts: ExcelExportOptions) {
    const jsonSheel = XLSX.utils.json_to_sheet(getParseData(jsonData, opts))
    const Sheets = {Sheet1: jsonSheel}
    const book = {
        SheetNames: Object.keys(Sheets),
        Sheets
    }
    return book
}

function fixdata(data: any) {
    let o = ''
    let l = 0
    const w = 10240
    for (; l < data.byteLength / w; ++l) {
        const t: any = new Uint8Array(data.slice(l * w, l * w + w))
        o += String.fromCharCode.apply(null, t)
    }
    const t1: any = new Uint8Array(data.slice(l * w))
    o += String.fromCharCode.apply(null, t1)
    return o
}

function getMappingsWithoutFunction(headerMapping: HeaderMapping[]): HeaderWithoutFunction[] {
    return headerMapping.map(header => {
        return getHeaderWithoutFunction(header)
    })
}

export function getParseData(jsonData: any[], opts: ExcelExportOptions) {
    const parseData = jsonData.map(row => {
        const data = {} as {[key: string]: any}
        opts.headerMapping.filter(h => h.prop).forEach(header => {
            data[header.label] = resolveHeader(row, header)
        })
        return data
    })
    return parseData
}

export function jsonExport(jsonData: any[], opts: ExcelExportOptions) {
    const sheet = jsonShellToBook(jsonData, opts)
    const type = 'xlsx'
    const sheetOut = XLSX.write(sheet, {bookType: type, bookSST: true, type: 'binary'})
    const filename = `${opts.filename ? opts.filename : '导出-' + Date.now()}.${type}`
    try {
        FileSaver.saveAs(
            new Blob([s2ab(sheetOut)], {type: 'application/octet-stream'}),
            filename)
    } catch (e) {
        console.error(e)
        throw e
    }
}

export function jsonExportPromise(jsonData: any[], opts: ExcelExportOptions) {
    const promise = new Promise((resolve, reject) => {
        const worker = new ExportWorker()
        const parseData = getParseData(jsonData, opts)
        let filename = opts.filename || `export_${Date.now()}`
        const mappings = getMappingsWithoutFunction(opts.headerMapping)
        const fileType = 'xlsx'
        filename = `${filename}.${fileType}`
        worker.postMessage({parseData, filename, mappings})
        worker.onmessage = ({data: {success, blob, error}}: {data: any} ) => {
            if (success) {
                FileSaver.saveAs(blob, filename)
                resolve()
            } else {
                reject(error)
            }
        }
    })
    return promise
}

export interface ImportExcelData {
    parseData: any[],
    raw: any[]
}
export function importFile(file: File, {headerMapping}: ExcelExportOptions) {
    return new Promise<ImportExcelData>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
            const target: any = e.target
            if (target) {
                const data = target.result
                const array = btoa(fixdata(data))
                try {
                    const book = XLSX.read(array)
                    const sheetName = book.SheetNames[0]
                    const sheet = book.Sheets[sheetName]
                    const jsonData = XLSX.utils.sheet_to_json(sheet)
                    const parseData = jsonData.map(item => {
                        const finalParseData = {} as {[key: string]: any}
                        headerMapping.forEach(header => {
                            const finalValue = resolveHeader(item, header)
                            finalParseData[header.label] = finalValue
                        })
                        return finalParseData
                    })
                    resolve({
                        parseData,
                        raw: jsonData
                    })
                } catch (e) {
                    console.error(e)
                    reject(e)
                }
            }
        }
        reader.readAsArrayBuffer(file)
    })
}

export function exportExcelFromTable(dom: Document) {
    const wb = XLSX.utils.table_to_book(dom)
    const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        compression: true,
        type: 'binary'
    })
    const filename = `export_${Date.now()}`
    try {
        FileSaver.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
            , filename + '.xlsx')
    } catch (e) {
        console.log(e, wbout)
    }
    return wbout
}
