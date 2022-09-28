
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