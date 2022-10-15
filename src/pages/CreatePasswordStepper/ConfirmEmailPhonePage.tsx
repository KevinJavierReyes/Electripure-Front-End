import { useState, Fragment } from "react";
import Card from "../../components/Card";
import ConfirmEmailPhoneForm from "../../components/Form/ConfirmEmailPhoneForm";
import Navbar from "../../components/Navbar";
import Space from "../../components/Space";
import StepperProgress from "../../components/StepperProgress";
import { useEffect } from "react";
import { TYPE_SPACE } from "../../config/enum";
import { ConfirmEmailPhoneDataForm, CreatePasswordDataForm } from "../../interfaces/form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ElectripureState } from "../../interfaces/reducers";
import { sendUpdateUser } from "../../actions/electripure";

function ConfirmEmailPhonePage() {

  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const toastMessage = useSelector((state: ElectripureState) => state.toastMessage);
  
  // Validate step 1 completed
  useEffect(() => {
    if (!localStorage.getItem("password") || !localStorage.getItem("email") || !localStorage.getItem("token")) {
      navigate( `/confirm/${token}/step/1`);
    }
  });
  
  useEffect(() => {
    if (toastMessage == "Account updated successfully!") {
      navigate( `/confirm/${token}/step/3`);
    }
  }, [toastMessage]);
  // async function updateInfo() {
  //   if (emailControl.state == STATE_INPUT_CONTROL.OK && cellphoneControl.state == STATE_INPUT_CONTROL.OK) {
  //     localStorage.setItem("email", emailControl.value);
  //     localStorage.setItem("phone", cellphoneControl.value);
  //     const password = localStorage.getItem("password");
  //     const token = localStorage.getItem("token");
  //     dispatch(setLoading({
  //       loading: true
  //     }));
  //     const payload: UpdateUserRequest = {
  //       "email": emailControl.value,
  //       "cellphone": cellphoneControl.value,
  //       "password": password!,
  //       "token": token!
  //     };
  //     const responseUpdateUser: ResponseGeneric = await ElectripureService.updateUser(payload).finally(()=> {
  //       dispatch(setLoading({
  //         loading: false
  //       }));
  //     });
  //     if (responseUpdateUser.success && responseUpdateUser.statusCode == 200) {
  //       //Create session
  //       dispatch(setJwt({
  //         "token": "KevinJWT"
  //       }));
  //       dispatch(showToast({
  //         message: "Account updated successfully!",
  //         status: "success"
  //       }));
  //       // localStorage.setItem("session", JSON.stringify({
  //       //   "phone": cellphoneControl.value,
  //       //   "email": emailControl.value
  //       // }));
  //       navigate( `/confirm/${token}/step/3`);
  //     }
  //   }
  // }

  function submitConfirmEmailPhoneForm(data: ConfirmEmailPhoneDataForm) {
    localStorage.setItem("email", data.email);
    localStorage.setItem("phone", data.phone);
    const password = localStorage.getItem("password");
    const token = localStorage.getItem("token");
    console.log({
      password: password,
      token: token,
      email: data.email,
      phone: data.phone
    });
    dispatch(sendUpdateUser({
      "email": data.email,
      "cellphone": data.phone,
      "password": password!,
      "token": token!
    }))
  }


  return (<Fragment>
    <Navbar>
        <div className="w-full max-w-[430px]">
          <Space type={TYPE_SPACE.FORM_DISTANCE} />
          <Card>
            <div className="px-[50px] pt-[20px] pb-[40px]">
              <StepperProgress totalSteps={4} completedSteps={2} />
              <ConfirmEmailPhoneForm onSubmit={submitConfirmEmailPhoneForm}/>
            </div>
          </Card>
        </div>
    </Navbar>
  </Fragment>);
}

export default ConfirmEmailPhonePage;
