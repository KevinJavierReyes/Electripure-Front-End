import * as React from "react";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import { ContactGroup } from "./../interfaces/form-control";
import { validateCellphone, validateName, validateEmail } from "./../libs/form-validation";

function ConfirmContactsPage() {

  const [contacts, setContacts] = useState(JSON.stringify([{
    "contactName": {
      "value": "",
      "message": "",
      "status": -1
    },
    "email": {
      "value": "",
      "message": "",
      "status": -1
    },
    "phone": {
      "value": "",
      "message": "",
      "status": -1
    },
  }]));

  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  // validate if exists session
  // useEffect(() => {
  //   if (!localStorage.getItem("session")) {
  //     navigate( `/confirm/${token}/step/2`);
  //   }
  // });

  function next() {
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
        "status": -1
      },
      "email": {
        "value": "",
        "message": "",
        "status": -1
      },
      "phone": {
        "value": "",
        "message": "",
        "status": -1
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
      contact.contactName.status = -1;
    } else {
      const nameResult = validateName(contact.contactName.value);
      console.log(nameResult);
      if (nameResult.valid) {
        contact.contactName.status = 2;
        contact.contactName.message = "";
      } else {
        contact.contactName.message = nameResult.error!;
        contact.contactName.status = 0;
      }
    }

    if (contact.phone.value == "") {
      contact.phone.status = -1;
    } else {
      const cellphoneResult = validateCellphone(contact.phone.value);
      if (cellphoneResult.valid) {
        contact.phone.status = 2;
        contact.phone.message = "";
      } else {
        contact.phone.message = cellphoneResult.error!;
        contact.phone.status = 0;
      }
    }

    if (contact.email.value == "") {
      contact.email.status = -1;
    } else {
      const emailResult = validateEmail(contact.email.value);
      if (emailResult.valid) {
        contact.email.status = 2;
        contact.email.message = "";
      } else {
        contact.email.message = emailResult.error!;
        contact.email.status = 0;
      }
    }

    return contact;
  }

  return (
    <React.Fragment>
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
                    success={contact.contactName.status == 1}
                    messageSuccess={contact.contactName.message}
                    error={contact.contactName.status == 0}
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
                    success={contact.email.status == 1}
                    messageSuccess={contact.email.message}
                    error={contact.email.status == 0}
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
                    success={contact.phone.status == 1}
                    messageSuccess={contact.phone.message}
                    error={contact.phone.status == 0}
                    messageError={contact.phone.message} />
                </div>;
              })}

              <div className={"justify-center items-center mt-[14px] flex"}>
                <button className="color-primary text-sm" onClick={ addContact }>+ Add another contact</button>
              </div>
          </Stepper>
      </div>
    </React.Fragment>
  );
}

export default ConfirmContactsPage;
