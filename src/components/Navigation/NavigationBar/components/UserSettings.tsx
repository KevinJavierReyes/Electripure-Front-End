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
import { sendGetUsers } from "../../../../actions/electripure"
import { UserPermission, CiaPermission } from "../../../../routers/Permissions"
import { settingPermissions } from "../../../../libs/permissions"

const UserSettings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user_id");

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
        navigate("/login");
    }

    return (
        <Fragment>
            <div>
                <CiaPermission role="list_companies">
                    <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer" >
                        <img src={companyImg} alt="" />
                        <p className="m-[15px]" onClick={()=>{ navigate("/dashboard/company/list") }}>Company management</p>
                    </div>
                </CiaPermission>
                { settingPermissions("list_user")[0] === 2?
                    <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                        <img src={userImg} alt="" />
                        <p className="m-[15px]" onClick={()=>{navigate("/dashboard/user/list")}}>Users management</p>
                    </div>
                    :settingPermissions("list_user")[0] === 1?
                    <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                        <img src={userImg} alt="" />
                        <p className="m-[15px]" onClick={()=>{navigate("/dashboard/user/list")}}>Users management</p>
                    </div>
                    : <div></div>
                }
                <CiaPermission role="list_companies">
                <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                    <img src={deviceImg} alt="" />
                    <p className="m-[15px]" onClick={()=>{navigate("/dashboard/device/list")}}>Device management</p>
                </div>
                </CiaPermission>
                <CiaPermission role="list_companies">
                <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                    <img src={chageLogImg} alt="" />
                    <p className="m-[15px]" onClick={()=>{}}>Change log</p>
                </div>
                </CiaPermission>
                <UserPermission role="list_user">
                    <div className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                        <img src={settingsImg} alt="" />
                        <p className="m-[15px]" onClick={()=>{}}>Settings</p>
                    </div>
                </UserPermission>
            </div>
            <div onClick={logout} className="flex hover:bg-slate-100 rounded-lg cursor-pointer">
                <img src={logoutImg} alt="" />
                <p className="m-[15px]">Logout</p>
            </div>
        </Fragment>
    )
}

export default UserSettings;
