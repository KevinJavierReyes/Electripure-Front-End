import { Fragment, useState } from "react";
import { NAVEGATION_STATE, TYPE_SPACE } from "../../config/enum";
import Space from "../Space";
import NavigationBar from "./NavigationBar";
import NavigationMenu from "./NavigationMenu";
import logoUrl from "./../..//assets/svg/Logo.svg";
import "./style.css";

function Navegation({children}: {children: any}) {

    const [stateNavegation, setStateNavegation] = useState(NAVEGATION_STATE.CLOSE);

    function toggleNavegation() {
        (stateNavegation == NAVEGATION_STATE.OPEN ? setStateNavegation(NAVEGATION_STATE.CLOSE) : setStateNavegation(NAVEGATION_STATE.OPEN));
    }

    return (<Fragment>
        <div className="flex relative">
            <div className={"ease-linear duration-100 z-10 w-[100%] lg:w-[350px] h-full lg:relative fixed top-0 left-0 " + (stateNavegation == NAVEGATION_STATE.OPEN ? "open-navigation-container" : "close-navigation-container")}>
                <div onClick={toggleNavegation} className="absolute w-full h-full top-0 left-0">

                </div>
                <div className={"w-[80%] sm:w-[60%] md:w-[40%] lg:w-[350px] lg:relative absolute top-0 left-0 bg-color-white"}>
                    <NavigationMenu/>
                </div>
            </div>
            <div className="w-full">
                <Space type={TYPE_SPACE.TEXT_DISTANCE} classes="w-full lg:hidden"/>
                <div className="w-full lg:hidden px-[20px] relative">
                    <div className="w-full h-full t-0 l-0 absolute flex justify-center items-center -z-10">
                        <img src={logoUrl} className="h-[30px]"></img>
                    </div>
                    <div onClick={toggleNavegation} className="w-[40px] h-[40px] border rounded border-color-black-light flex justify-center items-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
                <NavigationBar/>
                <div className="w-full">    
                    {children}
                </div>
            </div>
        </div>
    </Fragment>)
}

export default Navegation;