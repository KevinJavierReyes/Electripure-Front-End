
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormCard from "../components/FormCard";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { InputControl } from "../interfaces/form-control";
import { validateEmailControl } from "./../libs/form-validation";
import { buttonPrimaryStyle } from "./../utils/styles";


function ConfirmCodeSentPage() {

    const navigate = useNavigate();

    const [emailControl, setEmailControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    function next() {
        navigate("/login");
    }
    
    return (
        <React.Fragment>
          <Navbar/>
          <div className="w-full flex justify-center items-center py-[60px]">
              <FormCard
                title="Reset password">

                <div className="my-[30px]">
                    <p>
                        You have been emailed a temporary link that you can use to update your password. Please check your email account and click the link to change your password.
                    </p>
                </div>
                
                <Button title="Back to log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={next} />
    
              </FormCard>
          </div>
        </React.Fragment>
    );
}

export default ConfirmCodeSentPage;