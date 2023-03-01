import { group } from "console";


export interface GraphMetadata {
    "key": string;
    "label": string;
    "url": string;
}

export interface DataMetadata {
    "key": string;
    "label": string | string[];
    "group"?: string[];
    "color": string;
}


export interface DataGraph {
    "y": { [key: string]: any } | { [key: string]: any }[],
    "x": any[]
}

export interface ColorGraph {
    [key: string]: string,
    default: string
}


export interface yLabel  { "name": string, "group": string }


export interface DataGraphPowerLog {
    "x": any[],
    "timestamp": number[],
    "x_label": string[],
    "y": {
        [key: string]: any
    }
}

export interface GroupDataGraphPowerLog {
    [key: string]: DataGraphPowerLog
}

export interface GroupShowGraphPowerLog {
    [key: string]: boolean
}

export interface GroupShowDataPowerLog {
    [key: string]: boolean
}

export interface GroupColorDataPowerLog {
    [key: string]: string
    default: string
}

export interface GroupShowGroupDataPowerLog {
    [group: string]: {
        [label: string]: {
            "show": boolean,
            "keys": string[]
        }
    }
}


export interface ZoomPowerLog{
    date_min: number,
    date_max: number
}