

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

export interface SetTimestampTwoStepVerificationPayload {
    timestamp: number | null;
}

export interface SetJwtPayload {
    token: string | null;
}

export interface SetLoginTokenPayload {
    token: string | null;
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