import { Fragment, useState } from "react";
import { NAVEGATION_STATE, TYPE_SPACE, USER_SETTINGS } from "../../config/enum";
import Space from "../Space";
import NavigationTop from "./NavigationTop";
import NavigationSide from "./NavigationSide";
import "./style.css";
import NavigationActivator from "./NavigationActivator";

function Navegation({children}: {children: any}) {

    const [stateNavegation, setStateNavegation] = useState(NAVEGATION_STATE.CLOSE);
    const [ isOpen, setIsOpen ] = useState(USER_SETTINGS.CLOSE)

    function showNavegationSide(activate: boolean) {
        activate ? setStateNavegation(NAVEGATION_STATE.OPEN) : setStateNavegation(NAVEGATION_STATE.CLOSE);
    }
    
    function handleOpen(){
        (isOpen == USER_SETTINGS.OPEN ? setIsOpen(USER_SETTINGS.CLOSE) : setIsOpen(USER_SETTINGS.OPEN))
    }

    return (<Fragment>
        <div className="flex relative w-full h-full">
            {/* SECTION Navigation Side  */}
                <div className={"w-[100%] lg:w-[350px] h-full lg:relative fixed ease-linear duration-100 z-10 top-0 left-0 " + (stateNavegation == NAVEGATION_STATE.OPEN ? "open-navigation-container" : "close-navigation-container")}>
                    <div onClick={()=> showNavegationSide(false)} className="absolute w-full h-full top-0 left-0">
                    </div>
                    <div className={"h-full w-[80%] sm:w-[60%] md:w-[40%] lg:w-[100%] lg:relative absolute top-0 left-0 bg-color-white"}>
                        <NavigationSide/>
                    </div>
                </div>
            {/* !SECTION */}
            {/* SECTION Content Page */}
                <div onClick={handleOpen} className="w-full h-full flex flex-col content-page">
                    {/* SECTION Navigation */}
                       <div className="w-full">
                            {/* SECTION Side Navigation Activator */}
                                <div className="w-full lg:hidden">
                                    <Space type={TYPE_SPACE.TEXT_DISTANCE} classes="w-full"/>
                                    <NavigationActivator onActive={() => showNavegationSide(true)}/>
                                    <Space type={TYPE_SPACE.TEXT_DISTANCE} classes="w-full"/>
                                </div>
                            {/* !SECTION */}
                            {/* SECTION Navigation Top */}
                                <div className="w-full">
                                    <NavigationTop/>
                                </div>
                            {/* !SECTION */}
                       </div>
                    {/* !SECTION */}
                    {/* SECTION Content Page */}
                        <div className="w-full h-full">    
                            {children}
                        </div>
                    {/* !SECTION */}
                </div>
            {/* !SECTION */}
        </div>
    </Fragment>)
}

export default Navegation;
