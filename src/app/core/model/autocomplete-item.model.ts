import { DoctorTreatment } from "./doctor-entry.model"

export interface DrExamination {
    examinationObj: {
        desc: string
    }
}

export interface DrTreatment {
    cityObject: Item
    patternObj: Pattern
    day: number
    qty: number
    price?: number
    foc?: boolean
    discount?: number,
    amount?: number,
    remark: string
}



export interface Pattern {
    patternCode: string
    despEng: string
    id: string
    despMM: string
    factor: number
}

export interface Item {
    itemOption: String
    itemType: String
    itemId: String
    itemName: String
    relStr: string
    fees: number
    fees1: number
    fees2: number
    fees3: number
    fees4: number
    fees5: number
    fees6: number
    isPercent: string
    serviceCost: number
    itemUnit: string
    expDate?: Date
    isFOC?: boolean
    uniqueId?: string
}

export function treatmentItem(obj: Item): any {
    const object = {
        group: obj.itemOption,
        subGroup: obj.itemType,
        code: obj.itemId,
        desc: obj.itemName,
        relStr: obj.relStr,
        fees: obj.fees,
        fees1: obj.fees1,
        fees2: obj.fees2,
        fees3: obj.fees3,
        fees4: obj.fees4,
        fees5: obj.fees5,
        fees6: obj.fees6,
        isPercent: obj.isPercent,
        serviceCost: obj.serviceCost,
        itemUnit: obj.itemUnit,
        expDate: obj.expDate,
        isFOC: obj.isFOC,
        uniqueId: obj.uniqueId,
    }
    return object
}

export interface DrNote {
    key: string
    value: string
}
