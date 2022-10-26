import { UserEntity } from "./entities";


export interface ElectripureState {

    loading: boolean;
    loginToken: string | null;
    // Create password
    passwordToken: string | null;
    passwordUser: string;
    // Login
    electripureJwt: string | null;
    toastMessage: string;
    toastType: "success" | "error" | "warning" | "";
    timestampTwoStepVerification: number | null;
    users: string;
    companies: string;
}
