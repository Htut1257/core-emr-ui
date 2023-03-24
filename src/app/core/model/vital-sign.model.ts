export interface VitalSign{
    bookingId:string
    regNo:string
    nurseRemark:string
    temperature:number
    tempUnit:string
    plus:number
    respiratory:number
    bpUpper:number
    bpLower:number
    oxygenStatus:number
    oxygenRate:number
    oxygenConcentration:number
    oxygenMethod:string
    glucometer:number
    glucoUnit:string
    weight:number
    weightUnit:string
    height:number
    heightUnit:string
    bmi:number
    createdBy:string
    createdDate:Date//date time
}