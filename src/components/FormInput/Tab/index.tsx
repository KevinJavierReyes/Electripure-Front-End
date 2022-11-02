import "./style.css"


function Tab({ children, active, onClick }: { children: any, active: boolean, onClick: () => void }) {
    return (<div onClick={onClick} className={"border-color-secondary border-b w-full h-[60px] flex justify-start items-center px-[30px] f-medium relative " + (active ? "bg-color-primary color-white" : "cursor-pointer")}>
        {children}
        { active  ? <span className="triangle-primary-left absolute right-[0px] translate-x-[100%]"></span> : "" }
    </div>);
}


export default Tab;