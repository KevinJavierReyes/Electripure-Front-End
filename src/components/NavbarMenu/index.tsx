import logoUrl from "./../../assets/svg/Logo.svg";

function NavbarMenu() {
    return (
        <div className="w-[350px] h-screen	flex justify-start items-center flex-col bg-color-white shadow-md">
            <div className="w-full px-[10px] py-[15px]">
                <img src={logoUrl} className="h-[40px]"></img>
            </div>
            <div className="w-full px-[30px]">
                
            </div>
        </div>
    );
}

export default NavbarMenu;