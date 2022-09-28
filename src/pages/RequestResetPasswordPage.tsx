
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormCard from "../components/FormCard";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { InputControl } from "../interfaces/form-control";
import { validateEmailControl } from "../libs/form-validation";
import { buttonPrimaryStyle } from "../utils/styles";


function  RequestResetPasswordPage() {

    const navigate = useNavigate();

    const [emailControl, setEmailControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    function next() {
        navigate("/reset/sent");
    }
    
    return (
        <React.Fragment>
          <Navbar/>
          <div className="w-full flex justify-center items-center py-[60px]">
              <FormCard
                title="Reset password">

                <div className="my-[30px]">

                    <p className="mb-[20px]">
                        Enter your email below and we will email you a temporary reset link.
                        <br/>
                        <br/>
                        The reset link will expire after 24 hours.
                    </p>
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
                </div>
                
                <Button title="Log in" classes={buttonPrimaryStyle} click={next} />
    
              </FormCard>
          </div>
        </React.Fragment>
    );
}

export default RequestResetPasswordPage;