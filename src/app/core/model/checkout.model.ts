import { DoctorNote, DoctorTreatment } from "./doctor-entry.model"

export interface Cashier {
    id: string
    visitId: string
    visitDate:string
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