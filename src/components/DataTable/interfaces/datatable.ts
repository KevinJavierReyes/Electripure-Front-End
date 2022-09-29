import { MouseEventHandler } from "react";


export interface HeaderConfig {
    key: string;
    label: string;
    sort?: MouseEventHandler;
}

export interface CellConfig {
    label: any;
    value: any;
}

export interface RowConfig {
    [key: string]: CellConfig;
}


export interface TableConfig {

    headers: HeaderConfig[];

    data: RowConfig[];

}