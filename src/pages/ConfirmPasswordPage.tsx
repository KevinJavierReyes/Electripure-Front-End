import * as React from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import { validatePasswordControl } from "./../libs/form-validation";
import { InputControl } from "../interfaces/form-control";
import { STATE_INPUT_CONTROL } from "./../config/enum";

function ConfirmPasswordPage() {

  const navigate = useNavigate()
  const { token } = useParams();

  localStorage.removeItem("password");
  localStorage.removeItem("token");

  const [passwordControl, setPasswordControl] = React.useState({
    "value": "",
    "message": "",
    "state": STATE_INPUT_CONTROL.DEFAULT
  });

  const [confirmPasswordControl, setConfirmPasswordControl] = React.useState({
    "value": "",
    "message": "",
    "state": STATE_INPUT_CONTROL.DEFAULT
  });

  function savePasswords() {
    if (passwordControl.state == STATE_INPUT_CONTROL.OK && confirmPasswordControl.state == STATE_INPUT_CONTROL.OK) {
      localStorage.setItem("password", passwordControl.value);
      localStorage.setItem("token", token!);
      console.log("Passwords saved!!")
      navigate( `/confirm/${token}/step/2`);
    }
  }

  function validateConfirmPassword(value: string) {
    const newPasswordControl: InputControl = validatePasswordControl(value);
    if (newPasswordControl.state == STATE_INPUT_CONTROL.OK && newPasswordControl.value != passwordControl.value) {
      newPasswordControl.state = STATE_INPUT_CONTROL.ERROR;
      newPasswordControl.message = "Passwords do not match.";
    }
    setConfirmPasswordControl(newPasswordControl);
  }

  return (
    <React.Fragment>
      <Navbar/>
      <div className="w-full flex justify-center items-center py-[60px]">
          <Stepper
            totalSteps={4}
            completedSteps={1}
            title="Create password"
            buttonTitle="Next"
            buttonClasses="bg-color-primary color-white h-[45px]"
            buttonClick={()=> {
              savePasswords();
            }}>

            <p className="color-black-dark f-medium">Email</p>
            <p>email@company.com</p>
            <br/>
            <p>Use 8 or more characters with a mix of letters, numbers and characters.</p>
            <br/>

            <Input
              name="password"
              type="password"
              placeholder="*********"
              label="Password"
              change={(value: string)=> {
                const newPasswordControl: InputControl = validatePasswordControl(value);
                setPasswordControl(newPasswordControl);
                validateConfirmPassword(confirmPasswordControl.value);
              }}
              success={passwordControl.state == STATE_INPUT_CONTROL.OK}
              messageSuccess={""}
              error={passwordControl.state == STATE_INPUT_CONTROL.ERROR}
              messageError={passwordControl.message} />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="*********"
              label="Confirm password"
              change={(value: string)=> {
                validateConfirmPassword(value);
              }}
              success={confirmPasswordControl.state == STATE_INPUT_CONTROL.OK}
              messageSuccess={""}
              error={confirmPasswordControl.state == STATE_INPUT_CONTROL.ERROR}
              messageError={confirmPasswordControl.message} />

          </Stepper>
      </div>
    </React.Fragment>
  );
}

export default ConfirmPasswordPage;
