import { useEffect, Fragment } from "react";
import Card from "../../components/Card";
import CreateBackupContactsForm from "../../components/Form/CreateBackupContactsForm";
import { ButtonLink } from "../../components/FormInput/Button";
import Navbar from "../../components/Navbar";
import Space from "../../components/Space";
import StepperProgress from "../../components/StepperProgress";
import { TYPE_SPACE } from "../../config/enum";
import { CreateBackupContactDataForm } from "../../interfaces/form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendAddContacts } from "../../actions/electripure";
import { ElectripureState } from "../../interfaces/reducers";

function CreateBackupContactsPage() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastMessage = useSelector((state: ElectripureState) => state.toastMessage);

  useEffect(() => {
    if (toastMessage == "Contacts created!") {
      skip();
    }
  }, [toastMessage])

  function submitCreateBackupContactsForm(data: CreateBackupContactDataForm[]) {
    console.log("Contacts");
    console.log(data);
    dispatch(sendAddContacts(data));
  }
  
  function skip() {
    navigate(`/user/list`);
  }

  return (
    <Fragment>
      <Navbar>
          <div className="w-full max-w-[430px]">
            <Space type={TYPE_SPACE.FORM_DISTANCE} />
            <Card>
              <div className="px-[50px] pt-[20px] pb-[40px]">
                <StepperProgress totalSteps={4} completedSteps={4} />
                <CreateBackupContactsForm onSubmit={submitCreateBackupContactsForm}/>
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
    </Fragment>
  );

}

export default CreateBackupContactsPage;
