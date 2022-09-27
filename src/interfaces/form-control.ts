
export interface InputControl {
    "value": string;
    "message": string;
    "status": number
};

export interface ContactGroup {

    contactName: InputControl;
    email: InputControl;
    phone: InputControl;

}