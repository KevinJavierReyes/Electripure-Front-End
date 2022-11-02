import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendGetUsers, sendResentEmail, setUsers } from "../../../actions/electripure";
import { UserEntity } from "../../../interfaces/entities";
import { ElectripureState } from "../../../interfaces/reducers";
import DataTable from "../../DataTable";
import { HeaderConfig, RowConfig, TableConfig } from "../../DataTable/interfaces/datatable";


function DataTableUsers({}) {

    const users: UserEntity[] = JSON.parse(useSelector((state: ElectripureState) => state.users));
    const dispatch = useDispatch();

    function deleteUser(user: UserEntity) {
        console.log(user);
        console.log("User deleted!");
    }
    
    async function resendInvite(user: UserEntity) {
        dispatch(sendResentEmail({"id": user.id}))
    }
     
    // TODO ask if we need to pass the current user to get a list related to
    // that specific user
    useEffect(() => {
        dispatch(sendGetUsers({}));
    }, []);

    const data: RowConfig[] = users.map((user: UserEntity): RowConfig => {
        return {
            "Name": {
                "label": <span className="f-medium color-primary">{user.Name}</span>,
                "value": user.Name
            },
            "Company": {
                "label": <span className="f-medium color-primary">{user.Company}</span>,
                "value": user.Company
            },
            "Role": {
                "label": <span className="f-medium">{user.Role}</span>,
                "value": user.Role
            },
            "Contacts": {
                "label": <span className="f-medium">{user.Company}</span>,
                "value": user.Company
            },
            "Status": {
                "label": user.Status == "Active" ? <span className="color-success f-bold">{user.Status}</span> : <span><span className="color-error f-bold">{user.Status}</span><span className="cursor-pointer color-secondary underline f-light text-sm ml-[10px]" onClick={()=>{resendInvite(user)}}>resend invite</span></span>,
                "value": user.Status
            },
            "Date": {
                "label": <span className="f-medium">{user.date}</span>,
                "value": user.date
            },
            "Delete": {
                "label": <span className="cursor-pointer" onClick={()=> { deleteUser(user) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></span>,
                "value": 1
            }
        }
    });

    const headers: HeaderConfig[] = [
        {
            key: "Name",
            label: "Name",
            sort: () => {
                let usersSorted = [...users].sort((a: UserEntity, b:UserEntity) => {
                    return a.Name.toUpperCase().localeCompare(b.Name.toUpperCase());
                });
                if (JSON.stringify(users) == JSON.stringify(usersSorted)) {
                    usersSorted.reverse();
                }
                dispatch(setUsers({
                    users: usersSorted
                }))
            }
        },
        {
            key: "Company",
            label: "Company",
            sort: () => {
                let usersSorted = [...users].sort((a: UserEntity, b:UserEntity) => {
                    return `${a.Company}`.toLowerCase().localeCompare(`${b.Company}`.toLowerCase())
                });
                if (JSON.stringify(users) == JSON.stringify(usersSorted)) {
                    usersSorted.reverse();
                }
                dispatch(setUsers({
                    users: usersSorted
                }));
            }
        },
        {
            key: "Role",
            label: "Role",
        },
        {
            key: "Contacts",
            label: "Contacts",
        },
        {
            key: "Status",
            label: "Status",
            sort: () => {
                let usersSorted = [...users].sort((a: UserEntity, b:UserEntity) => {
                    return `${a.Status}`.toLowerCase().localeCompare(`${b.Status}`.toLowerCase())
                });
                if (JSON.stringify(users) == JSON.stringify(usersSorted)) {
                    usersSorted.reverse();
                }
                dispatch(setUsers({
                    users: usersSorted
                }));
            }
        },
        {
            key: "Date",
            label: "Date Add",
        },
        {
            key: "Delete",
            label: "Delete"
        }
    ];

    const config: TableConfig = {"headers": headers, "data": data};
    return <DataTable config={config} />;
}

export default DataTableUsers;
