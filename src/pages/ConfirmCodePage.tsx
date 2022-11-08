import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode, setLoginToken, sendVerificationEmail } from "../actions/electripure";
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
    const loginToken:string = useSelector((state: ElectripureState) => state.loginToken)!;
    const current_user = JSON.parse(useSelector((state: ElectripureState) => state.currentUser) ?? "{}");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function resendCode() {
        dispatch(sendVerificationEmail({
            "token": loginToken
        }));
        console.log('resend code')
    }

    useEffect(()=> {
        if (electripureJwt) {
            localStorage.setItem("electripureJwt", electripureJwt)
            localStorage.setItem("current_user", current_user.fullname);
            localStorage.setItem("user_id", current_user.id);
            navigate(`/dashboard/user/list`);
        }
    }, [electripureJwt]);

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
