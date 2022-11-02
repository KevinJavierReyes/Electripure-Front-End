import { ButtonLink } from "../Button";

function TabLink({ children, active, onClick }: { children: any, active: boolean, onClick: () => void }) {
    return (<ButtonLink onClick={onClick} classes="no-underline">
        <span className={"f-semibold " + (active ? "color-primary border-color-primary border-b-[2px]" : "cursor-pointer")}>
            {children}
        </span>
    </ButtonLink>);
}


export default TabLink;