import { Role } from "./role.model";

export interface User {
    userCode: string,
    userName: string,
    userShortName: string,
    email: string,
    password: string,
    active: boolean,
    role?: Role,
    doctorId?:string
}


