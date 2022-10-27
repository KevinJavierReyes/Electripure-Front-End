
export interface InputControl {
    "value": string;
    "message": string;
    "state": number
};

export interface ContactGroup {

    contactName: InputControl;
    email: InputControl;
    phone: InputControl;

}



export interface MDPGroup {

    name: InputControl;
    meterId: InputControl;
    applianceId: InputControl;
    ampCap: InputControl;
    switchgearCap: InputControl;
    transformer: InputControl;
    
}