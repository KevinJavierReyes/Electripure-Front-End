import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ElectripureState } from "../interfaces/reducers"

// Import interfaces
import { CreateUserDataForm } from "../interfaces/form";

// Import components
import { ModalMiddle } from "./../components/Modal";
import CreateUserForm from "../components/Form/CreateUserForm";
import DataTableUsers from "../components/DataTables/DataTableUsers";
import { ButtonSecondary } from "../components/FormInput/Button";
// Import actions
import { sendCreateUser, sendGetUsers } from "../actions/electripure";
import { UserPermission } from "../routers/Permissions"
import { settingPermissions } from "../libs/permissions"


function UserListPage () {

    const [isShowModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const users = JSON.parse(useSelector((state: ElectripureState) => state.users));
    const currentUser = users?.filter((user:any) => user.id == localStorage.getItem("user_id"))[0];

    console.log("Usuarios", users)
    function submitCreateUserForm(data: CreateUserDataForm) {
        dispatch(sendCreateUser(data));
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                <div className={"w-[172px]"}>
                        { settingPermissions("create_user")[0] === 2 ?
                        (<ButtonSecondary onClick={()=> { setShowModal(true); }}>
                            <span className="flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>

                                <span className="f-medium">Add new user</span>

                            </span>
                        </ButtonSecondary>)
                        :settingPermissions("create_user")[0] === 1 ?
                        (<ButtonSecondary onClick={()=> { setShowModal(true); }}>
                            <span className="flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>

                                <span className="f-medium">Add new user</span>

                            </span>
                        </ButtonSecondary>)
                        : <div></div>
                        }
                </div>
                <span className="ml-[20px]"><h3 className="f-bold text-lg">User Management</h3></span>
            </div>
            { settingPermissions("list_user")[0] === 2?
                <div className="w-full rounded border-color-secondary border">
                    <DataTableUsers />
                </div>
                :settingPermissions("list_user")[0] === 1?
                <div className="w-full rounded border-color-secondary border">
                    <DataTableUsers />
                </div>
                :<div></div>
            }
            <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false)}}>
                <CreateUserForm onSubmit={submitCreateUserForm}/>
            </ModalMiddle>  
        </React.Fragment>
    );
}

export default UserListPage;
