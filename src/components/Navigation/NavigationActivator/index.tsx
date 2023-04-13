import { Fragment, useState } from "react";

import logoUrl from "./../../../assets/svg/Logo.svg";


function NavigationActivator({ onActive }: { onActive: () => void}) {

    function toggleNavegation() {
        onActive();
    }

    return (<Fragment>
        <div className="w-full px-[20px] relative">
            <div className="w-full h-full t-0 l-0 absolute flex justify-center items-center -z-10">
                <img src={logoUrl} className="h-[30px]"></img>
            </div>
            <div onClick={toggleNavegation} className="w-[40px] h-[40px] border rounded border-color-black-light flex justify-center items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    </Fragment>);
}


export default NavigationActivator;