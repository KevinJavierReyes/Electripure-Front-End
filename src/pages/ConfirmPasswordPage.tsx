import * as React from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";

function ConfirmPasswordPage() {

  const navigate = useNavigate()
  const { token } = useParams();

  localStorage.removeItem("password");
  localStorage.removeItem("token");

  // 0 => Error
  // 1 => Success
  const [passwordStatus, setPasswordStatus] = React.useState(-1);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = React.useState(-1);
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");

  function validatePassword(password: string) : boolean {
    let passwordValid = false;
    // console.log("Password: " + password);
    if (password == "") {
      setPasswordStatus(-1);
      passwordValid = false;
    } else if (!password.match(/^[0-9a-zA-Z]{8,}$/)) {
      setPasswordStatus(0);
      setPasswordMessage("Use 8 or more characters with a mix of letters, numbers and characters.")
      passwordValid = false;
    } else {
      setPasswordStatus(-1);
      passwordValid = true;
    }
    return passwordValid;
  }

  function validateConfirmPassword(confirmPassword:string, password: string) : boolean {
    let confirmPasswordValid = false;
    // console.log("Password: " + password);
    // console.log("Confirm Password: " + confirmPassword);
    if (confirmPassword == "") {
      setConfirmPasswordStatus(-1);
      confirmPasswordValid = false;
    } else if (!confirmPassword.match(/^[0-9a-zA-Z]{8,}$/)) {
      setConfirmPasswordStatus(0);
      setConfirmPasswordMessage("Use 8 or more characters with a mix of letters, numbers and characters.")
      confirmPasswordValid = false;
    } else {
      if (validatePassword(password) && confirmPassword != password) {
        setConfirmPasswordStatus(0);
        setConfirmPasswordMessage("Passwords do not match.")
        confirmPasswordValid = false;
      } else {
        setConfirmPasswordStatus(-1);
        confirmPasswordValid = true;
      }
    }
    return confirmPasswordValid;
  }

  function savePasswords() {
    if (validatePassword(passwordValue) && validateConfirmPassword(confirmPasswordValue, passwordValue)) {
      localStorage.setItem("password", passwordValue);
      localStorage.setItem("token", token!);
      console.log("Passwords saved!!")
      navigate( `/confirm/${token}/step/2`);
    }
  }

  return (
    <React.Fragment>
      <Navbar/>
      <div className="w-full flex justify-center items-center py-[60px]">
          <Stepper
            totalSteps={4}
            completedSteps={1}
            title="Create password"
            buttonTitle="Next"
            buttonClasses="bg-color-primary color-white h-[45px]"
            buttonClick={()=> {
              savePasswords();
            }}>

            <p className="color-black-dark f-medium">Email</p>
            <p>email@company.com</p>
            <br/>
            <p>Use 8 or more characters with a mix of letters, numbers and characters.</p>
            <br/>

            <Input
              name="password"
              type="password"
              placeholder=""
              label="Password"
              change={(value: string)=> {
                validatePassword(value);
                setPasswordValue(value);
              }}
              success={passwordStatus == 1}
              messageSuccess={passwordMessage}
              error={passwordStatus == 0}
              messageError={passwordMessage} />
            <Input
              name="confirmPassword"
              type="password"
              placeholder=""
              label="Confirm password"
              change={(value: string)=> {
                validateConfirmPassword(value, passwordValue)
                setConfirmPasswordValue(value);
              }}
              success={confirmPasswordStatus == 1}
              messageSuccess={confirmPasswordMessage}
              error={confirmPasswordStatus == 0}
              messageError={confirmPasswordMessage} />

          </Stepper>
      </div>
    </React.Fragment>
  );
}

export default ConfirmPasswordPage;
