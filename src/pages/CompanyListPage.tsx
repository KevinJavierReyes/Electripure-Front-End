import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendAddCompany } from "../actions/electripure"
import { ElectripureState } from "./../interfaces/reducers";
import BasicCompanyInformationForm from "../components/Form/BasicCompanyInformationForm"
import { BasicCompanyInformationDataForm, 
         MainPointContactDataForm, 
         SiteManagerDataForm, 
         CreateMDPDataForm,
         SiteDetailDataForm } from "../interfaces/form"

import MainPointContactForm from "../components/Form/MainPointContactForm";
import { ModalMiddle } from "./../components/Modal";
import SiteManagerForm from "./../components/Form/SiteManagerForm";
import SiteDetailForm from "./../components/Form/SiteDetailForm";
import CreateMDPForm from "./../components/Form/CreateMDPForm"
import FinishCreateMDPForm from "./../components/Form/FinishCreateMDPForm"

// import { useState } from "react";
// import { useDispatch } from "react-redux";

// Import interfaces
// import { BasicCompanyInformationDataForm, CreateUserDataForm, MainPointContactDataForm, SiteDetailDataForm, SiteManagerDataForm } from "../interfaces/form";

// Import components
// import { ModalMiddle } from "../components/Modal";
// import CreateUserForm from "../components/Form/CreateUserForm";
import Navegation from "../components/Navigation";
import { ButtonSecondary } from "../components/FormInput/Button";
import DataTableCompanies from "../components/DataTables/DataTableCompanies";

function CompanyListPage () {
    const [isShowModal, setShowModal] = useState(false);
    const [siteDefaultDataForm, setSiteDefaultDataForm] = useState(`{
        "name": "",
        "address": "",
        "address2": "",
        "city": "",
        "state": "",
        "zip": "",
        "logo": "",
        "rate": "",
        "schematic": ""
    }`);
    const toastMessage = useSelector((state: ElectripureState) => state.toastMessage);
    const dispatch = useDispatch();
    
    const [newCompanyRaw, setNewCompany] = useState(`{  "id_user": 42 } `);
    const [stepCreateCompany, setStepCreateCompany] = useState(1);
    const newCompany = JSON.parse(newCompanyRaw);


    function submitBasicCompanyInformationForm(data: BasicCompanyInformationDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "basicInformation": {
                "companyName" : data.company,
                "address" : data.address,
                "address2" : data.address2,
                "city" : data.city,
                "state": data.state,
                "zip": data.zip,
                "imgId" : data.logo
            }
        }));
        setSiteDefaultDataForm(JSON.stringify({
            "address": data.address,
            "address2": data.address2,
            "city": data.city,
            "state": data.state,
            "zip": data.zip
        }));
        console.log("Step 1", data);
        setStepCreateCompany(2);
    }

    function submitMainPointContactForm(data: MainPointContactDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "mainPointContact" : {
                "fullName" : data.fullname,
                "email" : data.email,
                "cellPhone" : data.cellphone
            }
        }));
        console.log("Step 2", data);
        setStepCreateCompany(3);
    
    }

    function submitSiteManagerForm(data: SiteManagerDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "siteManager" : {
                "fullName" : data.fullname,
                "email" : data.email,
                "cellPhone" : data.cellphone
            }
        }));
        console.log("Step 3", data);
        setStepCreateCompany(4);
    }

    function submitSiteDetailForm(data: SiteDetailDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "siteDetails" : {
                "siteName" : data.name,
                "address" : data.address,
                "address2" : data.address2,
                "city" : data.city,
                "state": data.state,
                "zip": data.zip,
                "paymentSchedule" : data.rate,
                "imgId" : data.logo,
                "imgSchematic" : data.schematic
            }
        }));
        console.log("Step 4", data);
        setStepCreateCompany(5);
    }

    function submitCreateMDPForm(data: CreateMDPDataForm[]) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "MDP": data.map((mdpData: CreateMDPDataForm) => {
                return {
                    "siteName" : mdpData.name,
                    "meterID" : mdpData.meterId,
                    "applianceID" : mdpData.applianceId,
                    "MDP" : mdpData.ampCap,
                    "switchgear": mdpData.switchgearCap,
                    "transformer": mdpData.transformer
                };
            })
        }));
        console.log("Step 5", data);
        dispatch(sendAddCompany({
            ...newCompany,
            "MDP": data.map((mdpData: CreateMDPDataForm) => {
                return {
                    "siteName" : mdpData.name,
                    "meterID" : mdpData.meterId,
                    "applianceID" : mdpData.applianceId,
                    "MDP" : mdpData.ampCap,
                    "switchgear": mdpData.switchgearCap,
                    "transformer": mdpData.transformer
                };
            })
        }));
    }

    function previousStepCreateCompany() {
        setStepCreateCompany(stepCreateCompany - 1);
    }

    useEffect(() => {
        if (toastMessage == "Company created!") {
            // setStepCreateCompany(6);
            setShowModal(false);
            setStepCreateCompany(1);
        }
    }, [toastMessage])

    return (
        <Fragment>
            <Navegation>
                <div className="px-[30px] py-[10px] w-full">
                    <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                        <div className={"w-[200px]"}>
                            <ButtonSecondary onClick={()=> setShowModal(true)}>
                                <span className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                    <span className="f-medium">Add new company</span>
                                </span>
                            </ButtonSecondary>

                            <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false); setStepCreateCompany(1);}}>
                                {
                                    stepCreateCompany == 1 ? <BasicCompanyInformationForm onSubmit={submitBasicCompanyInformationForm}/> :
                                    stepCreateCompany == 2 ? <MainPointContactForm onSubmit={submitMainPointContactForm} onPrevious={previousStepCreateCompany}/> :
                                    stepCreateCompany == 3 ? <SiteManagerForm onSubmit={submitSiteManagerForm} onPrevious={previousStepCreateCompany}/> :
                                    stepCreateCompany == 4 ? <SiteDetailForm defaultData={JSON.parse(siteDefaultDataForm)} onSubmit={submitSiteDetailForm} onPrevious={previousStepCreateCompany}/> :
                                    stepCreateCompany == 5 ? <CreateMDPForm onSubmit={submitCreateMDPForm} onPrevious={previousStepCreateCompany}/> :
                                    stepCreateCompany == 6 ? <FinishCreateMDPForm onClose={()=>{setShowModal(false); setStepCreateCompany(1);}}/> : <div></div>
                                }
                            </ModalMiddle>  

                        </div>
                        <span className="ml-[20px]"><h3 className="f-bold text-lg">Company Management</h3></span>
                    </div>
                    <div className="w-full rounded border-color-secondary border">
                        <DataTableCompanies />
                    </div>
                </div>
            </Navegation>
            {/* <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false)}}>
                <CreateUserForm onSubmit={submitCreateUserForm}/>
            </ModalMiddle>   */}
        </Fragment>
    );
}

export default CompanyListPage;
