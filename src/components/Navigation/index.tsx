import { Fragment } from "react";
import NavbarMenu from "./NavbarMenu";



function Navegation({children}: {children: any}) {
    return (<Fragment>
        <div className="flex relative">
            <div className="w-[80%] md:w-[350px] translate-x-[-101%] md:translate-x-[0%] md:relative fixed top-0 left-0">
                <NavbarMenu/>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    </Fragment>)
}

export default Navegation;