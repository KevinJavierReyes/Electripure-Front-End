import { UserEntity, CompanyEntity } from "./entities";


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
    companiesTable: string; 
    companies: string;
    globalCompanies: string;
    tasks: string;
    currentUser: string | null;
    ampsData: string; //{ "Amps Line A": number[], "Amps Line B": number[], "Amps Line C": number[], "timestamp": [] }
    ampsDataFiltered: string; //{ "Amps Line A": number[], "Amps Line B": number[], "Amps Line C": number[], "timestamp": [] }
    ampsDataToggle: string; //{ "Amps Line A": boolean, "Amps Line B": boolean, "Amps Line C": boolean }
    voltsData: string; //{ "Volts Line A": number[], "Volts Line B": number[], "Volts Line C": number[], "timestamp": [] }
    voltsDataFiltered: string; //{ "Volts Line A": number[], "Volts Line B": number[], "Volts Line C": number[], "timestamp": [] }
    voltsDataToogle: string; //{ "Volts Line A": boolean, "Volts Line B": boolean, "Volts Line C": boolean }
    companyDetails : string;
}
