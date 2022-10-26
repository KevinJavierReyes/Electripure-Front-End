import { useState } from "react";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { CreateBackupContactDataForm } from "../../../interfaces/form";
import { ContactGroup } from "../../../interfaces/form-control";
import { validateCellphone, validateEmail, validateName } from "../../../libs/form-validation";
import { ButtonLink, ButtonPrimary } from "../../FormInput/Button";
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";

function CreateBackupContactsForm({ onSubmit }: { onSubmit: (data: CreateBackupContactDataForm[]) => void}) {

    const [contacts, setContacts] = useState(JSON.stringify([{
        "contactName": {
          "value": "",
          "message": "",
          "status": INPUT_CONTROL_STATE.DEFAULT
        },
        "email": {
          "value": "",
          "message": "",
          "status": INPUT_CONTROL_STATE.DEFAULT
        },
        "phone": {
          "value": "",
          "message": "",
          "status": INPUT_CONTROL_STATE.DEFAULT
        },
    }]));

    function addContact() {
        const ctgs: ContactGroup[] =  JSON.parse(contacts);
        setContacts(JSON.stringify([...ctgs, {
          "contactName": {
            "value": "",
            "message": "",
            "status": INPUT_CONTROL_STATE.DEFAULT
          },
          "email": {
            "value": "",
            "message": "",
            "status": INPUT_CONTROL_STATE.DEFAULT
          },
          "phone": {
            "value": "",
            "message": "",
            "status": INPUT_CONTROL_STATE.DEFAULT
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
            contact.contactName.state = INPUT_CONTROL_STATE.DEFAULT;
            contact.contactName.message = "";
        } else {
            const nameResult = validateName(contact.contactName.value);
            if (nameResult.valid) {
                contact.contactName.state = INPUT_CONTROL_STATE.OK;
                contact.contactName.message = "";
            } else {
                contact.contactName.message = nameResult.error!;
                contact.contactName.state = INPUT_CONTROL_STATE.ERROR;
            }
        }

        if (contact.phone.value == "") {
            contact.phone.state = INPUT_CONTROL_STATE.DEFAULT;
            contact.phone.message = "";
        } else {
            const cellphoneResult = validateCellphone(contact.phone.value);
            if (cellphoneResult.valid) {
                contact.phone.state = INPUT_CONTROL_STATE.OK;
                contact.phone.message = "";
            } else {
                contact.phone.message = cellphoneResult.error!;
                contact.phone.state = INPUT_CONTROL_STATE.ERROR;
            }
        }

        if (contact.email.value == "") {
            contact.email.state = INPUT_CONTROL_STATE.DEFAULT;
            contact.email.message = "";
        } else {
            const emailResult = validateEmail(contact.email.value);
            if (emailResult.valid) {
                contact.email.state = INPUT_CONTROL_STATE.OK;
                contact.email.message = "";
            } else {
                contact.email.message = emailResult.error!;
                contact.email.state = INPUT_CONTROL_STATE.ERROR;
            }
        }

        return contact;
    }

    function submit() {
        const ctgs: ContactGroup[] = JSON.parse(contacts);
        const ctgsErrorFiltered: ContactGroup[] = ctgs.filter((ctg: ContactGroup) => {
          return ctg.contactName.state != INPUT_CONTROL_STATE.OK || ctg.email.state != INPUT_CONTROL_STATE.OK || ctg.phone.state != INPUT_CONTROL_STATE.OK;
        });
        if (ctgsErrorFiltered.length == 0) {
            onSubmit(ctgs.map((group: ContactGroup): CreateBackupContactDataForm =>{
                return {
                    "name": group.contactName.value,
                    "email": group.email.value,
                    "phone": group.phone.value
                };
            }))
        }
    }

    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Create your back up contacts"></Title>
        
        <p>If we aren’t able to get a hold of you who would be the best to reach out to?</p>
        <br/>

        {(JSON.parse(contacts) as ContactGroup[]).map((contact: ContactGroup, index: number)=> {
            return <div key={index} style={{marginTop: index == 0 ? "0px" : "20px" }}>
                <h3 className="color-primary-dark f-bold subtitle">{"Contact #" + (index + 1)}</h3>
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"contactName" + index}
                    placeholder="Firstname Lastname"
                    label="Contacts name"
                    onChange={(value: string)=> {
                        const contactValidated: any = validateContact({
                        ...contact,
                        "contactName": {
                            ...contact.contactName,
                            "value": value
                        }
                        });
                        setContact(contactValidated, index);
                    }}
                    state={contact.contactName.state}
                    message={contact.contactName.message}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"email" + index}
                    placeholder="email@company.com"
                    label="Email"
                    onChange={(value: string)=> {
                        const contactValidated: any = validateContact({
                            ...contact,
                            "email": {
                                ...contact.email,
                                "value": value
                            }
                        });
                        setContact(contactValidated, index);
                    }}
                    state={contact.email.state}
                    message={contact.email.message}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"phone" + index}
                    placeholder="(***) *** - ****"
                    label="Cellphone"
                    onChange={(value: string)=> {
                        const contactValidated: any = validateContact({
                            ...contact,
                            "phone": {
                                ...contact.phone,
                                "value": value
                            }
                        });
                        setContact(contactValidated, index);
                    }}
                    state={contact.phone.state}
                    message={contact.phone.message}
                />
            </div>;
        })}
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="flex justify-center align-center">
            <ButtonLink onClick={addContact} classes="color-primary no-underline">
                + Add another contact
            </ButtonLink>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <ButtonPrimary onClick={submit}>
            Add contact
        </ButtonPrimary>
    </div>);
}

export default CreateBackupContactsForm;