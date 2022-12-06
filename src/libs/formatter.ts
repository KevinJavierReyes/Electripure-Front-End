

function toCellphoneFormat(value: string) {
    if (value.length > 6) {
        return `(${value.substring(0,3)})${value.substring(3,6)}-${value.substring(6,100)}`
    } else  if (value.length > 3) {
        return `(${value.substring(0,3)})${value.substring(3,100)}`
    } else {
        return value;
    }
}

export default {
    toCellphoneFormat
};