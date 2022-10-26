type MDP = {
    id: number;
    name: string;
}

type Site = {
    id: number;
    link: string;
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
