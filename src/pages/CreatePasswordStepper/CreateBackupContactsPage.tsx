import * as React from "react";
import { useState, useEffect, Fragment } from "react";
import Card from "../../components/Card";
import CreateBackupContactsForm from "../../components/Form/CreateBackupContactsForm";
import { ButtonLink } from "../../components/FormInput/Button";
import Navbar from "../../components/Navbar";
import Space from "../../components/Space";
import StepperProgress from "../../components/StepperProgress";
import { TYPE_SPACE } from "../../config/enum";
import { CreateBackupContactDataForm } from "../../interfaces/form";
// import Input from "../components/Input";
// import Navbar from "../components/Navbar";
// import Stepper from "../components/StepperProgress/Stepper";
// import { useNavigate, useParams } from "react-router-dom";
// import { ContactGroup } from "./../interfaces/form-control";
// import { validateCellphone, validateName, validateEmail } from "./../libs/form-validation";
// import { STATE_INPUT_CONTROL } from "./../config/enum";
// import ElectripureService from "./../service/electripure-service";
// import { AddContactRequest } from "../interfaces/electripure-service";
// import { ResponseGeneric } from "../interfaces/base-service";
// import { toast, ToastContainer } from "react-toastify";
// import { Session } from "../interfaces/session";
// import Loading from "../components/Loading";
// import { useDispatch } from "react-redux";
// import { setLoading, showToast } from "../actions/electripure";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendAddContacts } from "../../actions/electripure";
import { ElectripureState } from "../../interfaces/reducers";

function CreateBackupContactsPage() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastMessage = useSelector((state: ElectripureState) => state.toastMessage);

  useEffect(() => {
    if (toastMessage == "Contacts created!") {
      skip();
    }
  }, [toastMessage])

  function submitCreateBackupContactsForm(data: CreateBackupContactDataForm[]) {
    console.log("Contacts");
    console.log(data);
    dispatch(sendAddContacts(data));
  }
  
  function skip() {
    navigate(`/user/list`);
  }

  return (
    <Fragment>
      <Navbar>
          <div className="w-full max-w-[430px]">
            <Space type={TYPE_SPACE.FORM_DISTANCE} />
            <Card>
              <div className="px-[50px] pt-[20px] pb-[40px]">
                <StepperProgress totalSteps={4} completedSteps={4} />
                <CreateBackupContactsForm onSubmit={submitCreateBackupContactsForm}/>
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <div className="flex justify-center">
                  <ButtonLink onClick={skip}>
                    Skip for now
                  </ButtonLink>
                </div>
              </div>
            </Card>
          </div>
      </Navbar>
    </Fragment>
  );
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const email = localStorage.getItem("email");
  
  // async function saveContacts() {
  //   const ctgs: ContactGroup[] = JSON.parse(contacts);
  //   const ctgsErrorFiltered: ContactGroup[] = ctgs.filter((ctg: ContactGroup) => {
  //     return ctg.contactName.state != STATE_INPUT_CONTROL.OK && ctg.email.state != STATE_INPUT_CONTROL.OK && ctg.phone.state != STATE_INPUT_CONTROL.OK;
  //   });
  //   if (ctgsErrorFiltered.length == 0) {
  //     dispatch(setLoading({
  //       loading: true
  //     }));
  //     await Promise.all(ctgs.map(async (ctg: ContactGroup, index: number) => {
  //       //TODO Email tiene que ser tomado desde el jwt
  //       const payload: AddContactRequest = {
  //         "user_email": email!,
  //         "contact_name": ctg.contactName.value,
  //         "contact_email": ctg.email.value,
  //         "contact_cellphone": ctg.phone.value
  //       };
  //       const responseAddContact: ResponseGeneric = await ElectripureService.addContact(payload);
  //       if (responseAddContact.success) {
  //         dispatch(showToast({
  //           "message": `Contact ${index + 1} created!`,
  //           "status": "success"
  //         }));
  //       } else {
  //         dispatch(showToast({
  //           "message": responseAddContact.error!,
  //           "status": "error"
  //         }));
  //       }
  //     }));
  //     dispatch(setLoading({
  //       loading: false
  //     }));
  //     setTimeout(()=> {
  //       skip(); 
  //     }, 1000);
  //   }
  // }

  // function skip() {
  //   navigate(`/user/list`);
  // }

  
  // return (
  //   <React.Fragment>
  //     <Navbar/>
  //     <div className="w-full flex justify-center items-center py-[60px]">
  //         <Stepper
  //           totalSteps={4}
  //           completedSteps={4}
  //           title="Create your back up contacts"
  //           buttonTitle="Add contact"
  //           buttonClasses="bg-color-primary color-white h-[45px]"
  //           buttonClick={saveContacts}
  //           skipClick={skip}>

  //             <p>If we aren’t able to get a hold of you who would be the best to reach out to?</p>
  //             <br/>

  //             {(JSON.parse(contacts) as ContactGroup[]).map((contact: ContactGroup, index: number)=> {
  //               return <div key={index} style={{marginTop: index == 0 ? "0px" : "20px" }}>
  //                 <h3 className="color-primary-dark f-bold subtitle">{"Contact " + (index + 1)}</h3>
  //                 <Input
  //                   name={"contactName" + index}
  //                   type="text"
  //                   placeholder="Firstname Lastname"
  //                   label="Contacts name"
  //                   change={(value: string)=> {
  //                     const contactValidated: any = validateContact({
  //                       ...contact,
  //                       "contactName": {
  //                         ...contact.contactName,
  //                         "value": value
  //                       }
  //                     });
  //                     setContact(contactValidated, index);
  //                   }}
  //                   success={contact.contactName.state == STATE_INPUT_CONTROL.OK}
  //                   messageSuccess={""}
  //                   error={contact.contactName.state == STATE_INPUT_CONTROL.ERROR}
  //                   messageError={contact.contactName.message} />
  //                 <Input
  //                   name={"email" + index}
  //                   type="email"
  //                   placeholder="email@company.com"
  //                   label="Email"
  //                   change={(value: string)=> {
  //                     const contactValidated: any = validateContact({
  //                       ...contact,
  //                       "email": {
  //                         ...contact.email,
  //                         "value": value
  //                       }
  //                     });
  //                     setContact(contactValidated, index);
  //                   }}
  //                   success={contact.email.state == STATE_INPUT_CONTROL.OK}
  //                   messageSuccess={""}
  //                   error={contact.email.state == STATE_INPUT_CONTROL.ERROR}
  //                   messageError={contact.email.message} />
  //                 <Input
  //                   name={"phone" + index}
  //                   type="phone"
  //                   placeholder="(***) *** - ****"
  //                   label="Cellphone"
  //                   change={(value: string)=> {
  //                     const contactValidated: any = validateContact({
  //                       ...contact,
  //                       "phone": {
  //                         ...contact.phone,
  //                         "value": value
  //                       }
  //                     });
  //                     setContact(contactValidated, index);
  //                   }}
  //                   success={contact.phone.state == STATE_INPUT_CONTROL.OK}
  //                   messageSuccess={""}
  //                   error={contact.phone.state == STATE_INPUT_CONTROL.ERROR}
  //                   messageError={contact.phone.message} />
  //               </div>;
  //             })}

  //             <div className={"justify-center items-center mt-[14px] flex"}>
  //               <button className="color-primary text-sm" onClick={ addContact }>+ Add another contact</button>
  //             </div>
  //         </Stepper>
  //     </div>
  //     <ToastContainer/>
  //   </React.Fragment>
  // );
}

export default CreateBackupContactsPage;
