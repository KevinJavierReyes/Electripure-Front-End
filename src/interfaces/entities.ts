import { TASK_STATE } from "../config/enum";

type MDP = {
    id: number;
    name: string;
    sub_mdp: string[];
}

type Site = {
    id: number;
    link: string;
    name: string;
    mdp_list: MDP[];
}


export interface CompanyEntity {
    company_id: number;
    company_name: string;
    link: string;
    list_sites: Site[];
}

export interface CompanyRowEntity {
    id: number;
    name: string;
    mdps: number;
    sites: number;
    users: number;
    status: string;
    date: string;
}


export interface UserEntity {
    id: number;
    Name: string;
    Company: number;
    Role: string;
    Contacts: number;
    Status: string;
    date: string;
    email: string;
    cellphone: number;
}

export interface UploadedFileEntity {
    id: number;
    fileName: string;
    type: string;
    link: string;
    dateRange: string;
    dateAdd: string;
    addedBy: string;
}

export interface GlobalCompanyEntity {
    id: number;
    name: String;
}

export interface TaskEntity {
    key: String;
    state: TASK_STATE;
    result: any;
}

export interface AmpsDataEntity {
    [key: string]: number[]; 
    timestamp: number[];
}

export interface VoltsDataEntity {
    [key: string]: number[]; 
    timestamp: number[];
}


export interface DeviceRowEntity {
    id_device: number;
    serial_number: number;
    type_device: string;
    company_name: string;
    MDP_name: string;
    date: string;
}

export interface DeviceData {
    id_device: number;
    serial_number: number;
    type_device: string;
    company_name: string;
    MDP_name: string;
    date: string;
}
