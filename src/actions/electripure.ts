import { ActionNotification, LoginPayload, SendAddContactPayload,
SendCreateUserPayload, SendForgotPasswordPayload, SendGetUsersPayload,
SendGetCompaniesPayload, SendResendEmailPayload, SendUpdatePasswordPayload,
SendUpdateUserPayload, SendValidateTokenPayload, SendVerificationCodePayload,
SendVerificationEmailPayload, SetJwtPayload, SetLoadingPayload,
SetLoginTokenPayload, SetPasswordTokenPayload, SetPasswordUserPayload,
SetTimestampTwoStepVerificationPayload, SetUsersPayload, ShowToastPayload,
SetCompanyPayload, SetCurrentUserPayload } from "../interfaces/actions";
import { LOGIN, SET_JWT, SET_LOADING, SET_LOGIN_TOKEN, SET_PASSWORD_TOKEN,
SET_PASSWORD_USER, SET_TIMESTAMP_TWO_STEP_VERIFICATION, SET_USERS, SHOW_TOAST,
SET_COMPANIES, SET_CURRENT_USER } from "./types";
import ElectripureService from "../service/electripure-service";
import { ResponseGeneric } from "../interfaces/base-service";

// Mappers
import UserMapper from "./../mappers/user-mapper";
import { UserEntity, CompanyEntity } from "../interfaces/entities";
import { AddContactRequest } from "../interfaces/electripure-service";

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

export const setPasswordToken = (payload: SetPasswordTokenPayload): ActionNotification => ({
    "type": SET_PASSWORD_TOKEN,
    "payload": payload
});

export const setPasswordUser = (payload: SetPasswordUserPayload): ActionNotification => ({
    "type": SET_PASSWORD_USER,
    "payload": payload
});

export const showToast = (payload: ShowToastPayload): ActionNotification => ({
    "type": SHOW_TOAST,
    "payload": payload 
});

export const setUsers = (payload: SetUsersPayload) => ({
    "type": SET_USERS,
    "payload": payload
});

export const setCompanies = (payload: SetCompanyPayload) => ({
    "type": SET_COMPANIES,
    "payload": payload
});

export const setCurrentUser = (payload: SetCurrentUserPayload) => ({
    "type": SET_CURRENT_USER,
    "payload": payload
});
// Login

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
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.OavGO9EIDazzQq08RNCmzUs4oj7EizPmBnb_NPh-i6M"
    }));
    dispatch(showToast({
        message: "Code correct!.",
        status: "success"
    }))
    dispatch(setCurrentUser({
        currentUser: response.data.fullname
    }))
    console.log("Data from response", response.data.fullname)
    return;
});

// Forgot Password
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

// Dashboard user

export const sendGetUsers = (payload: SendGetUsersPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getUsers();
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    const users: UserEntity[] = UserMapper.toUsers(response.data);
    dispatch(setUsers({
        "users": users
    }));
});

export const sendGetCompanies = (payload: SendGetCompaniesPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getCompanies();
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    const companies: CompanyEntity[] = UserMapper.toCompany(response.data);
    dispatch(setCompanies({
        "companies": companies
    }));
});

export const sendResentEmail = (payload: SendResendEmailPayload) : any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.resendEmail(payload);
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    dispatch(showToast({
        "message": "Email sent!",
        "status": "success"
    }));
});

export const sendCreateUser = (payload: SendCreateUserPayload) : any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.createUser(payload);
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        return dispatch(showToast({
            message: response.error!,
            status: "error"
        }))
    }
    dispatch(showToast({
        "message": "User created!",
        "status": "success"
    }));
    dispatch(sendGetUsers({}));
});

// Create password stepper

export const sendUpdateUser = (payload: SendUpdateUserPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric= await ElectripureService.updateUser(payload);
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        dispatch(showToast({
            message: response.error!,
            status: "error"
        }));
        return;
    }
    //Create session
    dispatch(setJwt({
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.OavGO9EIDazzQq08RNCmzUs4oj7EizPmBnb_NPh-i6M"
    }));
    dispatch(showToast({
        message: "Account updated successfully!",
        status: "success"
    }));
});

export const sendValidateToken = (payload: SendValidateTokenPayload): any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric= await ElectripureService.validateToken(payload);
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        dispatch(showToast({
            message: response.error!,
            status: "error"
        }));
        return;
    }
    if (!response.data.token_validated) {
        dispatch(setPasswordToken({
            "token": null
        }));
        return;
    }
    dispatch(setPasswordUser({
        "email": response.data.email
    }));
    dispatch(setPasswordToken({
        "token": payload.token
    }));
});

// Create backup contact

export const sendAddContacts = (payload: SendAddContactPayload[]) : any => (async (dispatch: any) => {
    dispatch(setLoading({
        loading: true
    }));
    await Promise.all(payload.map(async (contact: SendAddContactPayload, index: number) => {
        //TODO Email tiene que ser tomado desde el jwt
        const payload: AddContactRequest = {
            "user_email": localStorage.getItem("email")!,
            "contact_name": contact.name,
            "contact_email": contact.email,
            "contact_cellphone": contact.phone
        };
        const responseAddContact: ResponseGeneric = await ElectripureService.addContact(payload);
        if (responseAddContact.success) {
            dispatch(showToast({
                "message": `Contact ${index + 1} created!`,
                "status": "success"
            }));
        } else {
            dispatch(showToast({
                "message": responseAddContact.error!,
                "status": "error"
            }));
        }
    }));
    dispatch(setLoading({
        loading: false
    }));
    dispatch(showToast({
        "message": `Contacts created!`,
        "status": "success"
    }));
});
