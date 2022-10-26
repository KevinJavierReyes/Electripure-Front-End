import { SET_LOADING, SET_LOGIN_TOKEN, SET_TIMESTAMP_TWO_STEP_VERIFICATION, SHOW_TOAST, SET_JWT, SET_USERS, SET_PASSWORD_TOKEN, SET_PASSWORD_USER, SET_COMPANIES, ADD_TASK } from "../actions/types";
import { ActionNotification, SetJwtPayload, SetLoadingPayload, SetLoginTokenPayload, SetPasswordTokenPayload, SetPasswordUserPayload, SetTimestampTwoStepVerificationPayload, SetUsersPayload, ShowToastPayload, SetCompaniesPayload, AddTaskPayload } from "../interfaces/actions";
import { ElectripureState } from "../interfaces/reducers";

const initialState: ElectripureState = {
    "loading": false,
    "electripureJwt": null,
    "loginToken": null,
    "toastMessage": "",
    "toastType": "",
    "timestampTwoStepVerification": null,
    "users": "[]",
    "companies": "[]",
    "passwordToken": null,
    "passwordUser": "{}",
    "tasks": "{}"
};

export const electripureReducer = (state: ElectripureState = initialState, action: ActionNotification): ElectripureState => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, "loading": (action.payload as SetLoadingPayload).loading};
            break;
        case SHOW_TOAST:
            let showToastPayload: ShowToastPayload = action.payload as ShowToastPayload;
            return {
                ...state,
                "toastMessage": showToastPayload.message,
                "toastType": showToastPayload.status
            };
            break;
        case SET_LOGIN_TOKEN:
            let setLoginTokenPayload: SetLoginTokenPayload = action.payload as SetLoginTokenPayload;
            return {
                ...state,
                "loginToken": setLoginTokenPayload.token
            };
            break;
        case SET_PASSWORD_TOKEN:
            let setPasswordTokenPayload : SetPasswordTokenPayload = action.payload as SetPasswordTokenPayload;
            return {
                ...state,
                "passwordToken": setPasswordTokenPayload.token
            };
            break;
        case SET_PASSWORD_USER:
            let setPasswordUserPayload : SetPasswordUserPayload = action.payload as SetPasswordUserPayload;
            return {
                ...state,
                "passwordUser": JSON.stringify(setPasswordUserPayload)
            };
            break;
        case SET_JWT:
                let setJwtPayload: SetJwtPayload = action.payload as SetJwtPayload;
                return {
                    ...state,
                    "electripureJwt": setJwtPayload.token
                };
                break;
        case ADD_TASK:
                const tasks : any = JSON.parse(state.tasks);
                let addTaskPayload : AddTaskPayload = action.payload as AddTaskPayload;
                const taskKey: any = addTaskPayload.key;
                tasks[taskKey] = addTaskPayload;
                return {
                    ...state,
                    "tasks": JSON.stringify(tasks)
                };
                break;
        case SET_TIMESTAMP_TWO_STEP_VERIFICATION:
            let setTimestampTwoStepVerification: SetTimestampTwoStepVerificationPayload = action.payload as SetTimestampTwoStepVerificationPayload;
            return {
                ...state,
                "timestampTwoStepVerification": setTimestampTwoStepVerification.timestamp
            };
            break;
        case SET_USERS:
            let setUsersPayload: SetUsersPayload = action.payload as SetUsersPayload;
            return {
                ...state,
                "users": JSON.stringify(setUsersPayload.users)
            };
            break;
        case SET_COMPANIES:
            let setCompaniesPayload: SetCompaniesPayload = action.payload as SetCompaniesPayload;
            return {
                ...state,
                "companies": JSON.stringify(setCompaniesPayload.companies)
            };
            break;
        default:
            return state;
    }
}