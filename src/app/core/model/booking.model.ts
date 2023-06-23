export interface Booking {
    bookingId: string
    regNo: string
    patientName: string
    doctorId: string
    doctorName:string
    bkDate: Date
    bkPhone: string
    bkActive: boolean
    bkSerialNo: number
    createdDate: Date
    createdBy: string
    actionStatus: string
    bStatus: string
    statusLevel:number
    bkPatientStatus:string
}

export interface DoctorBooking{
    drId:string
    drName:string
    schedule:string
    cntRegistered:string
    cntCancel:string
    cntBooking:string
    cntConfirm:string
    cntRegister:string
    cntVitalSign:string
    cntDoctorWaiting:string
    cntDoctorRoom:string
    cntBilling:string
    cntFinished:string
}

export interface bookingType{
    id:string
    description:string
}

export const bookingType: any = [
    {
        id:'1',
        description:'Normal'
    },
    {
        id:'2',
        description:'Emergency'
    }
]