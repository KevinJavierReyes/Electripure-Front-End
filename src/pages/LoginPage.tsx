
import * as React from "react";
import { useState } from "react";
import Button from "../components/Button";
import FormCard from "../components/FormCard";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { InputControl } from "../interfaces/form-control";
import { validateEmailControl, validatePasswordControl } from "./../libs/form-validation";
import { buttonPrimaryStyle, buttonSecondaryStyle } from "./../utils/styles";


function LoginPage() {

    const [passwordControl, setPasswordControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    const [emailControl, setEmailControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });
    
    return (
        <React.Fragment>
          <Navbar/>
          <div className="w-full flex justify-center items-center py-[60px]">
              <FormCard
                title="Log in to electripure">

                <div className="mt-[30px]">
                    <Input
                    name="email"
                    type="email"
                    placeholder="email@company.com"
                    label="Email"
                    change={(value: string)=> {
                        const newEmailControl: InputControl = validateEmailControl(value);
                        setEmailControl(newEmailControl);
                    }}
                    success={emailControl.state == 1}
                    messageSuccess={""}
                    error={emailControl.state == 0}
                    messageError={emailControl.message} />
                    <Input
                    name="password"
                    type="password"
                    placeholder="*********"
                    label="Password"
                    change={(value: string)=> {
                        const newPasswordControl: InputControl = validatePasswordControl(value);
                        setPasswordControl(newPasswordControl);
                    }}
                    success={passwordControl.state == 1}
                    messageSuccess={""}
                    error={passwordControl.state == 0}
                    messageError={passwordControl.message} />
                </div>
                

                <div className={"justify-center items-center mt-[20px] flex"}>
                    <button className="color-black-dark text-sm underline" onClick={()=> {}}>Forgot your password?</button>
                </div>

                <Button title="Log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={()=> {}} />

                <div className={"justify-center items-center mt-[0px] flex"}>
                    <span className="color-black-dark text-sm">Don’t have an account?</span>
                </div>

                <div className={"justify-center items-center mt-[20px] flex"}>
                    <Button title="Contact us" classes={buttonSecondaryStyle + " max-w-[150px]"} click={()=> {}} />
                </div>

    
              </FormCard>
          </div>
        </React.Fragment>
    );
}

export default LoginPage;