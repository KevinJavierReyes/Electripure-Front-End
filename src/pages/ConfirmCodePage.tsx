
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode, setLoginToken } from "../actions/electripure";
import {Button} from "../components/Button";
import FormCard from "../components/FormCard";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { STATE_INPUT_CONTROL } from "../config/enum";
import { InputControl } from "../interfaces/form-control";
import { ElectripureState } from "../interfaces/reducers";
import { validateCodeControl } from "./../libs/form-validation";
import { buttonPrimaryStyle, buttonSecondaryStyle } from "./../utils/styles";


function ConfirmCodePage() {

    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);
    const loginToken = useSelector((state: ElectripureState) => state.loginToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [codeControl, setCodeControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    function sendCode() {
        if (codeControl.state == STATE_INPUT_CONTROL.OK) {
            dispatch(sendVerificationCode({
                "code": codeControl.value,
                "token": loginToken!
            }));
        }
    }

    useEffect(()=> {
        if (electripureJwt) {
            if ( localStorage.getItem("rememberPassword") == "true") {
                localStorage.setItem("electripureJwt", electripureJwt)
            }
            navigate(`/user/list`);
        }
    }, [electripureJwt]);
    
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
                        const newCodeControl: InputControl = validateCodeControl(value);
                        setCodeControl(newCodeControl);
                    }}
                    success={codeControl.state == 1}
                    messageSuccess={""}
                    error={codeControl.state == 0}
                    messageError={codeControl.message} />
                </div>
                

                <div className={"justify-start items-center flex"}>
                    <button className="color-black-dark text-sm underline" onClick={()=> {}}>Resend code</button>
                </div>

                <Button title="Log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={sendCode} />

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