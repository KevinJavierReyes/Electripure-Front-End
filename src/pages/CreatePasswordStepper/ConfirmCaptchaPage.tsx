import { useEffect, Fragment } from "react";
import Navbar from "../../components/Navbar";
import Stepper from "../../components/StepperProgress/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import { ElectripureState } from "../../interfaces/reducers";
import { useSelector } from "react-redux";
import { TYPE_SPACE } from "../../config/enum";
import Space from "../../components/Space";
import Card from "../../components/Card";
import StepperProgress from "../../components/StepperProgress";
import ChooseViewForm from "../../components/Form/ChooseViewForm";
import { ButtonLink } from "../../components/FormInput/Button";

function ConfirmCaptchaPage() {

  const navigate = useNavigate();
  const { token } = useParams();
  const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);

  useEffect(() => {
    if (electripureJwt == null) {
      navigate( `/confirm/${token}/step/2`);
    }
  }, [electripureJwt]);

  function submitChooseViewForm() {
    skip();
  }

  function skip() {
    navigate(`/confirm/${token}/step/4`);
  }

  return (<Fragment>
    <Navbar>
        <div className="w-full max-w-[430px]">
          <Space type={TYPE_SPACE.FORM_DISTANCE} />
          <Card>
            <div className="px-[50px] pt-[20px] pb-[40px]">
              <StepperProgress totalSteps={4} completedSteps={3} />
              <ChooseViewForm onSubmit={submitChooseViewForm}/>
              <Space type={TYPE_SPACE.INPUT_DISTANCE} />
              <div className="flex justify-center">
                <ButtonLink onClick={skip}>
                  Skip for now
                </ButtonLink>
              </div>
            </div>
          </Card>
        </div>
    </Navbar>
  </Fragment>);
}

export default ConfirmCaptchaPage;
