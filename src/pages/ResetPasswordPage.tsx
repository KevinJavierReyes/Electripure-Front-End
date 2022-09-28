
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormCard from "../components/FormCard";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { STATE_INPUT_CONTROL } from "../config/enum";
import { InputControl } from "../interfaces/form-control";
import { validateEmailControl, validatePasswordControl } from "../libs/form-validation";
import { buttonPrimaryStyle } from "../utils/styles";


function  ResetPasswordPage() {
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

    function validateConfirmPassword(value: string) {
    const newPasswordControl: InputControl = validatePasswordControl(value);
    if (newPasswordControl.state == STATE_INPUT_CONTROL.OK && newPasswordControl.value != passwordControl.value) {
        newPasswordControl.state = STATE_INPUT_CONTROL.ERROR;
        newPasswordControl.message = "Passwords do not match.";
    }
    setConfirmPasswordControl(newPasswordControl);
    }

    function next() {}

    return (
        <React.Fragment>
          <Navbar/>
          <div className="w-full flex justify-center items-center py-[60px]">
              <FormCard
                title="Reset password">

                <div className="mt-[30px]">

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


                </div>
                
                <Button title="Log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={next} />
    
              </FormCard>
          </div>
        </React.Fragment>
    );
}

export default ResetPasswordPage;