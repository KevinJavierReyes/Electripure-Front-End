import { InputControl } from "../interfaces/form-control";
import { ValidationResult } from "../interfaces/form-validation";


export function validateName (value: string): ValidationResult {
    if (!value.match(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/)) {
        return {
            "valid": false,
            "error": "Name format invalid."
        }
    }
    return {
        "valid": true,
        "error": null
    };
}

export function validateCode (value: string): ValidationResult {
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

export function validateEmail (value: string): ValidationResult {
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

export function validateCellphone (value: string): ValidationResult {
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
        input.state = 0;
        input.message = validation.error!;
    } else {
        input.state = 1;
    }
    return input;
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
        input.state = 0;
        input.message = validation.error!;
    } else {
        input.state = 1;
    }
    return input;
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
        input.state = 0;
        input.message = validation.error!;
    } else {
        input.state = 1;
    }
    return input;
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
        input.state = 0;
        input.message = validation.error!;
    } else {
        input.state = 1;
    }
    return input;
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
        input.state = 0;
        input.message = validation.error!;
    } else {
        input.state = 1;
    }
    return input;
}

