
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sendUpdatePassword } from "../actions/electripure";
import Card from "../components/Card";
import ResetPasswordForm from "../components/Form/ResetPasswordForm";
import Navbar from "../components/Navbar";
import Space from "../components/Space";
import { TYPE_SPACE } from "../config/enum";
import { ResetPasswordDataForm } from "../interfaces/form";
import { ElectripureState } from "../interfaces/reducers";


function  ResetPasswordPage() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const toatMessage = useSelector((state: ElectripureState) => state.toastMessage);

    function submitResetPasswordForm(data: ResetPasswordDataForm) {
        dispatch(sendUpdatePassword({
            "password": data.password,
            "token": token!
        }));
    }

    useEffect(()=>{
        if (toatMessage == "Password updated!") {
            navigate("/login");
        }
    }, [toatMessage])

    return (
        <Fragment>
            <Navbar>
                <div className="w-full max-w-[430px]">
                <Space type={TYPE_SPACE.FORM_DISTANCE} />
                <Card>
                    <div className="px-[50px] pt-[20px] pb-[40px]">
                        <ResetPasswordForm onSubmit={submitResetPasswordForm}  />
                    </div>
                </Card>
                </div>
            </Navbar>
        </Fragment>
    );
}

export default ResetPasswordPage;