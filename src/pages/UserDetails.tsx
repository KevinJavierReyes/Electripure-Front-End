import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ElectripureState } from "../interfaces/reducers"
import { useSelector, useDispatch } from "react-redux";
import { sendGetUsers } from "./../actions/electripure";
import { ModalMiddle } from "../components/Modal";
import { UpdateUserDataForm } from "../interfaces/form"
import UserUpdateForm from "../components/Form/UserUpdateForm"

const UserDetails = () => {
    const [ toggleModal, setToggleModal ] = useState(false)
    const [ updateValue, setUpdateValue ] = useState({})
    const {userId} = useParams()
    const dispatch = useDispatch()
    const users = JSON.parse(useSelector((state: ElectripureState) => state.users));
    const user:any = users.filter((element:any)=> element.id == userId)[0];
    let firstName = user?.Name.split(" ")[0];
    let lastName = user?.Name.split(" ")[1];

    const submitUserUpdateInfo = (data: UpdateUserDataForm) =>{
        console.log(data)
        setUpdateValue(JSON.stringify({
            ...updateValue,
            "user": {
                "email": data.email,
                "cellphone": data.cellphone,
                "fullname": data.fullname,
                "company": data.company,
                "role": data.role
            }
        }));
    }

    console.log(user)
    useEffect(() =>{
        dispatch(sendGetUsers({}))
    }, [])
    return ( 
        <Fragment>
            <div className="flex bg-white p-[20px] h-[800px]">
                <div className="rounded-[50%] border w-[100px] h-[100px] flex justify-around items-center font-bold text-4xl">
                    <h1>{firstName? firstName[0]: ""}{lastName? lastName[0]: ""}</h1>
                </div>
                <div className="ml-[100px]">
                    <div className="flex">
                        <h1 className="text-3xl">{user?.Name}</h1>
                        <span className="cursor-pointer ml-[20px]" onClick={()=> setToggleModal(!toggleModal)}>Edit User Information</span>
                    </div>
                    <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                        {
                            <UserUpdateForm onSubmit={submitUserUpdateInfo}/>
                        }
                    </ModalMiddle>
                    <p>{user?.Company}</p>
                    <p>{user?.Contacts}</p>
                    <p>{user?.Role}</p>
                </div>
            </div>
        </Fragment>
    )
}

export default UserDetails;
