export interface UserData {
    id_user: number;
}

export interface UpdateUserRequest {
    email: string;
    cellphone: string;
    password: string;
    token: string;
}

export interface ValidateUpdateUserRequest {
    email: string;
    cellphone: string;
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
export interface ToogleUserStateRequest {
    user_id: number;
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
    date_min: number | null;
    date_max: number | null;
    device: number;
    points: number | null;
}


export interface GetVoltsDataRequest {
    date_min: number | null;
    date_max: number | null;
    device: number;
    points: number | null;
}

export interface GetPowerDataRequest {
    date_min: number;
    date_max: number;
    device: number;
}




