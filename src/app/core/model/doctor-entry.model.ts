import { Item } from "./autocomplete-item.model"

export interface DoctorMedicalHistory {
    id: string
    visitId: string
    visitDate: string
    regNo: string
    admissionNo: string,
    patientName: string,
    drId: string,
    drName: string,
    reVisitDate: string,
    drNotes: string,
    cfType?: any
    cfFees: number
    isFoc: boolean
    examinations?: DoctorExamination[]
    treatments?: DoctorTreatment[]
    kvDrNotes: DoctorNote[]
}

export interface DoctorExamination {
    desc: string
}

export interface DoctorTreatment {
    group: string
    subGroup: string
    code: string
    desc: string
    pattern: string
    days: number
    qty: number
    remark: string
    relStr: string
    fees: number
    fees1: number
    fees2: number
    fees3: number
    fees4: number
    fees5: number
    fees6: number
    isPercent: boolean
    serviceCost: number
    itemUnit: string
    expDate?: Date
    isFOC?: boolean
    amount?: number
    uniqueId?: number
}

export function tableItem(obj: DoctorTreatment): any {
    const object = {
        itemOption: obj.group,
        itemType: obj.subGroup,
        itemId: obj.code,
        itemName: obj.desc,
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

export interface DoctorNote {
    key: string
    value: string
}

export const emptyDoctorTreatment = {
    group: "",
    subGroup: "",
    code: "",
    desc: "",
    pattern: "",
    days: 0,
    qty: 0,
    remark: "",
    relStr: "",
    fees: 0,
    fees1: 0,
    fees2: 0,
    fees3: 0,
    fees4: 0,
    fees5: 0,
    fees6: 0,
    isPercent: false,
    serviceCost: 0,
    itemUnit: "",
    expDate: null,
    isFOC: false,
    amount: 0,
    uniqueId: 0,
}