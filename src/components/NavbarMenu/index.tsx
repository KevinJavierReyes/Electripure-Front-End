import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setJwt, setLoginToken, setTimestampTwoStepVerification } from "../../actions/electripure";
import logoUrl from "./../../assets/svg/Logo.svg";

function NavbarMenu() {

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    function logout() {
        dispatch(setTimestampTwoStepVerification({
            "timestamp": null
        }));
        dispatch(setLoginToken({
            "token": null
        }));
        dispatch(setJwt({
            "token": null
        }));
        localStorage.removeItem("electripureJwt");
        // navigate("/login");
    }

    return (
        <div className="w-[350px] h-screen	flex justify-start items-center flex-col bg-color-white shadow-md">
            <div className="w-full px-[10px] py-[15px]">
                <img src={logoUrl} className="h-[40px]"></img>
            </div>
            <div className="w-full px-[30px]">
                <button onClick={logout}>Log out</button>
            </div>
        </div>
    );
}

export default NavbarMenu;