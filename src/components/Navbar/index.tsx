import logoUrl from "./../../assets/svg/Logo.svg";

function Navbar() {
    return (
        <div className="w-full h-[60px] flex justify-start items-center px-[10px] bg-color-white">
            <img src={logoUrl} className="h-[40px]"></img>
        </div>
    );
}

export default Navbar;