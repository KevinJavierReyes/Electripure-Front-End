import { Fragment } from "react";
import { HeaderConfig, RowConfig, TableConfig } from "./interfaces/datatable";
import "./style.css";

function DataTable (props: {config: TableConfig} ) {
    return (
        <Fragment>
            <div className="datatable-container">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            {props.config.headers.map((header: HeaderConfig, index: number)=> {
                                return <th className={"p-[10px] datatable-header"} key={"header" + index}>
                                    <div className={"flex justify-start align-items"}>
                                        {header.label}
                                        <span className={header.sort != undefined ? "cursor-pointer ml-[5px]" : "hidden"} onClick={header.sort}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    </th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.config.data.map((row: RowConfig, indexRow: number)=> {
                            return <tr key={"row"+indexRow}>
                                {props.config.headers.map((header: HeaderConfig, index: number)=> {
                                    return <td className="p-[10px]" key={ "row" + indexRow + "-cell" + index}>{row[header.key].label}</td>;
                                })}
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default DataTable;