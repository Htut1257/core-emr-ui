import { DoctorNote, DoctorTreatment } from "./doctor-entry.model"

export interface Cashier {
    id: string
    visitId: string
    visitDate: string
    regNo: string
    admissionNo: string
    patientName: string
    drId: string
    drName: string
    reVisitDate: Date
    drNotes: string
    vouTotal: number
    discP: number
    discAmt: number
    taxP: number
    taxAmt: number
    paid: number
    balance: number
    maxUniqueId: number
    treatments?: DoctorTreatment[]
    kvDrNotes?: DoctorNote[]
}

export interface CashierHis {
    id: string
    visitId: string
    visitDate: string
    regNo: string
    admissionNo: string
    patientName: string
    drId: string
    drName: string
    reVisitDate: Date
    drNotes: string
    locId?: string
    locName?: string
    payTypeId?: string
    payTypeName?: string
    currId?: string
    currName?: string
    vouTotal: number
    discP: number
    discA?: number
    taxP: number
    taxA?: number
    paid: number
    balance: number
    sesionId?: string
    treatments?: DoctorTreatment[]
    userId?: string
    macId?: string
    saleVouNo?: string
    opdVouNo?: string
} 