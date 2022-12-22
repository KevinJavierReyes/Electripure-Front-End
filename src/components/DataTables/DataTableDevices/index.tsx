import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { sendGetDevicesTable } from "../../../actions/electripure";
import { DeviceRowEntity } from "../../../interfaces/entities";
import { ElectripureState } from "../../../interfaces/reducers";
import DataTable from "../../DataTable";
import { HeaderConfig, RowConfig, TableConfig } from "../../DataTable/interfaces/datatable";
import { CiaPermission } from "../../../routers/Permissions"
import { setDevicesTable } from "../../../actions/electripure"


function DataTableDevices({}) {

    const devicesTable = (JSON.parse(useSelector((state: ElectripureState) => state.devicesTable))).device_list ?? [{}];
    //const [ tableDevices, setTableDevices ] = useState(`[{
    const [ tableDevices, setTableDevices ] = useState(`[{
        "id_device": 0,
        "serial_number": "",
        "type_device": "",
        "company_name": "",
        "MDP_name": "",
        "date": ""
    }]`)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const deactivateDevice = (device:any) => {}
    const activateDevice = (device:any) => {}
    const device = devicesTable.device_list ?? [{}];


    useEffect(() => {
        dispatch(sendGetDevicesTable({}));
    }, []);

    const data: RowConfig[] = devicesTable.map((deviceRow: DeviceRowEntity): RowConfig => {
        return {
            "Serial": {
                "label": <span onClick={() => {navigate(`/dashboard/device/details/${deviceRow.id_device}`)}} className="cursor-pointer f-medium color-primary">{deviceRow.serial_number}</span>,
                "value": deviceRow.serial_number
            },
            "Type": {
                "label": <span className="f-medium">{deviceRow.type_device}</span>,
                "value": deviceRow.type_device
            },
            "Company Name": {
                "label": <span className="f-medium">{deviceRow.company_name}</span>,
                "value": deviceRow.company_name
            },
            "MDP Name": {
                "label": <span className="f-medium">{deviceRow.MDP_name}</span>,
                "value": deviceRow.MDP_name
            },
            "Date": {
                "label": <span className="f-medium">{deviceRow.date}</span>,
                "value": deviceRow.date
            },
        }
    });

    const headers: HeaderConfig[] = [
        {
            key: "Serial",
            label: "Serial"
        },
        {
            key: "Type",
            label: "Type",
            sort: () => {
                let devicesSorted = [...devicesTable].sort((a: DeviceRowEntity, b:DeviceRowEntity) => {
                    return a.type_device.toUpperCase().localeCompare(b.type_device.toUpperCase());
                });
                if (JSON.stringify(devicesTable) == JSON.stringify(devicesSorted)) {
                    devicesSorted.reverse();
                }
                dispatch(setDevicesTable({
                    device_list: devicesSorted
                }))
            }
        },
        {
            key: "Company Name",
            label: "Company Name"
        },
        {
            key: "MDP Name",
            label: "MDP Name",
            sort: () => {
                let devicesSorted = [...devicesTable].sort((a: DeviceRowEntity, b:DeviceRowEntity) => {
                    return `${a.MDP_name}`.toLowerCase().localeCompare(`${b.MDP_name}`.toLowerCase())
                });
                if (JSON.stringify(devicesTable) == JSON.stringify(devicesSorted)) {
                    devicesSorted.reverse();
                }
                dispatch(setDevicesTable({
                    device_list: devicesSorted
                }))
            }
        },
        {
            key: "Date",
            label: "Date",
        },
    ];

    const config: TableConfig = {"headers": headers, "data": data};
    return <DataTable config={config} />;
}

export default DataTableDevices;
