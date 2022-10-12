import React from "react";
import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import NavbarInfo from "../components/Navigation/NavbarInfo";
import NavbarMenu from "../components/Navigation/NavbarMenu";
import { HeaderConfig, RowConfig, TableConfig } from "../components/DataTable/interfaces/datatable";
import ElectripureService from "./../service/electripure-service";
import { ResponseGeneric } from "../interfaces/base-service";
import { toast, ToastContainer } from "react-toastify";
import { buttonSecondaryStyle } from "../utils/styles";
import {Button} from "../components/Button";
import PopUp from "../components/PopUp";
import PopUpCreateUser from "../components/PopUpCreateUser";
// Import modals
import { ModalMiddle } from "./../components/Modal";
import InputPhoto from "../components/InputPhoto";
import CreateCompanyStep1Form from "../components/Form/CreateCompanyStep1Form";
import CreateUserForm from "../components/Form/CreateUserForm";
import { CreateUserDataForm } from "../interfaces/form";
import Navegation from "../components/Navigation";

function UserListPage () {

  const [usersState, setUsersState] = useState("[]");

  const [isLoading, setIsLoading] = useState(false);

  const [isShowModal, setShowModal] = useState(false);

    function deleteUser(user: any) {
        console.log(user);
        console.log("User deleted!");
    }
    
    async function resendInvite(user: any) {
        console.log(user);
        console.log("Email resent!");
        const resendResponse: ResponseGeneric = await ElectripureService.resendEmail({"id": user["id"]});
        console.log(resendResponse);
        if (resendResponse.success) {
            toast.success("Email sent!", {
                "position": "bottom-right"
            });
        }
    }

    function generateDataTable(users: any[]) {
        const data: RowConfig[] = users.map((user: any): RowConfig => {
            // {
            //     "id": 21,
            //     "Name": "David Lizano",
            //     "Company": 21,
            //     "Role": "E - Admin",
            //     "Contacts": 1,
            //     "Status": "Active",
            //     "date": "28/09/2022"
            // }
            return {
                "Name": {
                    "label": <span className="f-medium color-primary">{user["Name"]}</span>,
                    "value": user["Name"]
                },
                "Company": {
                    "label": <span className="f-medium color-primary">{user["Company"]}</span>,
                    "value": user["Company"]
                },
                "Role": {
                    "label": <span className="f-medium">{user["Role"]}</span>,
                    "value": user["Role"]
                },
                "Contacts": {
                    "label": <span className="f-medium">{user["Contacts"]}</span>,
                    "value": user["Contacts"]
                },
                "Status": {
                    "label": user["Status"] == "Active" ? <span className="color-success f-bold">{user["Status"]}</span> : <span><span className="color-error f-bold">{user["Status"]}</span><span className="cursor-pointer color-secondary underline f-light text-sm ml-[10px]" onClick={()=>{resendInvite(user)}}>resend invite</span></span>,
                    "value": user["Status"]
                },
                "Date": {
                    "label": <span className="f-medium">{user["date"]}</span>,
                    "value": user["date"]
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
                    let users = JSON.parse(usersState).sort((a: any, b:any) => a["Name"].toLowerCase().localeCompare(b["Name"].toLowerCase()));
                    if(JSON.stringify(users) == usersState){
                        users = users.reverse();
                    }
                    setUsersState(JSON.stringify(users));
                }
            },
            {
                key: "Company",
                label: "Company",
                sort: () => {
                    let users = JSON.parse(usersState).sort((a: any, b:any) => `${a["Company"]}`.toLowerCase().localeCompare(`${b["Company"]}`.toLowerCase()));
                    if(JSON.stringify(users) == usersState){
                        users = users.reverse();
                    }
                    setUsersState(JSON.stringify(users));
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
                    let users = JSON.parse(usersState).sort((a: any, b:any) => `${a["Status"]}`.toLowerCase().localeCompare(`${b["Status"]}`.toLowerCase()));
                    if(JSON.stringify(users) == usersState){
                        users = users.reverse();
                    }
                    setUsersState(JSON.stringify(users));
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
        const config = {"headers": headers, "data": data};
        return <DataTable config={config} />;
    }
    
    useEffect(() => {
        (async () => {
            const responseUsers: ResponseGeneric = await ElectripureService.getUsers();
            setUsersState(JSON.stringify(responseUsers.data));
        })();
    }, []);

    function submitCreateUserForm(data: CreateUserDataForm) {
        console.log(data);
    }

    return (
        <React.Fragment>
            <Navegation>
                <p>dsdsds</p>
            </Navegation>
            {/* <div className="w-full h-screen flex justify-start items-start">
                <NavbarMenu></NavbarMenu>
                <div className="px-[30px] pb-[5%] w-full">
                    <NavbarInfo />
                    <div className={"justify-start items-center flex mb-[20px]"}>
                        <Button title={
                            <span className="flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            <span className="f-medium">Add new user</span></span>
                        } classes={buttonSecondaryStyle + " max-w-[200px] bg-color-white rounded"} click={()=> {
                            setShowModal(true);
                        }} />
                        <span className="ml-[20px]"><h3 className="f-bold text-lg">User Management</h3></span>
                    </div>

                    <div className="w-full rounded border-color-secondary ">
                        {generateDataTable(JSON.parse(usersState))}
                    </div>
                </div>
            </div> */}
            {/* <PopUpCreateUser show={isLoading} title={"Lets get some basic information"} closeEvent={()=> {
                console.log("Intent close");
                setIsLoading(false);
            }}/>
            <ToastContainer/> */}


            {/* <ModalMiddle show={true}>
                <CreateCompanyStep1Form/>
            </ModalMiddle>     */}
            <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false)}}>
                <CreateUserForm onSubmit={submitCreateUserForm}/>
            </ModalMiddle>  
        </React.Fragment>
    );
}

export default UserListPage;