import { useEffect, Fragment } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendValidateToken } from "../../actions/electripure";
import Card from "../../components/Card";
import CreatePasswordForm from "../../components/Form/CreatePasswordForm";
import Space from "../../components/Space";
import { TYPE_SPACE } from "../../config/enum";
import StepperProgress from "../../components/StepperProgress";
import { CreatePasswordDataForm } from "../../interfaces/form";
import { ElectripureState } from "../../interfaces/reducers";
import { SetPasswordUserPayload } from "../../interfaces/actions";

function CreatePasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  localStorage.removeItem("password");
  localStorage.removeItem("token");

  const passwordToken = useSelector((state: ElectripureState) => state.passwordToken);
  const passwordUser: SetPasswordUserPayload = JSON.parse(useSelector((state: ElectripureState) => state.passwordUser)) as SetPasswordUserPayload;

  useEffect(() => {
    dispatch(sendValidateToken({
      "token": token!
    }));
  }, []);

  if (passwordToken == null) {
    return  (<Fragment>
        <Navbar>
          <div className="py-[60px]">
            <h2>Token expired.</h2>
          </div>
        </Navbar>
    </Fragment>)
  }

  function submitCreatePasswordForm(data: CreatePasswordDataForm) {
    localStorage.setItem("password", data.password);
    localStorage.setItem("token", token!);
    localStorage.setItem("email", passwordUser.email!);
    navigate( `/confirm/${token}/step/2`);
  }

  return (
    <Fragment>
      <Navbar>
          <div className="w-full max-w-[430px]">
            <Space type={TYPE_SPACE.FORM_DISTANCE} />
            <Card>
              <div className="px-[50px] pt-[20px] pb-[40px]">
                <StepperProgress totalSteps={4} completedSteps={1} />
                <CreatePasswordForm email={passwordUser.email!} onSubmit={submitCreatePasswordForm} />
              </div>
            </Card>
          </div>
      </Navbar>
    </Fragment>
  );
}

export default CreatePasswordPage;