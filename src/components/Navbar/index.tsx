import { Fragment } from "react";
import logoUrl from "./../../assets/svg/Logo.svg";

function Navbar({children}: { children: any }) {
    return (
        <Fragment>
            <div className="w-full h-[60px] flex justify-start items-center px-[10px] bg-color-white">
                <img src={logoUrl} className="h-[40px]"></img>
            </div>
            <div className="w-full p-[10px] flex justify-center items-start">
                {children}
            </div>
        </Fragment>
    );
}

export default Navbar;
