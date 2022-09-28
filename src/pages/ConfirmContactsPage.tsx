import * as React from "react";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import { ContactGroup } from "./../interfaces/form-control";
import { validateCellphone, validateName, validateEmail } from "./../libs/form-validation";
import { STATE_INPUT_CONTROL } from "./../config/enum";
import ElectripureService from "./../service/electripure-service";
import { AddContactRequest } from "../interfaces/electripure-service";
import { ResponseGeneric } from "../interfaces/base-service";
import { toast, ToastContainer } from "react-toastify";
import { Session } from "../interfaces/session";
import Loading from "../components/Loading";

function ConfirmContactsPage() {

  const [contacts, setContacts] = useState(JSON.stringify([{
    "contactName": {
      "value": "",
      "message": "",
      "status": STATE_INPUT_CONTROL.DEFAULT
    },
    "email": {
      "value": "",
      "message": "",
      "status": STATE_INPUT_CONTROL.DEFAULT
    },
    "phone": {
      "value": "",
      "message": "",
      "status": STATE_INPUT_CONTROL.DEFAULT
    },
  }]));

  let session: Session | null = null;
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  // validate if exists session
  useEffect(() => {
    if (!localStorage.getItem("session")) {
      session = JSON.parse(localStorage.getItem("session")!);
      navigate( `/confirm/${token}/step/2`);
    }
  });

  async function next() {
    const ctgs: ContactGroup[] = JSON.parse(contacts);
    const ctgsErrorFiltered: ContactGroup[] = ctgs.filter((ctg: ContactGroup) => {
      return ctg.contactName.state != STATE_INPUT_CONTROL.OK && ctg.email.state != STATE_INPUT_CONTROL.OK && ctg.phone.state != STATE_INPUT_CONTROL.OK;
    });
    if (ctgsErrorFiltered.length == 0) {
      setIsLoading(true);
      await Promise.all(ctgs.map(async (ctg: ContactGroup, index: number) => {
        const payload: AddContactRequest = {
          "user_email": session?.email!,
          "contact_name": ctg.contactName.value,
          "contact_email": ctg.email.value,
          "contact_cellphone": ctg.phone.value
        };
        const responseAddContact: ResponseGeneric = await ElectripureService.addContact(payload);
        if (responseAddContact.success) {
          toast.success(`Contact ${index + 1} created!`, {
            "position": "bottom-right"
          });
        } else {
          toast.error(responseAddContact.error, {
            "position": "bottom-right"
          });
        }
      }));
      setIsLoading(false);
      setTimeout(()=> {
        skip(); 
      }, 1000);
    }
  }

  function skip() {
    navigate(`/dashboard`);
  }

  function addContact() {
    const ctgs: ContactGroup[] =  JSON.parse(contacts);
    setContacts(JSON.stringify([...ctgs, {
      "contactName": {
        "value": "",
        "message": "",
        "status": STATE_INPUT_CONTROL.DEFAULT
      },
      "email": {
        "value": "",
        "message": "",
        "status": STATE_INPUT_CONTROL.DEFAULT
      },
      "phone": {
        "value": "",
        "message": "",
        "status": STATE_INPUT_CONTROL.DEFAULT
      },
    }]));
  }

  function setContact(contact: ContactGroup, index: number) {
    const ctgs: ContactGroup[] =  JSON.parse(contacts);
    ctgs[index] = contact;
    setContacts(JSON.stringify(ctgs));
  }

  function validateContact(contact: ContactGroup) {
    if (contact.contactName.value == "") {
      contact.contactName.state = STATE_INPUT_CONTROL.DEFAULT;
    } else {
      const nameResult = validateName(contact.contactName.value);
      if (nameResult.valid) {
        contact.contactName.state = STATE_INPUT_CONTROL.OK;
        contact.contactName.message = "";
      } else {
        contact.contactName.message = nameResult.error!;
        contact.contactName.state = STATE_INPUT_CONTROL.ERROR;
      }
    }

    if (contact.phone.value == "") {
      contact.phone.state = STATE_INPUT_CONTROL.DEFAULT;
    } else {
      const cellphoneResult = validateCellphone(contact.phone.value);
      if (cellphoneResult.valid) {
        contact.phone.state = STATE_INPUT_CONTROL.OK;
        contact.phone.message = "";
      } else {
        contact.phone.message = cellphoneResult.error!;
        contact.phone.state = STATE_INPUT_CONTROL.ERROR;
      }
    }

    if (contact.email.value == "") {
      contact.email.state = STATE_INPUT_CONTROL.DEFAULT;
    } else {
      const emailResult = validateEmail(contact.email.value);
      if (emailResult.valid) {
        contact.email.state = STATE_INPUT_CONTROL.OK;
        contact.email.message = "";
      } else {
        contact.email.message = emailResult.error!;
        contact.email.state = STATE_INPUT_CONTROL.ERROR;
      }
    }

    return contact;
  }

  return (
    <React.Fragment>
      <Loading show={isLoading}/>
      <Navbar/>
      <div className="w-full flex justify-center items-center py-[60px]">
          <Stepper
            totalSteps={4}
            completedSteps={4}
            title="Create your back up contacts"
            buttonTitle="Add contact"
            buttonClasses="bg-color-primary color-white h-[45px]"
            buttonClick={next}
            skipClick={skip}>

              <p>If we aren’t able to get a hold of you who would be the best to reach out to?</p>
              <br/>

              {(JSON.parse(contacts) as ContactGroup[]).map((contact: ContactGroup, index: number)=> {
                return <div key={index} style={{marginTop: index == 0 ? "0px" : "20px" }}>
                  <h3 className="color-primary-dark f-bold subtitle">{"Contact " + (index + 1)}</h3>
                  <Input
                    name={"contactName" + index}
                    type="text"
                    placeholder="Firstname Lastname"
                    label="Contacts name"
                    change={(value: string)=> {
                      const contactValidated: any = validateContact({
                        ...contact,
                        "contactName": {
                          ...contact.contactName,
                          "value": value
                        }
                      });
                      setContact(contactValidated, index);
                    }}
                    success={contact.contactName.state == STATE_INPUT_CONTROL.OK}
                    messageSuccess={""}
                    error={contact.contactName.state == STATE_INPUT_CONTROL.ERROR}
                    messageError={contact.contactName.message} />
                  <Input
                    name={"email" + index}
                    type="email"
                    placeholder="email@company.com"
                    label="Email"
                    change={(value: string)=> {
                      const contactValidated: any = validateContact({
                        ...contact,
                        "email": {
                          ...contact.email,
                          "value": value
                        }
                      });
                      setContact(contactValidated, index);
                    }}
                    success={contact.email.state == STATE_INPUT_CONTROL.OK}
                    messageSuccess={""}
                    error={contact.email.state == STATE_INPUT_CONTROL.ERROR}
                    messageError={contact.email.message} />
                  <Input
                    name={"phone" + index}
                    type="phone"
                    placeholder="(***) *** - ****"
                    label="Cellphone"
                    change={(value: string)=> {
                      const contactValidated: any = validateContact({
                        ...contact,
                        "phone": {
                          ...contact.phone,
                          "value": value
                        }
                      });
                      setContact(contactValidated, index);
                    }}
                    success={contact.phone.state == STATE_INPUT_CONTROL.OK}
                    messageSuccess={""}
                    error={contact.phone.state == STATE_INPUT_CONTROL.ERROR}
                    messageError={contact.phone.message} />
                </div>;
              })}

              <div className={"justify-center items-center mt-[14px] flex"}>
                <button className="color-primary text-sm" onClick={ addContact }>+ Add another contact</button>
              </div>
          </Stepper>
      </div>
      <ToastContainer/>
    </React.Fragment>
  );
}

export default ConfirmContactsPage;
