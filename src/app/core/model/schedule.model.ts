export interface DoctorSchedule {
    templateId: string
    doctorId: string
    dayId: number
    fromTime: string
    toTime: string
    limitCount: number
    actStatus: boolean
}