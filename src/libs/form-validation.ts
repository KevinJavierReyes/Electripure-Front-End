import { InputControl } from "../interfaces/form-control";
import { ValidationResult } from "../interfaces/form-validation";


export function validateName(value: string): ValidationResult {
    if (!value.match(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,100}/)) {
        return {
            "valid": false,
            "error": "Name format invalid."
        }
    }
    if (value.length > 50) {
        return {
            "valid": false,
            "error": "Maximum size is 50 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateCode(value: string): ValidationResult {
    if (!value.match(/[0-9]{6}/)) {
        return {
            "valid": false,
            "error": "Code invalid."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateCompany(value: string): ValidationResult {
    if (!value.match(/.+/)) {
        return {
            "valid": false,
            "error": "Company invalid."
        }
    }
    if (value.length > 50) {
        return {
            "valid": false,
            "error": "Maximum size is 50 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}


export function validateMDPName(value: string): ValidationResult {
    if (!value.match(/.+/)) {
        return {
            "valid": false,
            "error": "Mdp invalid."
        }
    }
    if (value.length > 50) {
        return {
            "valid": false,
            "error": "Maximum size is 50 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateMeter(value: string): ValidationResult {
    if (!value.match(/^[0-9]+$/)) {
        return {
            "valid": false,
            "error": "Meter invalid."
        }
    }
    if (value.length > 20) {
        return {
            "valid": false,
            "error": "Maximum size is 20 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateAppliance(value: string): ValidationResult {
    if (!value.match(/^[0-9]+$/)) {
        return {
            "valid": false,
            "error": "Appliance invalid."
        }
    }
    if (value.length > 20) {
        return {
            "valid": false,
            "error": "Maximum size is 20 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateAmps(value: string): ValidationResult {
    if (!value.match(/^[0-9]+$/)) {
        return {
            "valid": false,
            "error": "Amp cap invalid."
        }
    }
    if (value.length > 20) {
        return {
            "valid": false,
            "error": "Maximum size is 20 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateSwitchgear(value: string): ValidationResult {
    if (!value.match(/^[0-9]+$/)) {
        return {
            "valid": false,
            "error": "Switchgear invalid."
        }
    }
    if (value.length > 20) {
        return {
            "valid": false,
            "error": "Maximum size is 20 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateTransformer(value: string): ValidationResult {
    if (!value.match(/^[0-9]+$/)) {
        return {
            "valid": false,
            "error": "Transformer invalid."
        }
    }
    if (value.length > 20) {
        return {
            "valid": false,
            "error": "Maximum size is 20 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateSiteName(value: string): ValidationResult {
    if (!value.match(/.+/)) {
        return {
            "valid": false,
            "error": "Site invalid."
        }
    }
    if (value.length > 50) {
        return {
            "valid": false,
            "error": "Maximum size is 50 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateAddress(value: string): ValidationResult {
    if (!value.match(/.+/)) {
        return {
            "valid": false,
            "error": "Address invalid."
        }
    }
    if (value.length > 100) {
        return {
            "valid": false,
            "error": "Maximum size is 100 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}


export function validateCity(value: string): ValidationResult {
    if (!value.match(/^[a-zA-Z ]*$/)) {
        return {
            "valid": false,
            "error": "City invalid."
        }
    }
    if (value.length > 50) {
        return {
            "valid": false,
            "error": "Maximum size is 50 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateZip(value: string): ValidationResult {
    if (!value.match(/^[0-9]*$/)) {
        return {
            "valid": false,
            "error": "Zipcode invalid."
        }
    }
    if (value.length > 5) {
        return {
            "valid": false,
            "error": "Maximum size is 5 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateEmail(value: string): ValidationResult {
    if (!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return {
            "valid": false,
            "error": "Invalid email format."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateCellphone(value: string): ValidationResult {

    // if (!value.match(/([0-9]{3})[0-9]{3}-[0-9]{4}/)) {
    //     return {
    //         "valid": false,
    //         "error": "Cellphone invalid."
    //     }
    // }
    if (!value.match(/^[0-9]+$/)) {
        return {
            "valid": false,
            "error": "Cellphone invalid."
        }
    }
    if (value.length > 20) {
        return {
            "valid": false,
            "error": "Cellphone max size is 20."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validatePassword(value: string): ValidationResult {
    // ^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$
    // ^.*
    // Start of Regex
    // (?=.{6,})
    // Passwords will contain at least 6 characters in length
    // (?=.*[a-zA-Z])
    // Passwords will contain at least 1 upper and 1 lower case letter
    // (?=.*\d)
    // Passwords will contain at least 1 number
    // (?=.*[!#$%&? "]) Passwords will contain at least given special characters
    // .*$
    // End of Regex

    if (!value.match(/^.{8,}$/)) {
        return {
            "valid": false,
            "error": "Use 8 or more characters with a mix of letters, numbers and characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateNameControl(name: string): InputControl {
    let input: InputControl = {
        "value": name,
        "message": "",
        "state": -1
    };
    if (name == "") {
        return input;
    }
    const validation: ValidationResult = validateName(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateEmailControl(email: string): InputControl {
    let input: InputControl = {
        "value": email,
        "message": "",
        "state": -1
    };
    if (email == "") {
        return input;
    }
    const validation: ValidationResult = validateEmail(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validatePasswordControl(password: string): InputControl {
    let input: InputControl = {
        "value": password,
        "message": "",
        "state": -1
    };
    if (password == "") {
        return input;
    }
    const validation: ValidationResult = validatePassword(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateCellphoneControl(cellphone: string): InputControl {
    let input: InputControl = {
        "value": cellphone,
        "message": "",
        "state": -1
    };
    if (cellphone == "") {
        return input;
    }
    const validation: ValidationResult = validateCellphone(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateCodeControl(code: string): InputControl {
    let input: InputControl = {
        "value": code,
        "message": "",
        "state": -1
    };
    if (code == "") {
        return input;
    }
    const validation: ValidationResult = validateCode(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateCompanyControl(company: string): InputControl {
    let input: InputControl = {
        "value": company,
        "message": "",
        "state": -1
    };
    if (company == "") {
        return input;
    }
    const validation: ValidationResult = validateCompany(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateSiteNameControl(site: string): InputControl {
    let input: InputControl = {
        "value": site,
        "message": "",
        "state": -1
    };
    if (site == "") {
        return input;
    }
    const validation: ValidationResult = validateSiteName(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateAddressControl(address: string): InputControl {
    let input: InputControl = {
        "value": address,
        "message": "",
        "state": -1
    };
    if (address == "") {
        return input;
    }
    const validation: ValidationResult = validateAddress(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateCityControl(city: string): InputControl {
    let input: InputControl = {
        "value": city,
        "message": "",
        "state": -1
    };
    if (city == "") {
        return input;
    }
    const validation: ValidationResult = validateCity(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateMDPNameControl(mdp: string): InputControl {
    let input: InputControl = {
        "value": mdp,
        "message": "",
        "state": -1
    };
    if (mdp == "") {
        return input;
    }
    const validation: ValidationResult = validateMDPName(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateMeterControl(meter: string): InputControl {
    let input: InputControl = {
        "value": meter,
        "message": "",
        "state": -1
    };
    if (meter == "") {
        return input;
    }
    const validation: ValidationResult = validateMeter(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}


export function validateApplianceControl(applience: string): InputControl {
    let input: InputControl = {
        "value": applience,
        "message": "",
        "state": -1
    };
    if (applience == "") {
        return input;
    }
    const validation: ValidationResult = validateAppliance(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}


export function validateAmpsControl(amps: string): InputControl {
    let input: InputControl = {
        "value": amps,
        "message": "",
        "state": -1
    };
    if (amps == "") {
        return input;
    }
    const validation: ValidationResult = validateAmps(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateSwitchgearControl(switchgear: string): InputControl {
    let input: InputControl = {
        "value": switchgear,
        "message": "",
        "state": -1
    };
    if (switchgear == "") {
        return input;
    }
    const validation: ValidationResult = validateSwitchgear(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateTransformerControl(switchgear: string): InputControl {
    let input: InputControl = {
        "value": switchgear,
        "message": "",
        "state": -1
    };
    if (switchgear == "") {
        return input;
    }
    const validation: ValidationResult = validateTransformer(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}


export function validateZipControl(zip: string): InputControl {
    let input: InputControl = {
        "value": zip,
        "message": "",
        "state": -1
    };
    if (zip == "") {
        return input;
    }
    const validation: ValidationResult = validateZip(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

export function validateRequiredControl(input: InputControl): InputControl {
    if (input.value == "" || input.value == null) {
        return {
            ...input,
            "state": 0,
            "message": "Required field."
        };
    }
    return input;
}

export function validateSerial(value: string): ValidationResult {
    if (!value.match(/^[0-9]+$/)) {
        return {
            "valid": false,
            "error": "Serial Number invalid."
        }
    }
    if (value.length > 20) {
        return {
            "valid": false,
            "error": "Maximum size is 20 characters."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateSerialControl(serial: string): InputControl {
    let input: InputControl = {
        "value": serial,
        "message": "",
        "state": -1
    };
    if (serial == "") {
        return input;
    }
    const validation: ValidationResult = validateSerial(input.value);
    if (!validation.valid) {
        return {
            ...input,
            "state": 0,
            "message": validation.error!
        };
    }
    return {
        ...input,
        "state": 1
    };
}

