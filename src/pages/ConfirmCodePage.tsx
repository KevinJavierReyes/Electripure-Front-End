
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormCard from "../components/FormCard";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { InputControl } from "../interfaces/form-control";
import { validateEmailControl, validatePasswordControl } from "./../libs/form-validation";
import { buttonPrimaryStyle, buttonSecondaryStyle } from "./../utils/styles";


function ConfirmCodePage() {

    const navigate = useNavigate();

    const [codeControl, setCodeControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    function next() {
        navigate(`/user/list`);
    }
    
    return (
        <React.Fragment>
          <Navbar/>
          <div className="w-full flex justify-center items-center py-[60px]">
              <FormCard
                title="Enter your autherization code">

                <div className="mt-[30px]">
                    <Input
                    name="code"
                    type="text"
                    placeholder="000000"
                    label="6 digital code"
                    change={(value: string)=> {
                        setCodeControl({
                            ...codeControl,
                            "value": value
                        });
                    }}
                    success={codeControl.state == 1}
                    messageSuccess={""}
                    error={codeControl.state == 0}
                    messageError={codeControl.message} />
                </div>
                

                <div className={"justify-start items-center flex"}>
                    <button className="color-black-dark text-sm underline" onClick={()=> {}}>Resend code</button>
                </div>

                <Button title="Log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={next} />

                <div className="mb-[200px]"></div>

                <div className={"justify-center items-center mt-[0px] hidden"}>
                    <span className="color-black-dark text-sm">Sign in with another method</span>
                </div>

                <div className={"hidden justify-center items-center mt-[20px]"}>
                    <Button title="Contact us" classes={buttonSecondaryStyle + " max-w-[150px]"} click={()=> {}} />
                </div>

    
              </FormCard>
          </div>
        </React.Fragment>
    );
}

export default ConfirmCodePage;