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
    rememberToken: string | null;
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
    hasMeter: boolean;
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
    schematicBase64: string | null;
}

export interface SiteUpdateDataForm {
    site_id: number;
    logo_id: string;
    name: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    payment: string;
    schematic_id: string;
}

export interface MDPDataForm {
    MDPname: string;
    meterID: string;
    applianceID: string;
    MDP: string;
    switchgear: string;
    transformer: string;
}

export interface CreateMDPDataForm {
    name: string;
    meterId: string;
    applianceId: string;
    ampCap: string;
    switchgearCap: string;
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

export interface UpdateDeviceDataForm{
    device_id: number;
    meterID: string;
    applianceID: string;
}

export interface UploadFileDataForm{
    company_id: number;
    site_id: number;
    file_type: string;
    date_from: string;
    date_to: string;
    id_file: number;
}

