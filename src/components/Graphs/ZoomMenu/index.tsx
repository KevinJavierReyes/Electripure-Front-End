import { TYPE_EVENTS_ZOOM } from "../../../config/enum";
import InputCheckboxIcon from "../../FormInput/InputCheckboxIcon";


const minRecords = 100;

function ZoomMenu({records, zooms, onChange}: {records: number, zooms: number, onChange: (type: TYPE_EVENTS_ZOOM, checked: boolean) => any}) {
    return (<div className="flex justify-center items-center">
        <InputCheckboxIcon
            disabled={records < minRecords}
            defaultChecked={records < minRecords}
            classes={`f-semibold rounded-l-md`}
            name={"zoomin"}
            onChange={(checked: boolean) => {
                onChange(TYPE_EVENTS_ZOOM.IN, checked);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${records >= minRecords ? "fill-blue-500" : ""}`}>
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5zm8.25-3.75a.75.75 0 01.75.75v2.25h2.25a.75.75 0 010 1.5h-2.25v2.25a.75.75 0 01-1.5 0v-2.25H7.5a.75.75 0 010-1.5h2.25V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
        </InputCheckboxIcon>
        <InputCheckboxIcon
            disabled={zooms == 0}
            defaultChecked={zooms == 0}
            classes={`f-semibold`}
            name={"zoomout"}
            onChange={(checked: boolean) => {
                onChange(TYPE_EVENTS_ZOOM.OUT, checked);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${zooms != 0 ? "fill-blue-500" : ""}`}>
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5zm4.5 0a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
        </InputCheckboxIcon>
        <InputCheckboxIcon
            disabled={zooms == 0}
            defaultChecked={zooms == 0}
            classes={`f-semibold rounded-r-md`}
            name={"normal zoom"}
            onChange={(checked: boolean) => {
                onChange(TYPE_EVENTS_ZOOM.RESET, checked);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${zooms != 0 ? "fill-blue-500" : ""}`}>
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
        </InputCheckboxIcon>
    </div>);
}


export default ZoomMenu;