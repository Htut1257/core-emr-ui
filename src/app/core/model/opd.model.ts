export interface OpdGroup {
    groupId: string,
    groupName: string,
    locationId: string,
    status: boolean
}

export interface OpdCategory {
    catId: string,
    catName: string,
    groupId: string,
    migId: string,
    opdAccCode: string,
    ipdAccCode: string,
    depCode: string,
    srvF1AccId: string,
    srvF2AccId: string,
    srvF3AccId: string,
    srvF4AccId: string,
    srvF5AccId: string,
    payableAccId: string,
    payableAccOpt: string,
    srvF2RefDr: string,
    srvF3RefDr: string,
    ipdDeptCode: string,
    userCode: string,
    expense: boolean,
    status: boolean,

}

export interface OpdServiceModel {
    serviceId: string,
    serviceName: string,
    fees: number,
    fees1: number,
    cfs: boolean,
    serviceCode: string,
    status: boolean,
    migId: number,
    doctor: string,
    fees2: number,
    fees3: number,
    fees4: number,
    fees5: number,
    fees6: number,
    percent: boolean,
    labGroupId: number,
    labRemark: string
}

export interface OpdHistory {

}

export interface OpdHistoryDetail {

}