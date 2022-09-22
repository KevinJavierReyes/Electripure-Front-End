import * as React from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";

function ConfirmCaptchaPage() {

  const navigate = useNavigate();
  const { token } = useParams();

  React.useEffect(() => {
    if (!localStorage.getItem("session")) {
      navigate( `/confirm/${token}/step/2`);
    }
  });

  function next() {
    navigate(`/confirm/${token}/step/4`);
  }

  return (
    <React.Fragment>
      <Navbar/>
      <div className="w-full flex justify-center items-center py-[60px]">
          <Stepper
            totalSteps={4}
            completedSteps={3}
            title="Choose your preferred view"
            buttonTitle="Next"
            buttonClasses="bg-color-primary color-white h-[45px]"
            buttonClick={next}
            skipClick={next}>

              <div className="bg-color-secondary w-full h-[400px]">

              </div>

          </Stepper>
      </div>
    </React.Fragment>
  );
}

export default ConfirmCaptchaPage;
