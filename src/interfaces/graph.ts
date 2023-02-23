

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