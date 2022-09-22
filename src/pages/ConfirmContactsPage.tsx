import * as React from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";

function ConfirmContactsPage() {

  const navigate = useNavigate();
  const { token } = useParams();

  React.useEffect(() => {
    if (!localStorage.getItem("session")) {
      navigate( `/confirm/${token}/step/2`);
    }
  });

  function next() {
    navigate(`/dashboard`);
  }

  return (
    <React.Fragment>
      <Navbar/>
      <div className="w-full flex justify-center items-center py-[60px]">
          <Stepper
            totalSteps={4}
            completedSteps={4}
            title="Create your back up contacts"
            buttonTitle="Add contact"
            buttonClasses="bg-color-primary color-white h-[45px]"
            buttonClick={next}
            skipClick={next}>

              <p>If we aren’t able to get a hold of you who would be the best to reach out to?</p>
              <br/>
              
              <Input
                name="contactName"
                type="contactName"
                placeholder="Firstname Lastname"
                label="Contacts name"
                change={(value: string)=> {
                }}
                success={false}
                messageSuccess=""
                error={false}
                messageError="" />
              <Input
                name="email"
                type="email"
                placeholder="email@company.com"
                label="Email"
                change={(value: string)=> {
                }}
                success={false}
                messageSuccess=""
                error={false}
                messageError="" />
              <Input
                name="phone"
                type="phone"
                placeholder="(***) *** - ****"
                label="Cellphone"
                change={(value: string)=> {
                }}
                success={false}
                messageSuccess=""
                error={false}
                messageError="" />
              <div className={"justify-center items-center mt-[14px] flex"}>
                <button className="color-primary text-sm">+ Add another contact</button>
              </div>
          </Stepper>
      </div>
    </React.Fragment>
  );
}

export default ConfirmContactsPage;
