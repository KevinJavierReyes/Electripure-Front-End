export function unixTimestampToLocal(timestamp: number) {
    var date = new Date(timestamp * 1000);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().replace("T", " ").replace("Z", "").replace(".000", "");
}

export function timestampToDateLocal(timestamp: number) {
    var date = new Date(timestamp);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().split("T")[0];
}