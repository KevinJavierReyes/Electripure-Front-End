import { TYPE_SPACE } from "../../config/enum";
import React from "react";


function Space({type, show=true, classes=""}: { type?: TYPE_SPACE, show?: boolean, classes?: string}) {
    if (!show) {
        return (<React.Fragment></React.Fragment>)
    }
    switch (type) {
        case TYPE_SPACE.INPUT_DISTANCE:
            return (<div className={"h-[15px] " + classes}></div>);
        case TYPE_SPACE.INPUT_DISTANCE_VERTICAL:
            return (<div className={"w-[15px] " + classes}></div>);
        case TYPE_SPACE.FORM_DISTANCE_VERTICAL:
            return (<div className={"w-[30px] " + classes}></div>);
        case TYPE_SPACE.FORM_DISTANCE:
            return (<div className={"h-[30px] " + classes}></div>);
        case TYPE_SPACE.TEXT_DISTANCE_VERTICAL:
            return (<div className={"w-[5px] " + classes}></div>);
        case TYPE_SPACE.TEXT_DISTANCE:
            return (<div className={"h-[5px] " + classes}></div>);
        default:
            return (<div className={classes}></div>);
    }
}

export default Space;