import { VERIFICATION_CHANNEL } from "../config/enum";



export interface CreateUserDataForm {
    email: string;
    cellphone: string;
    fullname: string;
    company: string;
    role: string;
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
