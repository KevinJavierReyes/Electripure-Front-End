import * as React from "react";
import { useState } from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import ElectripureService from "./../service/electripure-service";
import { UpdateUserRequest } from "./../interfaces/electripure-service";
import { ResponseGeneric } from "../interfaces/base-service";
import { STATE_INPUT_CONTROL } from "./../config/enum";
import { validateCellphoneControl, validateEmailControl } from "../libs/form-validation";
import { InputControl } from "../interfaces/form-control";
import { useDispatch } from "react-redux";
import { setJwt, setLoading, showToast } from "../actions/electripure";

function ConfirmEmailPhonePage() {

  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  // Validate step 1 completed
  React.useEffect(() => {
    if (!localStorage.getItem("password") || !localStorage.getItem("email") || !localStorage.getItem("token")) {
      navigate( `/confirm/${token}/step/1`);
    }
  });

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

  async function updateInfo() {
    if (emailControl.state == STATE_INPUT_CONTROL.OK && cellphoneControl.state == STATE_INPUT_CONTROL.OK) {
      localStorage.setItem("email", emailControl.value);
      localStorage.setItem("phone", cellphoneControl.value);
      const password = localStorage.getItem("password");
      const token = localStorage.getItem("token");
      dispatch(setLoading({
        loading: true
      }));
      const payload: UpdateUserRequest = {
        "email": emailControl.value,
        "cellphone": cellphoneControl.value,
        "password": password!,
        "token": token!
      };
      const responseUpdateUser: ResponseGeneric = await ElectripureService.updateUser(payload).finally(()=> {
        dispatch(setLoading({
          loading: false
        }));
      });
      if (responseUpdateUser.success && responseUpdateUser.statusCode == 200) {
        //Create session
        dispatch(setJwt({
          "token": "KevinJWT"
        }));
        dispatch(showToast({
          message: "Account updated successfully!",
          status: "success"
        }));
        // localStorage.setItem("session", JSON.stringify({
        //   "phone": cellphoneControl.value,
        //   "email": emailControl.value
        // }));
        navigate( `/confirm/${token}/step/3`);
      }
    }
  }

  return (
    <React.Fragment>
      <Navbar/>
      <div className="w-full flex justify-center items-center py-[60px]">
          <Stepper
            totalSteps={4}
            completedSteps={2}
            title="Confirm email & cellphone for two-step verification"
            buttonTitle="Confirm"
            buttonClasses="bg-color-primary color-white h-[45px]"
            buttonClick={()=> {
              updateInfo();
            }}>

            <p>In order to log in to electripure you will need to sign in with two-step verificaiton</p>
            <br/>

            <Input
              name="email"
              type="email"
              placeholder="justin.smith@outcodesoftware.com"
              label="Email"
              change={(value: string)=> {
                const newEmailControl: InputControl = validateEmailControl(value);
                setEmailControl(newEmailControl);
              }}
              success={emailControl.state == STATE_INPUT_CONTROL.OK}
              messageSuccess={emailControl.message}
              error={emailControl.state == STATE_INPUT_CONTROL.ERROR}
              messageError={emailControl.message} />
            <Input
              name="phone"
              type="phone"
              placeholder="( 801 ) 250 - 2872"
              label="Cellphone"
              change={(value: string)=> {
                const newCellphoneControl: InputControl = validateCellphoneControl(value);
                setCellphoneControl(newCellphoneControl);
              }}
              success={cellphoneControl.state == STATE_INPUT_CONTROL.OK}
              messageSuccess={cellphoneControl.message}
              error={cellphoneControl.state == STATE_INPUT_CONTROL.ERROR}
              messageError={cellphoneControl.message} />

          </Stepper>
      </div>
    </React.Fragment>
  );
}

export default ConfirmEmailPhonePage;
