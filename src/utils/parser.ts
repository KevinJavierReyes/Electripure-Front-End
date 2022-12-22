

export function toUnix(timestamp: number) {
    return Math.floor(timestamp / 1000)
}


export function toDictTimestamps(data: any): any {
    const dictTimestamps: any = {};
    data["TS_data"].forEach((element: any, index: number) => {
        dictTimestamps[`${element}`] = data["TS_unix"][index];
    });
    return dictTimestamps;
}