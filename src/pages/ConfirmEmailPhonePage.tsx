import * as React from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function ConfirmEmailPhonePage() {

  const navigate = useNavigate();
  const { token } = useParams();

  React.useEffect(() => {
    if (!localStorage.getItem("password") || !localStorage.getItem("token")) {
      navigate( `/confirm/${token}/step/1`);
    }
  });

  

  // 0 => Error
  // 1 => Success
  const [emailStatus, setEmailStatus] = React.useState(-1);
  const [phoneStatus, setPhoneStatus] = React.useState(-1);
  const [emailMessage, setEmailMessage] = React.useState("");
  const [phoneMessage, setPhoneMessage] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [phoneValue, setPhoneValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function validateEmail(email: string) : boolean {
    let emailValid = false;
    if (email == "") {
      setEmailStatus(-1);
      emailValid = false;
    } else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailStatus(0);
      setEmailMessage("Invalid email format")
      emailValid = false;
    } else {
      setEmailStatus(-1);
      emailValid = true;
    }
    return emailValid;
  }

  function validatePhone(phone:string) : boolean {
    let phoneValid = false;
    if (phone == "") {
      setPhoneStatus(-1);
      phoneValid = false;
    } else {
      setPhoneStatus(-1);
      phoneValid = true;
    }
    return phoneValid;
  }

  async function updateInfo() {
    if (validateEmail(emailValue) && validatePhone(phoneValue)) {
      localStorage.setItem("email", emailValue);
      localStorage.setItem("phone", phoneValue);
      const password = localStorage.getItem("password");
      const token = localStorage.getItem("token");
      const baseUrl = 'http://flaskapi-env.eba-swfkr2ub.us-east-1.elasticbeanstalk.com/update_user'
      const url = `${baseUrl}?email=${emailValue}&cellphone=${phoneValue}&password=${password}&token=${token}`;
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }).finally(()=> {
        setIsLoading(false);
      });
      const status = response.status;
      if (status == 200) {
        localStorage.setItem("session", JSON.stringify({
          "phone": phoneValue,
          "email": emailValue
        }));
        navigate( `/confirm/${token}/step/3`);
      }
    }
  }

  return (
    <React.Fragment>
      <Loading show={isLoading}/>
      <Navbar/>
      <div className="w-full flex justify-center items-center py-[60px]">
          <Stepper
            totalSteps={4}
            completedSteps={2}
            title="Confirm email & cellphone for two-step verification"
            buttonTitle="Confirm"
            buttonClasses="bg-color-primary color-white h-[45px]"
            buttonClick={()=> {
              updateInfo();
            }}>

            <p>In order to log in to electripure you will need to sign in with two-step verificaiton</p>
            <br/>

            <Input
              name="email"
              type="email"
              placeholder="justin.smith@outcodesoftware.com"
              label="Email"
              change={(value: string)=> {
                // console.log("Email: " + value);
                validateEmail(value);
                setEmailValue(value);
              }}
              success={emailStatus == 1}
              messageSuccess={emailMessage}
              error={emailStatus == 0}
              messageError={emailMessage} />
            <Input
              name="phone"
              type="phone"
              placeholder="( 801 ) 250 - 2872"
              label="Cellphone"
              change={(value: string)=> {
                // console.log("phone: " + value);
                validatePhone(value);
                setPhoneValue(value);
              }}
              success={phoneStatus == 1}
              messageSuccess={phoneMessage}
              error={phoneStatus == 0}
              messageError={phoneMessage} />

          </Stepper>
      </div>
    </React.Fragment>
  );
}

export default ConfirmEmailPhonePage;
