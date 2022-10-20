
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendForgotPassword } from "../actions/electripure";
import Card from "../components/Card";
import RequestResetPasswordForm from "../components/Form/RequestResentPasswordForm";
import Navbar from "../components/Navbar";
import Space from "../components/Space";
import { TYPE_SPACE } from "../config/enum";
import { RequestResetPasswordDataForm } from "../interfaces/form";
import { ElectripureState } from "../interfaces/reducers";


function  RequestResetPasswordPage() {

    const navigate = useNavigate();
    const toatMessage = useSelector((state: ElectripureState) => state.toastMessage);
    const dispatch = useDispatch();

    function submitRequestResetPasswordForm(data: RequestResetPasswordDataForm) {
        dispatch(sendForgotPassword({
            "email": data.email
        }));
    }

    useEffect(()=>{
        if (toatMessage == "Email sent!") {
            navigate("/reset/sent");
        }
    }, [toatMessage])
    
    return (
        <React.Fragment>
            <Navbar>
                <div className="w-full max-w-[430px]">
                <Space type={TYPE_SPACE.FORM_DISTANCE} />
                <Card>
                    <div className="px-[50px] pt-[20px] pb-[40px]">
                        <RequestResetPasswordForm onSubmit={submitRequestResetPasswordForm}  />
                    </div>
                </Card>
                </div>
            </Navbar>
        </React.Fragment>
    );
}

export default RequestResetPasswordPage;