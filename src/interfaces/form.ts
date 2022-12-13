import { VERIFICATION_CHANNEL } from "../config/enum";

export interface CreateUserData {
    id: number;
    fullname: string;
}

export interface CreateUserDataForm {
    email: string;
    cellphone: string;
    fullname: string;
    company: string;
    role: string;
}

export interface UpdateUserDataForm {
    user_id: number;
    email: string;
    cellphone: string;
    fullname: string;
}

export interface CreatePasswordDataForm {
    password: string;
}


export interface ConfirmEmailPhoneDataForm {
    email: string;
    phone: string;
}

export interface CreateBackupContactDataForm {
    name: string;
    email: string;
    phone: string;
}

export interface LoginDataForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface RequestResetPasswordDataForm {
    email: string;
}

export interface ResetPasswordDataForm {
    password: string;
}

export interface SelectVerifyMethodDataForm {
    channel: VERIFICATION_CHANNEL;
}

export interface ConfirmCodeDataForm {
    code: string;
}

export interface BasicCompanyInformationDataForm {
    company: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    logo: string;
}

export interface CompanyInformationUpdateDataForm {
    company: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    company_id: string | undefined;
    id_image: number;
    image: string;
}

export interface MainPointContactDataForm {
    fullname: string;
    email: string;
    cellphone: string;
}

export interface SiteManagerDataForm {
    fullname: string;
    email: string;
    cellphone: string;
}

export interface SiteDetailDataForm {
    name: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    logo: string;
    rate: string;
    schematic: string;
}

export interface SiteUpdateDataForm {
    site_id: number;
    id_image: string;
    name: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    image: string;
    payment: string;
    schematic: string;
}

export interface CreateMDPDataForm {
    MDPname: string;
    meterID: string;
    applianceID: string;
    MDP: string;
    switchgear: string;
    transformer: string;
}

export interface UpdateMDPDataForm {
    mdp_id: number;
    MDPname: string;
    meterID: string;
    applianceID: string;
    MDP: string;
    switchgear: string;
    transformer: string;
}

export interface SiteCreateDataForm {
    name: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    payment: string;
    manager_fullname: string;
    manager_email: string;
    manager_cellphone: string;
    logo: string;
    schematic: string;
}
