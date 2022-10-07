
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setJwt, setLoading, showToast } from "../actions/electripure";
import Button from "../components/Button";
import FormCard from "../components/FormCard";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { STATE_INPUT_CONTROL } from "../config/enum";
import { InputControl } from "../interfaces/form-control";
import { ElectripureState } from "../interfaces/reducers";
import { validateEmailControl, validatePasswordControl } from "./../libs/form-validation";
import { buttonPrimaryStyle, buttonSecondaryStyle } from "./../utils/styles";
import Checkbox from "../components/Checkbox";




function LoginPage() {

    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt) || localStorage.getItem("electripureJwt");
  
    useEffect(()=> {
        if (electripureJwt) {
            dispatch(setJwt({
                "token": electripureJwt
            }))
        };
    }, []);
   

    const loginToken = useSelector((state: ElectripureState) => state.loginToken);

    const dispatch = useDispatch();

    const navigate = useNavigate();

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

    const [remember, setRemember ] = useState(false);

    function validateCredentials() {
        if (passwordControl.state == STATE_INPUT_CONTROL.OK || emailControl.state == STATE_INPUT_CONTROL.OK) {
            dispatch(login({
                "email": emailControl.value,
                "password": passwordControl.value,
            }));
        }
    }
    
    function forgotPassword() {
        navigate( `/reset`);
    }

    useEffect(()=> {
        if (loginToken) {
            localStorage.setItem("rememberPassword", `${remember}`);
            navigate(`/login/verify/select`);
        }
    }, [loginToken])

    useEffect(()=> {
        if (electripureJwt) {
            navigate(`/user/list`);
        }
    }, [electripureJwt])
  
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
                    success={emailControl.state == STATE_INPUT_CONTROL.OK && false}
                    messageSuccess={""}
                    error={emailControl.state == STATE_INPUT_CONTROL.ERROR}
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
                    success={passwordControl.state == STATE_INPUT_CONTROL.OK && false}
                    messageSuccess={""}
                    error={passwordControl.state == STATE_INPUT_CONTROL.ERROR}
                    messageError={passwordControl.message} />

                    <Checkbox
                        label="Remember password"
                        name="rememberpassword"
                        checked={(checked: boolean)=> {
                            setRemember(checked);
                        }}
                        success={false}
                        messageSuccess={""}
                        error={false}
                        messageError={""} / >
                </div>
                
                <div className={"justify-center items-center mt-[20px] flex"}>
                    <button className="color-black-dark text-sm underline" onClick={forgotPassword}>Forgot your password?</button>
                </div>

                <Button title="Log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={validateCredentials} />

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