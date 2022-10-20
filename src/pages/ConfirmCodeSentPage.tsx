
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "../components/Button";
import Card from "../components/Card";
import FormCard from "../components/FormCard";
import { ButtonPrimary } from "../components/FormInput/Button";
import Title from "../components/FormInput/Title";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Space from "../components/Space";
import { TYPE_SPACE } from "../config/enum";
import { InputControl } from "../interfaces/form-control";
import { validateEmailControl } from "./../libs/form-validation";
import { buttonPrimaryStyle } from "./../utils/styles";


function ConfirmCodeSentPage() {

    const navigate = useNavigate();


    function next() {
        navigate("/login");
    }
    
    return (
        <React.Fragment>
            <Navbar>
                <div className="w-full max-w-[430px]">
                <Space type={TYPE_SPACE.FORM_DISTANCE} />
                <Card>
                    <div className="px-[50px] pt-[20px] pb-[40px]">
                        <Title title="Reset password"/>
                        <p className="color-black-dark">
                        You have been emailed a temporary link that you can use to update your password. Please check your email account and click the link to change your password.
                        </p>
                        <Space type={TYPE_SPACE.FORM_DISTANCE} />
                        <ButtonPrimary onClick={next}>
                            Back to log in
                        </ButtonPrimary>
                    </div>
                </Card>
                </div>
            </Navbar>
        </React.Fragment>
    );
}

export default ConfirmCodeSentPage;