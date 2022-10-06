import { Fragment, MouseEventHandler, useState } from "react";
import { STATE_INPUT_CONTROL } from "../../config/enum";
import { InputControl } from "../../interfaces/form-control";
import { validateCellphoneControl, validateEmailControl, validateNameControl } from "./../../libs/form-validation";
import FormCard from "../FormCard";
import Input from "../Input";
import PopUp from "../PopUp";
import Button from "../Button";
import { buttonPrimaryStyle } from "../../utils/styles";
import Select from "../Select";
import ElectripureService from "./../../service/electripure-service";
import { ResponseGeneric } from "../../interfaces/base-service";
import { CreateUserRequest } from "../../interfaces/electripure-service";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { setLoading, showToast } from "../../actions/electripure";

function PopUpCreateUser(props: { show: boolean, title: string, closeEvent: MouseEventHandler }) {


  const dispatch = useDispatch();

  const [emailControl, setEmailControl] = useState({
    "value": "",
    "message": "",
    "state": STATE_INPUT_CONTROL.DEFAULT
  });

  const [cellphoneControl, setCellphoneControl] = useState({
    "value": "",
    "message": "",
    "state": STATE_INPUT_CONTROL.DEFAULT
  });

  const [nameControl, setNameControl] = useState({
    "value": "",
    "message": "",
    "state": STATE_INPUT_CONTROL.DEFAULT
  });

  const [companyControl, setCompanyControl] = useState({
    "value": "Outcode",
    "message": "",
    "state": STATE_INPUT_CONTROL.OK
  });

  async function next(e: any) {
    if (emailControl.state == STATE_INPUT_CONTROL.OK &&
      cellphoneControl.state == STATE_INPUT_CONTROL.OK  &&
      nameControl.state == STATE_INPUT_CONTROL.OK &&
      companyControl.state == STATE_INPUT_CONTROL.OK ) {
        dispatch(setLoading({
          loading: true
        }));
        const payload: CreateUserRequest = {
          fullname: nameControl.value,
          email: emailControl.value,
          cellphone: cellphoneControl.value,
          company: companyControl.value,
          role: "E - Admin"
        }
        const responseAddContact: ResponseGeneric = await ElectripureService.createUser(payload).finally(()=>{
          dispatch(setLoading({
            loading: false
          }));
        });
        if (responseAddContact.success) {
          dispatch(showToast({
            message: `User created!`,
            status: "success"
          }));
          props.closeEvent(e);
        } else {
          dispatch(showToast({
            "message": responseAddContact.error!,
            "status": "error"
          }));
        }
    }
  }

  return (
    <Fragment>
      <PopUp show={props.show} title={"Lets get some basic information"}>
        <div className={"fixed h-full w-full justify-center items-center top-0 left-0 " + (props.show ? "flex" : "hidden")} style={{ "backgroundColor": "rgba(0, 0, 0, 0.4)" }}>
          <FormCard title={props.title} classes="max-w-[1000px] rounded relative">
            <span className="absolute top-[10px] right-[10px] cursor-pointer" onClick={props.closeEvent}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <div className="mt-[30px]">
              <Input
                name="name"
                type="text"
                placeholder="Jhon Doe"
                label="Full Name"
                change={(value: string) => {
                  const newNameControl: InputControl = validateNameControl(value);
                  setNameControl(newNameControl);
                }}
                success={nameControl.state == STATE_INPUT_CONTROL.OK && false}
                messageSuccess={nameControl.message}
                error={nameControl.state == STATE_INPUT_CONTROL.ERROR}
                messageError={nameControl.message} />
              <Input
                name="email"
                type="email"
                placeholder="justin.smith@outcodesoftware.com"
                label="Email"
                change={(value: string) => {
                  const newEmailControl: InputControl = validateEmailControl(value);
                  setEmailControl(newEmailControl);
                }}
                success={emailControl.state == STATE_INPUT_CONTROL.OK && false}
                messageSuccess={emailControl.message}
                error={emailControl.state == STATE_INPUT_CONTROL.ERROR}
                messageError={emailControl.message} />
              <Input
                name="phone"
                type="phone"
                placeholder="( 801 ) 250 - 2872"
                label="Cellphone"
                change={(value: string) => {
                  const newCellphoneControl: InputControl = validateCellphoneControl(value);
                  setCellphoneControl(newCellphoneControl);
                }}
                success={cellphoneControl.state == STATE_INPUT_CONTROL.OK && false}
                messageSuccess={cellphoneControl.message}
                error={cellphoneControl.state == STATE_INPUT_CONTROL.ERROR}
                messageError={cellphoneControl.message} />
              <Select
                name="company"
                options={[{"value": "Outcode", "id": 1}, {"value": "Outcode 2", "id": 2}]}
                placeholder="Select a company"
                label="Company"
                change={(selected: {"value": any, "id": any}) => {
                  // console.log(selected);
                  setCompanyControl({
                    ...companyControl,
                    value: selected.value
                  }); 
                  // const newCellphoneControl: InputControl = validateCellphoneControl(value);
                  // setCellphoneControl(newCellphoneControl);
                }}
                success={companyControl.state == STATE_INPUT_CONTROL.OK && false}
                messageSuccess={companyControl.message}
                error={companyControl.state == STATE_INPUT_CONTROL.ERROR}
                messageError={companyControl.message} />
            </div>

            <div className={"justify-center items-center mt-[20px] flex"}>
              <Button title="Add" classes={buttonPrimaryStyle + " max-w-[150px]"} click={next} />
            </div>


          </FormCard>
        </div>
      </PopUp>
    </Fragment>
    
  );
}
export default PopUpCreateUser;