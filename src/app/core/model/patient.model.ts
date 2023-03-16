import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms"

export interface Patient {
    regNo: String
    regDate: Date
    dob: Date
    sex: String
    fatherName: String
    nirc: String
    nationality: String
    religion: String
    doctor: String
    patientName: String
    address: String
    contactNo: String
    createdBy: String
    admissionNo: String
    age: number
    month: number
    day: number
    township: number
    ptType: String
    otId: String
}

export interface IPatientFormGroup extends FormGroup {
    value: Patient;

    controls: {
        regNo: AbstractControl
        regDate: AbstractControl
        dob: AbstractControl
        sex: AbstractControl
        fatherName: AbstractControl
        nirc: AbstractControl
        nationality: AbstractControl
        religion: AbstractControl
        doctor: AbstractControl
        patientName: AbstractControl
        address: AbstractControl
        contactNo: AbstractControl
        createdBy: AbstractControl
        admissionNo: AbstractControl
        age: AbstractControl
        month: AbstractControl
        day: AbstractControl
        township: AbstractControl
        ptType: AbstractControl
        otId: AbstractControl
    };
}