import { ActionNotification, LoginPayload, SendForgotPasswordPayload, SendUpdatePasswordPayload, SendVerificationCodePayload, SendVerificationEmailPayload, SetJwtPayload, SetLoadingPayload, SetLoginTokenPayload, SetTimestampTwoStepVerificationPayload, ShowToastPayload } from "../interfaces/actions";
import { LOGIN, SET_JWT, SET_LOADING, SET_LOGIN_TOKEN, SET_TIMESTAMP_TWO_STEP_VERIFICATION, SHOW_TOAST } from "./types";
import ElectripureService from "../service/electripure-service";
import { ResponseGeneric } from "../interfaces/base-service";


export const setLoading = (payload: SetLoadingPayload): ActionNotification => ({
    "type": SET_LOADING,
    "payload": payload
});

export const setTimestampTwoStepVerification = (payload: SetTimestampTwoStepVerificationPayload): ActionNotification => ({
    "type": SET_TIMESTAMP_TWO_STEP_VERIFICATION,
    "payload": payload
});

export const setJwt = (payload: SetJwtPayload): ActionNotification => ({
    "type": SET_JWT,
    "payload": payload
});

export const setLoginToken = (payload: SetLoginTokenPayload): ActionNotification => ({
    "type": SET_LOGIN_TOKEN,
    "payload": payload
});

export const showToast = (payload: ShowToastPayload): ActionNotification => ({
    "type": SHOW_TOAST,
    "payload": payload 
});

export const login = (payload: LoginPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.login(payload);
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    if(response.data.password_correct === "False") {
        return dispatch(showToast({
            message: "Credentials invalid.",
            status: "error"
        }))
    }
    dispatch(setLoginToken({
        token: response.data.token
    }));
    dispatch(showToast({
        "message": "Log in success!",
        "status": "success"
    }));
});

export const sendVerificationEmail = (payload: SendVerificationEmailPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.authorizationCode({
        "tipo": "email",
        "token_login": payload.token
    });
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }));
    }
    if(response.data.log != "Email Sent") {
        return dispatch(showToast({
            message: "Email not sent.",
            status: "error"
        }));
    }
    dispatch(setTimestampTwoStepVerification({
        timestamp: new Date().getTime()
    }));
    return dispatch(showToast({
        message: "Email sent!",
        status: "success"
    }));
});

export const sendVerificationCode = (payload: SendVerificationCodePayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.authorizationCodeValidate({
        "token_login": payload.token,
        "code_auth": payload.code
    });
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    if(response.data.log != "Code Correct") {
        return dispatch(showToast({
            message: "Code incorrect.",
            status: "error"
        }))
    }
    dispatch(setJwt({
        token: "KevinJWT"
    }));
    dispatch(showToast({
        message: "Code correct!.",
        status: "success"
    }))
    return;
});


export const sendForgotPassword = (payload: SendForgotPasswordPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.forgotPassword({
       "email": payload.email
    });
    dispatch(setLoading({
        loading: false
    }));
    console.log("Forgot password response");
    console.log(response);
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    if(!response.data.Send) {
        return dispatch(showToast({
            message: "Email not sent!",
            status: "error"
        }))
    }
    dispatch(showToast({
        message: "Email sent!",
        status: "success"
    }))
    return;
});



export const sendUpdatePassword = (payload: SendUpdatePasswordPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.updatePassword({
       "password": payload.password,
       "token": payload.token
    });
    dispatch(setLoading({
        loading: false
    }));
    console.log("send Update Password");
    console.log(response);
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    if(!response.data.Send) {
        return dispatch(showToast({
            message: "Password not updated.",
            status: "error"
        }))
    }
    dispatch(showToast({
        message: "Password updated!",
        status: "success"
    }))
    return;
});
