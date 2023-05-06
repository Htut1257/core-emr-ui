
export interface DrExamination {
    examinationObj:{
        desc:string
    }
}

export interface DrTreatment {
    cityObject: Item
    pattern: string
    day: string
    qty: number
    remark: string
}



export interface Item {
    itemOption: String
    itemType: String
    itemId: String
    itemName: String
}

export interface Pattern {

}

export interface Day {

}

export interface DrNote {
    key: string
    value: string
}
