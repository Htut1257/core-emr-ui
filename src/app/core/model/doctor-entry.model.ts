
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