import { TASK_STATE } from "../config/enum";
import { CompanyEntity, GlobalCompanyEntity, UserEntity } from "./entities";


export interface ActionNotification {
    type: string;
    payload: any;
}

export interface ShowToastPayload {
    message: string;
    status: "success" | "error" | "warning" | "";
}

export interface SetLoadingPayload {
    loading: boolean;
}

export interface SetUsersPayload {
    users: UserEntity[]
}

export interface SetCompaniesPayload {
    companies: CompanyEntity[]
}

export interface SetGlobalCompaniesPayload {
    companies: GlobalCompanyEntity[]
}
export interface SetCurrentUserPayload {
    currentUser: string
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

export interface SendGetCompaniesByUserPayload {
    userId: number;
}


export interface SendGetCompaniesPayload {
    
}


export interface SendResendEmailPayload {
    id: number;
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

export interface SendImagePayload {
    taskKey: string;
    base64: string;
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
    state: TASK_STATE,
    result: any
}
