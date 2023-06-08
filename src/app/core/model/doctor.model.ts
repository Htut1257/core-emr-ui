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

export const Type = [
    {
        id: 1,
        description: 'Doctor'
    },
    {
        id: 2,
        description: 'test 2'
    },
    {
        id: 3,
        description: 'Technician'
    }
]

export interface Initial {
    initialId: string
    initialName: string
}

export interface Speciality {
    specId: string
    desp: string
}

export interface DoctorFees {
    mapId: string
    drId: string
    serviceId: string
    serviceName: string
    fees: number
    uniqueId: number
}
