
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

export interface PatternItem {

}

export interface Day {

}

export interface DrNote {
    key: string
    value: string
}
