


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