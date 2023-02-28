

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