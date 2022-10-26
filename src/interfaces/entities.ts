import { TASK_STATE } from "../config/enum";



export interface UserEntity {
    id: number;
    Name: string;
    Company: number;
    Role: string;
    Contacts: number;
    Status: string;
    date: string;
}

export interface CompanyEntity {
    id: number;
    name: String;
}

export interface TaskEntity {
    key: String;
    state: TASK_STATE,
    result: any
}