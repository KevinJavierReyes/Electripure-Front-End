import { MouseEventHandler } from "react";


export interface HeaderConfig {
    key: string; // Column name
    label: string; // Value displayed
    sort?: MouseEventHandler; // Show the sort icon and emit click event
}

export interface CellConfig {
    label: any; // Value displayed
    value: any; // Origin Value
}

export interface RowConfig {
    [key: string]: CellConfig; // Column name
}


export interface TableConfig {

    headers: HeaderConfig[];

    data: RowConfig[];

}