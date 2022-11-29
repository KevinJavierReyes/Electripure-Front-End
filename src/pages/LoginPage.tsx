import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setJwt } from "../actions/electripure";
import Navbar from "../components/Navbar";
import { TYPE_SPACE } from "../config/enum";
import { ElectripureState } from "../interfaces/reducers";
import { LoginDataForm } from "../interfaces/form";
import Space from "../components/Space";
import Card from "../components/Card";
import LoginForm from "../components/Form/LoginForm";
import { ButtonSecondary } from "../components/FormInput/Button";


function LoginPage() {

    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt) || localStorage.getItem("electripureJwt");
  
    useEffect(()=> {
        if (electripureJwt) {
            dispatch(setJwt({
                "token": electripureJwt
            }))
        };
    }, []);
   

    const loginToken = useSelector((state: ElectripureState) => state.loginToken);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function submitLoginForm(data: LoginDataForm) {
        localStorage.setItem("rememberPassword", `${data.remember}`);
        dispatch(login({
            "email": data.email,
            "password": data.password,
        }));
    }
    
    function forgotPassword() {
        navigate( `/reset`);
    }

    useEffect(()=> {
        if (loginToken) {
            navigate(`/login/verify/select`);
        }
    }, [loginToken])

    useEffect(()=> {
        if (electripureJwt) {
            navigate(`/dashboard`);
        }
    }, [electripureJwt])
  
    return (
        <React.Fragment>
            <Navbar>
                <div className="w-full max-w-[430px]">
                <Space type={TYPE_SPACE.FORM_DISTANCE} />
                <Card>
                    <div className="px-[50px] pt-[20px] pb-[40px]">
                        <LoginForm onSubmit={submitLoginForm} forgotPassword={forgotPassword} />
                        <Space type={TYPE_SPACE.FORM_DISTANCE} />
                        <div className={"justify-center items-center flex"}>
                            <span className="color-black-dark text-sm">Don’t have an account?</span>
                        </div>
                        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                        <div className={"justify-center items-center flex w-[130px] mx-auto"}>
                            <ButtonSecondary onClick={()=> {}}>
                                Contact us
                            </ButtonSecondary>
                        </div>
                    </div>
                </Card>
                </div>
            </Navbar>
        </React.Fragment>
    );
}

export default LoginPage;
