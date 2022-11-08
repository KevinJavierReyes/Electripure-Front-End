import { useState } from "react";
import { INPUT_CONTROL_STATE, TYPE_SPACE, VERIFICATION_CHANNEL } from "../../../config/enum";
import { ResetPasswordDataForm, SelectVerifyMethodDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validatePasswordControl } from "../../../libs/form-validation";
import { ButtonPrimary, ButtonSecondary } from "../../FormInput/Button";
import InputPassword from "../../FormInput/InputPassword";
import Title from "../../FormInput/Title";
import Space from "../../Space";


function SelectVerifyMethodForm({onSubmit}: {onSubmit: (data: SelectVerifyMethodDataForm) => void}) {
    
    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Two-step verification"></Title>
        <p>How would you like to recieve your autherization code?</p>
        <br/>
        <div className="w-full flex justify-center"> 
            <ButtonSecondary classes="h-[101px] w-[100px]"  onClick={()=> {onSubmit({"channel": VERIFICATION_CHANNEL.EMAIL})}}>
                <div className="flex flex-col justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <p className="color-black-dark f-medium">Email</p>
                </div>       
            </ButtonSecondary>    
            {/* <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <ButtonSecondary classes="h-[101px] w-[100px]"  onClick={()=> {onSubmit({"channel": VERIFICATION_CHANNEL.SMS})}}>
                <div className="flex flex-col justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <p className="color-black-dark f-medium">SMS</p>
                </div>       
            </ButtonSecondary> */}


            {/* <div className="my-[10px] w-full">
                        <OptionCard title="Email" description="jus*********@out***.com" click={selectMethodEmail}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </OptionCard>
                    </div>
                    <div className="my-[10px] w-full">
                        <OptionCard title="SMS" description="(385) *** - **723" click={()=> {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>
                        </OptionCard>
                    </div>       */}
            {/* <InputPassword
                state={passwordControl.state}
                message={passwordControl.message}
                name={"password"}
                placeholder={"*********"}
                label={"Password"}
                onChange={(value: string) => {
                    const newPasswordControl: InputControl = validatePasswordControl(value);
                    setPasswordControl(newPasswordControl);
                    validateConfirmPassword(confirmPasswordControl.value);
                }}
            />
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputPassword
                state={confirmPasswordControl.state}
                message={confirmPasswordControl.message}
                name={"confirmPassword"}
                placeholder={"*********"}
                label={"Confirm password"}
                onChange={(value: string) => {
                    validateConfirmPassword(value);
                }}
            />
            <Space classes="h-[80px]"/>
            <ButtonPrimary onClick={submit}>
             Log in
            </ButtonPrimary> */}
        </div>
    </div>)
}

export default SelectVerifyMethodForm;
