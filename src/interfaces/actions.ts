import { TASK_STATE } from "../config/enum";
import { AmpsDataEntity, CompanyEntity, CompanyRowEntity, GlobalCompanyEntity, UploadedFileEntity, UserEntity, VoltsDataEntity } from "./entities";


export interface ActionNotification {
    type: string;
    payload: any;
}

export interface ShowToastPayload {
    message: string;
    status: "success" | "error" | "warning" | "" | any;
}

export interface SetLoadingPayload {
    loading: boolean;
}

export interface SetUsersPayload {
    users: UserEntity[];
}

export interface SetCompaniesTablePayload {
    companies: CompanyRowEntity[]
}

export interface SetCompaniesPayload {
    companies: CompanyEntity[]
}

export interface SetUploadedFilePayload {
    uploadedFiles: UploadedFileEntity[]
}

export interface SetGlobalCompaniesPayload {
    companies: GlobalCompanyEntity[]
}
export interface SetCurrentUserPayload {
    id: number;
    fullname: string;
}

export interface SetTimestampTwoStepVerificationPayload {
    timestamp: number | null;
}

export interface SetJwtPayload {
    token: string | null;
}

export interface SetLoginTokenPayload {
    token: string | null;
}

export interface SetPasswordTokenPayload {
    token: string | null;
}

export interface SetPasswordUserPayload {
    email: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SendVerificationEmailPayload {
    token: string;
}

export interface SendVerificationCodePayload {
    token: string;
    code: string;
}


export interface SendForgotPasswordPayload {
    email: string;
}

export interface SendUpdatePasswordPayload {
    token: string;
    password: string;
}


export interface SendGetUsersPayload {
}

export interface SendGetUploadedFilesPayload {
    companyId: number
}


export interface SendGetCompaniesByUserPayload {
    userId: number;
}


export interface SendGetCompaniesPayload {
    
}


export interface SendResendEmailPayload {
    id: number;
}

export interface SendActivateDeactivateUserPayload {
    id: number;
    action: string;
}

export interface SendActivateDeactivateCompanyPayload {
    id: number;
    action: string;
}

export interface SendActivateUserPayload {
    id: number;
}


export interface SendGetCompaniesTablePayload {

}

export interface SendCreateUserPayload {
    fullname: string;
    email: string;
    cellphone: string;
    company: string;
    role: string;
}

export interface SendUpdateUserPayload {
    email: string;
    cellphone: string;
    password: string;
    token: string;
}

export interface ValidateUpdateUserPayload {
    email: string;
    cellphone: string;
    password: string;
    token: string;
}


export interface SendImagePayload {
    taskKey: string;
    base64: string;
}

export interface SendFilePayload {
    taskKey: string;
    base64: string;
    extension: string;
    name: string;
}

export interface SendValidateTokenPayload {

    token: string;

}

export interface SendAddContactPayload {

    name: string;
    email: string;
    phone: string;

}

export interface AddTaskPayload {
    key: String;
    state: TASK_STATE;
    result: any;
}


// Amps and volts

export interface SetAmpsDataPayload {
    data: AmpsDataEntity;
}

export interface SetVoltsDataPayload {
    data: VoltsDataEntity;
}

export interface FilterAmpsDataPayload {
    [key: string]: Boolean;
}

export interface FilterVoltsDataPayload {
    [key: string]: Boolean;
}

export interface SendGetAmpsDataPayload {
    dateMin: string;
    dateMax: string;
    device: number;
}

// User, Company, and MDP details

export interface SetCompanyDetailPayload{
    name: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    id_image: number;
}

export interface SetSiteDetailPayload{
    name: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    id_image: number;
    payment: string;
}

export interface SetMDPDetailPayload{
    id: number;
    sitename: string;
    meterID: string;
    applianceID: number;
    witchgear: number;
    transformer: number;
}

export interface SetDevicesTablePayload{
}

export interface jwtDecoded{
    data: string;
    fullname: string;
    role: any;
    exp: number;
}

export interface sendUploadFileDataPayload{
    company_id: number;
    site_id: number;
    file_type: string;
    date_from: string;
    date_to: string;
    id_file: number;
}
