

export interface ElectripureState {

    loading: boolean;
    loginToken: string | null;
    electripureJwt: string | null;
    toastMessage: string;
    toastType: "success" | "error" | "warning" | "";
    timestampTwoStepVerification: number | null;

}