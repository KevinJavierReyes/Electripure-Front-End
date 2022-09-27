

export function validateName (value: string): { valid: boolean, error: string | null } {
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

export function validateEmail (value: string): { valid: boolean, error: string | null } {
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

export function validateCellphone (value: string): { valid: boolean, error: string | null } {
    return {
        "valid": true,
        "error": null
    };
}

