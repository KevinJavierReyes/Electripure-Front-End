import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode, setLoginToken } from "../actions/electripure";
import Card from "../components/Card";
import ConfirmCodeForm from "../components/Form/ConfirmCodeForm";
import Navbar from "../components/Navbar";
import Space from "../components/Space";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../config/enum";
import { ConfirmCodeDataForm } from "../interfaces/form";
import { InputControl } from "../interfaces/form-control";
import { ElectripureState } from "../interfaces/reducers";
import { validateCodeControl } from "./../libs/form-validation";
import { buttonPrimaryStyle, buttonSecondaryStyle } from "./../utils/styles";


function ConfirmCodePage() {

    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);
    const loginToken = useSelector((state: ElectripureState) => state.loginToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        if (electripureJwt) {
            if (localStorage.getItem("rememberPassword") == "true") {
                localStorage.setItem("electripureJwt", electripureJwt)
            }
            navigate(`/dashboard`);
        }
    }, [electripureJwt]);

    function resendCode() {}

    function submitConfirmCodeForm(data: ConfirmCodeDataForm) {
        dispatch(sendVerificationCode({
            "code": data.code,
            "token": loginToken!
        }));
    }
    
    return (<Fragment>
        <Navbar>
            <div className="w-full max-w-[430px]">
            <Space type={TYPE_SPACE.FORM_DISTANCE} />
            <Card>
                <div className="px-[50px] pt-[20px] pb-[40px]">
                    <ConfirmCodeForm onSubmit={submitConfirmCodeForm} resendCode={resendCode}/>
                </div>
            </Card>
            </div>
        </Navbar>
    </Fragment>);
}

export default ConfirmCodePage;