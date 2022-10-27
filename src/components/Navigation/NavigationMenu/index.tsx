import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setJwt, setLoginToken, setTimestampTwoStepVerification } from "../../../actions/electripure";
import { BasicCompanyInformationDataForm, MainPointContactDataForm, SiteDetailDataForm, SiteManagerDataForm } from "../../../interfaces/form";
import BasicCompanyInformationForm from "../../Form/BasicCompanyInformationForm";
import MainPointContactForm from "../../Form/MainPointContactForm";
import SiteDetailForm from "../../Form/SiteDetailForm";
import SiteManagerForm from "../../Form/SiteManagerForm";
import { ModalMiddle } from "../../Modal";
import logoUrl from "./../../../assets/svg/Logo.svg";

import DropdownSelector from "./DropdownSelector"


function NavbarMenu() {
    const [isShowModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    
    const [newCompanyRaw, setNewCompany] = useState("{}");
    const [stepCreateCompany, setStepCreateCompany] = useState(1);
    const newCompany = JSON.parse(newCompanyRaw);

   

    function submitBasicCompanyInformationForm(data: BasicCompanyInformationDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "basicInformation": data
        }));
        setStepCreateCompany(2);
    }

    function submitMainPointContactForm(data: MainPointContactDataForm) {
        setStepCreateCompany(3);
    }

    function submitSiteManagerForm(data: SiteManagerDataForm) {
        setStepCreateCompany(4);
    }

    function submitSiteDetailForm(data: SiteDetailDataForm) {
        setStepCreateCompany(5);
    }

    function previousStepCreateCompany() {
        setStepCreateCompany(stepCreateCompany - 1);
    }


    // function logout() {
    //     dispatch(setTimestampTwoStepVerification({
    //         "timestamp": null
    //     }));
    //     dispatch(setLoginToken({
    //         "token": null
    //     }));
    //     dispatch(setJwt({
    //         "token": null
    //     }));
    //     localStorage.removeItem("electripureJwt");
    //     // navigate("/login");
    // }

    return (
        <div className="w-full h-screen	flex justify-start items-center flex-col shadow-md border-r border-color-black-light">
            <div className="w-full px-[10px] py-[15px]">
                <img src={logoUrl} className="h-[40px]"></img>
            </div>
            {/* <div className="w-full px-[30px]"> */}
                {/*<button onClick={logout}>Log out</button> */}
            {/* </div> */}
            <DropdownSelector onCreateCompany={()=> {
                setShowModal(true);
            }}/>
            <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false)}}>
                {
                    stepCreateCompany == 1 ? <BasicCompanyInformationForm onSubmit={submitBasicCompanyInformationForm}/> :
                    stepCreateCompany == 2 ? <MainPointContactForm onSubmit={submitMainPointContactForm} onPrevious={previousStepCreateCompany}/> :
                    stepCreateCompany == 3 ? <SiteManagerForm onSubmit={submitSiteManagerForm} onPrevious={previousStepCreateCompany}/> :
                    stepCreateCompany == 4 ? <SiteDetailForm onSubmit={submitSiteDetailForm} onPrevious={previousStepCreateCompany}/> : <div></div>
                }
            </ModalMiddle>  
        </div>
    );
    
}

export default NavbarMenu;
