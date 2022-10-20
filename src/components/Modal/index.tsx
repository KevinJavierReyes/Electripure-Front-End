import React from "react";
import { MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import { modalContainerStyle } from "../../utils/styles";

export function ModalMiddle({show, children, onClose}: {show: boolean, children: any, onClose: MouseEventHandler}) {
    return createPortal((<React.Fragment>

        {show ? <div className={`w-full h-full absolute top-0 left-0 flex justify-center items-center bg-color-black-opacity z-50`}>
            <div className="max-w-[800px] w-[99%] sm:w-[90%] md:w-[70%] lg:w-[50%] p-[30px] bg-color-white rounded relative">
                {children}
                <span className="absolute top-[10px] right-[10px] cursor-pointer" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </div>
        </div> : ""}

    </React.Fragment>), document.getElementById("modal")!);
}