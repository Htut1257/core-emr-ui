export interface DoctorMedicalHistory {
    visitId: string
    visitDate: string
    regNo: string
    admissionNo: string,
    patientName: string,
    drId: string,
    drName: string,
    reVisitDate: string,
    drNotes: string,
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
    desp: string
    pattern: string
    days:number
    qty: number
    price: number
    discount: number
    amount: number
    remark: string
}

export interface DoctorNote {
    key: string
    value: string
}