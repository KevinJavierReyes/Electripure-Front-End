import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setJwt, setLoginToken, setTimestampTwoStepVerification } from "./../../../../actions/electripure";

// images
import companyImg from "./../assets/company_management.svg"
import userImg from "./../assets/users_management.svg"
import deviceImg from "./../assets/device_management.svg"
import chageLogImg from "./../assets/change_log.svg"
import settingsImg from "./../assets/settings.svg"
import logoutImg from "./../assets/logout.svg"
import { useNavigate } from "react-router-dom";
import { ElectripureState } from "../../../../interfaces/reducers"

const UserSettings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user_id");
    const users = JSON.parse(useSelector((state: ElectripureState) => state.users));
    const allowed = users?.filter((user:any) => user.id == currentUser)[0];

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
        localStorage.removeItem("user_id");
        localStorage.removeItem("current_user");
        // navigate("/login");
    }
    useEffect(() =>{
        
    }, [])
    return (
        <Fragment>
            { allowed.Role === "Admin"? 
            <div>
                <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer" >
                    <img src={companyImg} alt="" />
                    <p className="m-[15px]" onClick={()=>{ navigate("/dashboard/company/list") }}>Company management</p>
                </div>
                <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                    <img src={userImg} alt="" />
                    <p className="m-[15px]" onClick={()=>{navigate("/dashboard/user/list")}}>Users management</p>
                </div>
                <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                    <img src={deviceImg} alt="" />
                    <p className="m-[15px]" onClick={()=>{navigate("/dashboard/device/list")}}>Device management</p>
                </div>
                <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                    <img src={chageLogImg} alt="" />
                    <p className="m-[15px]" onClick={()=>{}}>Change log</p>
                </div>
                <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                    <img src={settingsImg} alt="" />
                    <p className="m-[15px]" onClick={()=>{}}>Settings</p>
                </div>
                <hr />
            </div>
            :""}
            <div onClick={logout} className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                <img src={logoutImg} alt="" />
                <p className="m-[15px]">Logout</p>
            </div>
        </Fragment>
    )
}

export default UserSettings;
