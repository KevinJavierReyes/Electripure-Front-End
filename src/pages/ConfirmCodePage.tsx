import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode, setLoginToken } from "../actions/electripure";
import Card from "../components/Card";
import ConfirmCodeForm from "../components/Form/ConfirmCodeForm";
import Navbar from "../components/Navbar";
import Space from "../components/Space";
import { STATE_INPUT_CONTROL, TYPE_SPACE } from "../config/enum";
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
            navigate(`/user/list`);
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
    // return (
    //     <React.Fragment>
    //       <Navbar/>
    //       <div className="w-full flex justify-center items-center py-[60px]">
    //           <FormCard
    //             title="Enter your autherization code">

    //             <div className="mt-[30px]">
    //                 <Input
    //                 name="code"
    //                 type="text"
    //                 placeholder="000000"
    //                 label="6 digital code"
    //                 change={(value: string)=> {
    //                     const newCodeControl: InputControl = validateCodeControl(value);
    //                     setCodeControl(newCodeControl);
    //                 }}
    //                 success={codeControl.state == 1}
    //                 messageSuccess={""}
    //                 error={codeControl.state == 0}
    //                 messageError={codeControl.message} />
    //             </div>
                

    //             <div className={"justify-start items-center flex"}>
    //                 <button className="color-black-dark text-sm underline" onClick={()=> {}}>Resend code</button>
    //             </div>

    //             <Button title="Log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={sendCode} />

    //             <div className="mb-[200px]"></div>

    //             <div className={"justify-center items-center mt-[0px] hidden"}>
    //                 <span className="color-black-dark text-sm">Sign in with another method</span>
    //             </div>

    //             <div className={"hidden justify-center items-center mt-[20px]"}>
    //                 <Button title="Contact us" classes={buttonSecondaryStyle + " max-w-[150px]"} click={()=> {}} />
    //             </div>

    
    //           </FormCard>
    //       </div>
    //     </React.Fragment>
    // );
}

export default ConfirmCodePage;