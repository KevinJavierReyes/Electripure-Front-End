import { SET_LOADING, SET_LOGIN_TOKEN, SET_TIMESTAMP_TWO_STEP_VERIFICATION,
SHOW_TOAST, SET_JWT, SET_USERS, SET_PASSWORD_TOKEN, SET_PASSWORD_USER,
SET_COMPANIES, ADD_TASK, SET_GLOBAL_COMPANIES, SET_CURRENT_USER,
SET_COMPANIES_TABLE, SET_VOLTS_DATA, SET_AMPS_DATA, FILTER_VOLTS_DATA,
FILTER_AMPS_DATA, SET_COMPANY_DETAIL, SET_PERMISSIONS } from "../actions/types";
import { ActionNotification, SetJwtPayload, SetLoadingPayload,
SetLoginTokenPayload, SetPasswordTokenPayload, SetPasswordUserPayload,
SetTimestampTwoStepVerificationPayload, SetUsersPayload, ShowToastPayload,
SetCompaniesPayload, AddTaskPayload, SetGlobalCompaniesPayload,
SetCurrentUserPayload, SetCompaniesTablePayload, SetAmpsDataPayload,
SetVoltsDataPayload, FilterVoltsDataPayload, FilterAmpsDataPayload,
SetCompanyDetailPayload, SetPermissionsPayload} from "../interfaces/actions";
import { ElectripureState } from "../interfaces/reducers";
const initialState: ElectripureState = {
    "loading": false,
    "electripureJwt": null,
    "loginToken": null,
    "toastMessage": "",
    "toastType": "",
    "timestampTwoStepVerification": null,
    "users": "[]",
    "companiesTable": "[]",
    "globalCompanies": "[]",
    "companies": "[]",
    "passwordToken": null,
    "passwordUser": "{}",
    "tasks": "{}",
    "currentUser": null,
    "ampsData": `{ "timestamp": [] }`,
    "ampsDataFiltered": `{ "timestamp": [] }`,
    "ampsDataToggle": `{}`,
    "voltsData": `{ "timestamp": [] }`,
    "voltsDataFiltered": `{ "timestamp": [] }`,
    "voltsDataToogle": `{}`,
    "companyDetails": `{}`,
    "permissions": `{}`
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
                }; break;
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
        case SET_COMPANIES_TABLE:
            let setCompaniesTablePayload: SetCompaniesTablePayload = action.payload as SetCompaniesTablePayload;
            return {
                ...state,
                "companiesTable": JSON.stringify(setCompaniesTablePayload.companies)
            };
            break;
        case SET_COMPANIES:
            let setCompaniesPayload: SetCompaniesPayload = action.payload as SetCompaniesPayload;
            return {
                ...state,
                "companies": JSON.stringify(setCompaniesPayload.companies)
            };
            break;
        case SET_GLOBAL_COMPANIES:
            let setGlobalCompaniesPayload: SetGlobalCompaniesPayload = action.payload as SetGlobalCompaniesPayload;
            return {
                ...state,
                "globalCompanies": JSON.stringify(setGlobalCompaniesPayload.companies)
            };
            break;
        case SET_CURRENT_USER:
            let setCurrentUserPayload: SetCurrentUserPayload = action.payload as SetCurrentUserPayload;
            return {
                ...state,
                "currentUser": JSON.stringify({
                    id: setCurrentUserPayload.id,
                    fullname: setCurrentUserPayload.fullname,
                })
            };
            break;
        case SET_AMPS_DATA:
            let setAmpsDataPayload: SetAmpsDataPayload = action.payload as SetAmpsDataPayload;
            return {
                ...state,
                "ampsData": JSON.stringify(setAmpsDataPayload.data),
                // "ampsDataFiltered": JSON.stringify(setAmpsDataPayload.data)
            };
            break;
        case SET_VOLTS_DATA:
            let setVoltsDataPayload: SetVoltsDataPayload = action.payload as SetVoltsDataPayload;
            return {
                ...state,
                "voltsData": JSON.stringify(setVoltsDataPayload.data),
                "voltsDataFiltered": JSON.stringify(setVoltsDataPayload.data)
            };
            break;
        case FILTER_VOLTS_DATA:
            let filterVoltsDataPayload: FilterVoltsDataPayload = action.payload as FilterVoltsDataPayload;
            let voltsData: any = JSON.parse(state.voltsData);
            let voltsDataFiltered: any = {};
            Object.keys(filterVoltsDataPayload).forEach((key: string) => {
                if (key == "timestamp") {
                    voltsDataFiltered[key] = voltsData[key];
                } else if(filterVoltsDataPayload[key] && voltsData.hasOwnProperty(key)) {
                    voltsDataFiltered[key] = voltsData[key];
                }
            });
            return {
                ...state,
                "voltsDataFiltered": JSON.stringify(voltsDataFiltered)
            };
            break;
        case FILTER_AMPS_DATA:
            let filterAmpsDataPayload: FilterAmpsDataPayload = action.payload as FilterAmpsDataPayload;
            let ampsData: any = JSON.parse(state.ampsData);
            let ampsDataFiltered: any = {};
            Object.keys(filterAmpsDataPayload).forEach((key: string) => {
                if(filterAmpsDataPayload[key] && ampsData.hasOwnProperty(key)) {
                    ampsDataFiltered[key] = ampsData[key];
                }
            });
            ampsDataFiltered["timestamp"] = ampsData["timestamp"];
            return {
                ...state,
                "ampsDataToggle": JSON.stringify(filterAmpsDataPayload),
                "ampsDataFiltered": JSON.stringify(ampsDataFiltered)
            };
            break;
        case SET_COMPANY_DETAIL:
            let setCompanyDetailPayload: SetCompanyDetailPayload = action.payload as SetCompanyDetailPayload;
            return {
                ...state,
                "companyDetails": JSON.stringify(setCompanyDetailPayload)
            };
            break;
        case SET_PERMISSIONS:
            let setPermissionsPayload: SetPermissionsPayload = action.payload
            return {
                ...state,
                "permissions": JSON.stringify(setPermissionsPayload)
            };
            break;
        default:
            return state;
    }
}
