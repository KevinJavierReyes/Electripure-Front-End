export interface UserData {
    id_user: number;
}

export interface UpdateUserRequest {
    email: string;
    cellphone: string;
    password: string;
    token: string;
}

export interface AddContactRequest {
    user_email: string;
    contact_name: string;
    contact_email: string;
    contact_cellphone: string;
}

export interface ResendEmailRequest {
    id: number;
}

export interface ToogleCompanyStateRequest {
    company_id: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface UpdatePasswordRequest {
    token: string;
    password: string;
}

export interface ValidateTokenRequest {
    token: string;
}

export interface AuthorizationCodeRequest {
    token_login: string;
    tipo: "email" | "sms";
}

export interface AuthorizationCodeValidateRequest {
    token_login: string;
    code_auth: string;
}

export interface CreateUserRequest {
    fullname: string;
    email: string;
    cellphone: string;
    company: string;
    role: string;
}

export interface GetCompaniesByUserRequest {
    id_user: number
}

export interface UploadImageRequest {
    image: string;
}


export interface GetAmpsDataRequest {
    date_min: string;
    date_max: string;
    device: number;
}


export interface GetVoltsDataRequest {
    date_min: string;
    date_max: string;
    device: number;
}

export interface GetPowerDataRequest {
    date_min: string;
    date_max: string;
    device: number;
}




