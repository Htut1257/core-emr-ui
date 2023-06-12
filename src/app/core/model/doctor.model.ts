export interface Doctor {
    doctorId: string
    doctorName: string
    genderId: string
    nirc?: string
    speciality: number
    initialID: number
    licenseNo: string
    active: boolean
    phoneNo?: string
    updateDate?: Date
    drType: string
    listOPD?: DoctorFees[]
    listOT?: DoctorFees[]
    listDC?: DoctorFees[]

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


export function ServiceFee(obj: any): any {
    const object = {
        mapId:'',
        drId: '',
        serviceId: obj.serviceId,
        serviceName: obj.serviceName,
        fees: obj.fees,
        uniqueId:0,
    }
    return object
}