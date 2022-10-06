
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendVerificationEmail, setLoading } from "../actions/electripure";
import Button from "../components/Button";
import FormCard from "../components/FormCard";
import Navbar from "../components/Navbar";
import OptionCard from "../components/OptionCard";
import { ElectripureState } from "../interfaces/reducers";


function SelectVerifyMethodPage() {
    
    const timestampTwoStepVerification = useSelector((state: ElectripureState) => state.timestampTwoStepVerification);
    const loginToken: string = useSelector((state: ElectripureState) => state.loginToken)!;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function selectMethodEmail() {
        dispatch(sendVerificationEmail({
            "token": loginToken
        }));
    }

    useEffect(() => {
        if (timestampTwoStepVerification != null) {
            navigate( `/login/verify/confirm`);
        }
    }, [timestampTwoStepVerification]);


    return (
        <React.Fragment>
          <Navbar/>
          <div className="w-full flex justify-center items-center py-[60px]">
              <FormCard
                title="Two-step verification">

                <br/>
                <p>How would you like to recieve your autherization code?</p>
                <br/>

                <div className={"flex justify-center items-center mt-[10px] flex-wrap"}>
                    <div className="my-[10px] w-full">
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
                    </div>
                </div>

                <div className="mb-[50%]"></div>
    
              </FormCard>
          </div>
        </React.Fragment>
    );
}

export default SelectVerifyMethodPage;