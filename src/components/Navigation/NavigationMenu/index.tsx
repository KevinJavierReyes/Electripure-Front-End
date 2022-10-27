import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoUrl from "./../../../assets/svg/Logo.svg";
import DropdownSelector from "./DropdownSelector"


function NavbarMenu() {
    return (
        <div className="w-full h-screen	flex justify-start items-center flex-col shadow-md border-r border-color-black-light">
            <div className="w-full px-[10px] py-[15px]">
                <img src={logoUrl} className="h-[40px]"></img>
            </div>
            <DropdownSelector />
        </div>
    );
}

export default NavbarMenu;
