import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import interfaces
import { CreateUserDataForm } from "../interfaces/form";

// Import components
import { ModalMiddle } from "./../components/Modal";
import CreateUserForm from "../components/Form/CreateUserForm";
import DataTableUsers from "../components/DataTables/DataTableUsers";
import { ButtonSecondary } from "../components/FormInput/Button";
// Import actions
import { sendCreateUser } from "../actions/electripure";
import { ElectripureState } from "../interfaces/reducers"
import { useNavigate } from "react-router-dom";

function UserListPage () {

    const [isShowModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const users = JSON.parse(useSelector((state: ElectripureState) => state.users));
    const userId = parseInt(localStorage.getItem('user_id')?? "");
    console.log("user id:", userId)
    const user = users?.filter((elem:any) => elem.id === userId)[0];

    function submitCreateUserForm(data: CreateUserDataForm) {
        dispatch(sendCreateUser(data));
        setShowModal(false);
    }
    useEffect(() =>{
        if(user){
            navigate(`/dashboard/user/details/${user?.id}`)
        }
    })

    return (
        <React.Fragment>
            <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                <div className={"w-[172px]"}>
                    <ButtonSecondary onClick={()=> { setShowModal(true); }}>
                        <span className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                            <span className="f-medium">Add new user</span>
                        </span>
                    </ButtonSecondary>
                </div>
                <span className="ml-[20px]"><h3 className="f-bold text-lg">User Management</h3></span>
            </div>
            <div className="w-full rounded border-color-secondary border">
                <DataTableUsers />
            </div>
            <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false)}}>
                <CreateUserForm onSubmit={submitCreateUserForm}/>
            </ModalMiddle>  
        </React.Fragment>
    );
}

export default UserListPage;
