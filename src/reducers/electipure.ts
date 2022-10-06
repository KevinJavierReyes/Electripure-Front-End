import { SET_LOADING, SET_LOGIN_TOKEN, SET_TIMESTAMP_TWO_STEP_VERIFICATION, SHOW_TOAST, SET_JWT } from "../actions/types";
import { ActionNotification, SetJwtPayload, SetLoadingPayload, SetLoginTokenPayload, SetTimestampTwoStepVerificationPayload, ShowToastPayload } from "../interfaces/actions";
import { ElectripureState } from "../interfaces/reducers";

const initialState: ElectripureState = {
    "loading": false,
    "electripureJwt": null,
    "loginToken": null,
    "toastMessage": "",
    "toastType": "",
    "timestampTwoStepVerification": null,
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
        case SET_JWT:
                let setJwtPayload: SetJwtPayload = action.payload as SetJwtPayload;
                return {
                    ...state,
                    "electripureJwt": setJwtPayload.token
                };
                break;
        case SET_TIMESTAMP_TWO_STEP_VERIFICATION:
            let setTimestampTwoStepVerification: SetTimestampTwoStepVerificationPayload = action.payload as SetTimestampTwoStepVerificationPayload;
            return {
                ...state,
                "timestampTwoStepVerification": setTimestampTwoStepVerification.timestamp
            };
            break;
        default:
            return state;
    }
}