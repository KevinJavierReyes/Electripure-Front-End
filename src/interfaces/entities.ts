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


export interface UserEntity {
    id: number;
    Name: string;
    Company: number;
    Role: string;
    Contacts: number;
    Status: string;
    date: string;
}

export interface GlobalCompanyEntity {
    id: number;
    name: String;
}

export interface TaskEntity {
    key: String;
    state: TASK_STATE,
    result: any
}
