import { TYPE_EVENTS_EVENT } from "../../../config/enum";
import InputCheckboxIcon from "../../FormInput/InputCheckboxIcon";



function EventMenu({tooltip, legend, onChange}: {tooltip: boolean, legend: boolean, onChange: (type: TYPE_EVENTS_EVENT, checked: boolean) => any})  {
    return (<div className="flex justify-center items-center">
        <InputCheckboxIcon
            disabled={false}
            defaultChecked={tooltip}
            classes={`f-semibold rounded-l-md`}
            name={"tooltip"}
            onChange={(checked: boolean) => {
                onChange(TYPE_EVENTS_EVENT.TOOLTIP, checked);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${tooltip ? "fill-blue-500" : ""}`}>
                <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg> 
        </InputCheckboxIcon>
        <InputCheckboxIcon
            disabled={false}
            defaultChecked={legend}
            classes={`f-semibold rounded-r-md`}
            name={"legends"}
            onChange={(checked: boolean) => {
                onChange(TYPE_EVENTS_EVENT.LEGENDS, checked);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className={`w-8 h-8 ${legend ? "fill-blue-500" : ""}`}>
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
        </InputCheckboxIcon>
    </div>);
}


export default EventMenu;