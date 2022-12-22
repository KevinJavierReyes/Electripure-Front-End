import { Fragment, useState } from "react";
import { ButtonNotification } from "../../../FormInput/Button";
import useOnclickOutside from "react-cool-onclickoutside";
import UserSettings from "./UserSettings";

function FloatUserSetting({children}: {children:any}) {
    const [ toggleSettings, setToggleSettings ] = useState(false);
    const handleBtnClick = (): void => setToggleSettings(!toggleSettings);
    const closeMenu = (): void => setToggleSettings(false);
    const ref = useOnclickOutside(() => closeMenu());

    return (<Fragment>
        <div ref={ref}>
            <ButtonNotification onClick={handleBtnClick}>
                {children}
            </ButtonNotification>
            {toggleSettings ?  <div className="absolute shadow-md md:top-[110px] lg:top-[70px] bg-white w-[300px] py-[20px] px-[10px] right-[30px] rounded-lg">
                <UserSettings/>
            </div> : ""}
        </div>
    </Fragment>);
}

export default FloatUserSetting;
