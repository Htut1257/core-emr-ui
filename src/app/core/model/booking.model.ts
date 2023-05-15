export interface Booking {
    bookingId: number
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