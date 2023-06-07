export interface Doctor {
    doctorId: String
    doctorName: String
    genderId: String
    nirc: String
    speciality: number
    initialID: number
    licenseNo: String
    active: boolean
    phoneNo: String
    updateDate: Date
    drType: String
    
}

export interface Initial{

}

export interface Speciality{
    
}

export interface DoctorFees {
    mapId: string
    drId: string
    serviceId: string
    serviceName: string
    fees: number
    uniqueId: number
}
