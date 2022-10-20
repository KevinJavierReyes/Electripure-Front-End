
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendVerificationEmail, setLoading, showToast } from "../actions/electripure";
import Card from "../components/Card";
import ResetPasswordForm from "../components/Form/ResetPasswordForm";
import SelectVerifyMethodForm from "../components/Form/SelectVerifyMethodForm";
import Navbar from "../components/Navbar";
import Space from "../components/Space";
import { TYPE_SPACE, VERIFICATION_CHANNEL } from "../config/enum";
import { SelectVerifyMethodDataForm } from "../interfaces/form";
import { ElectripureState } from "../interfaces/reducers";


function SelectVerifyMethodPage() {
    
    const timestampTwoStepVerification = useSelector((state: ElectripureState) => state.timestampTwoStepVerification);
    const loginToken: string = useSelector((state: ElectripureState) => state.loginToken)!;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function submitSelectVerifyMethodEmailForm(data: SelectVerifyMethodDataForm) {
        if (data.channel == VERIFICATION_CHANNEL.EMAIL) {
            dispatch(sendVerificationEmail({
                "token": loginToken
            }));
        } else {
            dispatch( showToast({
                "message": "Method not implemented.",
                "status": "error"
            }));
        }
    }

    useEffect(() => {
        if (timestampTwoStepVerification != null) {
            navigate( `/login/verify/confirm`);
        }
    }, [timestampTwoStepVerification]);


    return (
        <Fragment>
            <Navbar>
                <div className="w-full max-w-[430px]">
                <Space type={TYPE_SPACE.FORM_DISTANCE} />
                <Card>
                    <div className="px-[50px] pt-[20px] pb-[40px]">
                        <SelectVerifyMethodForm onSubmit={submitSelectVerifyMethodEmailForm}  />
                    </div>
                </Card>
                </div>
            </Navbar>
        </Fragment>
    );
}

export default SelectVerifyMethodPage;