import { TYPE_SPACE } from "../../config/enum";
import React from "react";


function Space({type, show=true}: { type: TYPE_SPACE, show?: boolean}) {
    if (!show) {
        return (<React.Fragment></React.Fragment>)
    }
    switch (type) {
        case TYPE_SPACE.INPUT_DISTANCE:
            return (<div className="h-[15px]"></div>);
        case TYPE_SPACE.INPUT_DISTANCE_VERTICAL:
            return (<div className="w-[15px]"></div>);
        case TYPE_SPACE.FORM_DISTANCE_VERTICAL:
            return (<div className="w-[30px]"></div>);
        default:
            return (<div></div>);
    }
}

export default Space;