

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