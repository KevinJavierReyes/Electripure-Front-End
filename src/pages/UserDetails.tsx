import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ElectripureState } from "../interfaces/reducers"
import { useSelector, useDispatch } from "react-redux";
import { sendGetUsers } from "./../actions/electripure";
import { ModalMiddle } from "../components/Modal";
import { UpdateUserDataForm } from "../interfaces/form"
import UserUpdateForm from "../components/Form/UserUpdateForm"
import { sendUpdateUserDetails } from "../actions/electripure"
import { UserPermission } from "../routers/Permissions"

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
        dispatch(sendUpdateUserDetails(data));
        setToggleModal(false)
    }

    useEffect(() =>{
        dispatch(sendGetUsers({}))
    }, [user])

    return (
        <Fragment>
            <div className="flex bg-white p-[20px] h-[800px] flex-col">
                <div className="flex">
                    <div className="rounded-[50%] border w-[100px] h-[100px] flex justify-around items-center font-bold text-4xl">
                        <h1>{firstName? firstName[0].toUpperCase(): ""}{lastName? lastName[0].toUpperCase(): ""}</h1>
                    </div>
                    <div className="ml-[100px]">
                        <div className="flex">
                            <h1 className="text-3xl">{user?.Name}</h1>
                            <UserPermission role="edit_user">
                                <span className="cursor-pointer mt-[20px] ml-[20px] text-[#00AEE8]" onClick={()=> setToggleModal(!toggleModal)}>Edit User Information</span>
                            </UserPermission>

                        </div>
                        <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                            {
                                <UserUpdateForm onSubmit={submitUserUpdateInfo}/>
                            }
                        </ModalMiddle>
                        <div className="mt-[10px]" ><p className="flex items-center"> 
                            <svg className="mr-[10px]" width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0.625H1.75C0.765625 0.625 0 1.41797 0 2.375V11.125C0 12.1094 0.765625 12.875 1.75 12.875H14C14.957 12.875 15.75 12.1094 15.75 11.125V2.375C15.75 1.41797 14.957 0.625 14 0.625ZM4.8125 3.25C5.76953 3.25 6.5625 4.04297 6.5625 5C6.5625 5.98438 5.76953 6.75 4.8125 6.75C3.82812 6.75 3.0625 5.98438 3.0625 5C3.0625 4.04297 3.82812 3.25 4.8125 3.25ZM7.4375 10.25H2.1875C1.94141 10.25 1.75 10.0586 1.75 9.8125C1.75 8.60938 2.70703 7.625 3.9375 7.625H5.6875C6.89062 7.625 7.875 8.60938 7.875 9.8125C7.875 10.0586 7.65625 10.25 7.4375 10.25ZM13.5625 8.5H10.0625C9.81641 8.5 9.625 8.30859 9.625 8.0625C9.625 7.84375 9.81641 7.625 10.0625 7.625H13.5625C13.7812 7.625 14 7.84375 14 8.0625C14 8.30859 13.7812 8.5 13.5625 8.5ZM13.5625 6.75H10.0625C9.81641 6.75 9.625 6.55859 9.625 6.3125C9.625 6.09375 9.81641 5.875 10.0625 5.875H13.5625C13.7812 5.875 14 6.09375 14 6.3125C14 6.55859 13.7812 6.75 13.5625 6.75ZM13.5625 5H10.0625C9.81641 5 9.625 4.80859 9.625 4.5625C9.625 4.34375 9.81641 4.125 10.0625 4.125H13.5625C13.7812 4.125 14 4.34375 14 4.5625C14 4.80859 13.7812 5 13.5625 5Z" fill="#737373"/>
                            </svg>
                            {user?.Company}
                        </p></div>
                        <div className="mt-[10px]"><p>Status: {user?.Status}</p></div>
                        <div className="mt-[10px]"><p>Email: {user?.email}</p></div>
                        <div className="mt-[10px]"><p>Cellphone: {user?.cellphone}</p></div>
                        <div className="mt-[10px]"><p>Account created on: {user?.date}</p></div>
                        <div className="mt-[10px]"><p className="flex items-center">
                        <svg className="mr-[10px]" width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6211 13.957C11.5391 13.9297 11.4844 13.9023 11.4297 13.8477L11.2109 13.9844C11.0469 14.0664 10.8555 14.1211 10.6641 14.1211C10.3906 14.1211 10.0898 14.0117 9.87109 13.7656C9.37891 13.2188 8.99609 12.5625 8.77734 11.8516C8.64062 11.3594 8.83203 10.8398 9.26953 10.6211L9.48828 10.4844C9.48828 10.4297 9.48828 10.3477 9.48828 10.293L9.26953 10.1562C8.94141 9.96484 8.75 9.60938 8.75 9.25391C8.33984 9.14453 7.92969 9.0625 7.49219 9.0625H4.73047C2.10547 9.0625 0 11.1953 0 13.8203C0 14.3398 0.410156 14.75 0.929688 14.75H11.293C11.457 14.75 11.5938 14.7227 11.7031 14.6406C11.6484 14.5039 11.6211 14.3672 11.6211 14.2031V13.957ZM6.125 7.75C8.03906 7.75 9.625 6.19141 9.625 4.25C9.625 2.33594 8.03906 0.75 6.125 0.75C4.18359 0.75 2.625 2.33594 2.625 4.25C2.625 6.19141 4.18359 7.75 6.125 7.75ZM16.6797 10.9766C16.7617 10.5938 16.7617 10.1836 16.6797 9.80078L17.3906 9.39062C17.4727 9.36328 17.5 9.25391 17.4727 9.17188C17.2812 8.57031 16.9805 8.05078 16.5703 7.58594C16.5156 7.53125 16.4062 7.50391 16.3242 7.55859L15.6133 7.96875C15.3125 7.72266 14.9844 7.50391 14.6016 7.39453V6.57422C14.6016 6.46484 14.5469 6.38281 14.4375 6.38281C13.8359 6.24609 13.207 6.24609 12.6328 6.38281C12.5508 6.38281 12.4961 6.46484 12.4961 6.57422V7.39453C12.1133 7.50391 11.7852 7.72266 11.4844 7.96875L10.7734 7.55859C10.6914 7.50391 10.582 7.53125 10.5273 7.58594C10.1172 8.05078 9.78906 8.57031 9.625 9.17188C9.59766 9.25391 9.625 9.36328 9.70703 9.39062L10.418 9.80078C10.3359 10.1836 10.3359 10.5938 10.418 10.9766L9.70703 11.3867C9.625 11.4141 9.59766 11.5234 9.625 11.6055C9.78906 12.207 10.1172 12.7266 10.5273 13.1914C10.582 13.2461 10.6914 13.2734 10.7734 13.2188L11.4844 12.8086C11.7852 13.0547 12.1133 13.2734 12.4961 13.3828V14.2031C12.4961 14.3125 12.5508 14.3945 12.6328 14.3945C13.2617 14.5312 13.8633 14.5312 14.4648 14.3945C14.5469 14.3945 14.6016 14.3125 14.6016 14.2031V13.3828C14.9844 13.2734 15.3125 13.0547 15.6133 12.8086L16.3242 13.2188C16.4062 13.2734 16.5156 13.2461 16.5703 13.1914C16.9805 12.7266 17.2812 12.207 17.4727 11.6055C17.5 11.5234 17.4727 11.4141 17.3906 11.3867L16.6797 10.9766ZM13.5625 11.7148C12.8242 11.7148 12.2227 11.1133 12.2227 10.375C12.2227 9.66406 12.8242 9.0625 13.5625 9.0625C14.2734 9.0625 14.875 9.66406 14.875 10.375C14.875 11.1133 14.2734 11.7148 13.5625 11.7148Z" fill="#737373"/>
                        </svg>
                            {user?.Role === "3" ? "Admin": user?.Role === "2" ? "Company Admin": user?.Role === "1"? "Site Manager": "Electripure engineer"}</p></div>
                        <div className="mt-[10px]"><p>Number of contacts: {user?.Contacts}</p></div>
                    </div>
                </div>
                <div className="flex w-[100%] mt-[25px] text-3xl items-center justify-evenly"><h1>Back up contact</h1><hr className="w-[75%]"/></div>
                <div className="mt-[25px] flex flex-wrap justify-around overflow-scroll">
                    {user?.contact_backup.map((contact:any, index:number)=>(
                        <div key={index} className="flex w-[600px] h-[220px] border m-[20px] justify-around">
                            <div className="flex w-[90%] p-[20px] flex-col">
                                <div className="flex items-center">
                                    <div className="rounded-[50%] border w-[80px] h-[80px] flex justify-around items-center font-bold text-2xl">
                                        <h1>{contact?.contact_name[0].toUpperCase()}{contact?.contact_name[1].toUpperCase()}</h1>
                                    </div>
                                    <p className="text-3xl ml-[50px]">{contact.contact_name}</p>
                                </div>
                                <div className="ml-[120px] flex items-center">
                                    <div>
                                        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 0.625H1.75C0.765625 0.625 0 1.41797 0 2.375V11.125C0 12.1094 0.765625 12.875 1.75 12.875H14C14.957 12.875 15.75 12.1094 15.75 11.125V2.375C15.75 1.41797 14.957 0.625 14 0.625ZM4.8125 3.25C5.76953 3.25 6.5625 4.04297 6.5625 5C6.5625 5.98438 5.76953 6.75 4.8125 6.75C3.82812 6.75 3.0625 5.98438 3.0625 5C3.0625 4.04297 3.82812 3.25 4.8125 3.25ZM7.4375 10.25H2.1875C1.94141 10.25 1.75 10.0586 1.75 9.8125C1.75 8.60938 2.70703 7.625 3.9375 7.625H5.6875C6.89062 7.625 7.875 8.60938 7.875 9.8125C7.875 10.0586 7.65625 10.25 7.4375 10.25ZM13.5625 8.5H10.0625C9.81641 8.5 9.625 8.30859 9.625 8.0625C9.625 7.84375 9.81641 7.625 10.0625 7.625H13.5625C13.7812 7.625 14 7.84375 14 8.0625C14 8.30859 13.7812 8.5 13.5625 8.5ZM13.5625 6.75H10.0625C9.81641 6.75 9.625 6.55859 9.625 6.3125C9.625 6.09375 9.81641 5.875 10.0625 5.875H13.5625C13.7812 5.875 14 6.09375 14 6.3125C14 6.55859 13.7812 6.75 13.5625 6.75ZM13.5625 5H10.0625C9.81641 5 9.625 4.80859 9.625 4.5625C9.625 4.34375 9.81641 4.125 10.0625 4.125H13.5625C13.7812 4.125 14 4.34375 14 4.5625C14 4.80859 13.7812 5 13.5625 5Z" fill="#737373"/>
                                        </svg>
                                    </div>
                                    <div className="ml-[10px]">
                                        <p>{contact.contact_cellphone}</p>
                                        <p>{contact.contact_email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[10%]">
                                <svg className="m-auto mt-[30px]" width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.69141 1.24219C3.82812 0.941406 4.12891 0.75 4.45703 0.75H7.76562C8.09375 0.75 8.39453 0.941406 8.53125 1.24219L8.75 1.625H11.375C11.8398 1.625 12.25 2.03516 12.25 2.5C12.25 2.99219 11.8398 3.375 11.375 3.375H0.875C0.382812 3.375 0 2.99219 0 2.5C0 2.03516 0.382812 1.625 0.875 1.625H3.5L3.69141 1.24219ZM0.847656 4.25H11.375V13C11.375 13.9844 10.582 14.75 9.625 14.75H2.59766C1.64062 14.75 0.847656 13.9844 0.847656 13V4.25ZM3.03516 6.4375V12.5625C3.03516 12.8086 3.25391 13 3.47266 13C3.71875 13 3.91016 12.8086 3.91016 12.5625V6.4375C3.91016 6.21875 3.71875 6 3.47266 6C3.25391 6 3.03516 6.21875 3.03516 6.4375ZM5.66016 6.4375V12.5625C5.66016 12.8086 5.87891 13 6.09766 13C6.34375 13 6.5625 12.8086 6.5625 12.5625V6.4375C6.5625 6.21875 6.34375 6 6.09766 6C5.87891 6 5.66016 6.21875 5.66016 6.4375ZM8.3125 6.4375V12.5625C8.3125 12.8086 8.50391 13 8.75 13C8.96875 13 9.1875 12.8086 9.1875 12.5625V6.4375C9.1875 6.21875 8.96875 6 8.75 6C8.50391 6 8.3125 6.21875 8.3125 6.4375Z" fill="#737373"/>
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default UserDetails;
