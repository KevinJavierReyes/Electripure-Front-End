import { useEffect, useRef, useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { SiteManagerDataForm } from '../../../interfaces/form';
import { InputControl } from '../../../interfaces/form-control';
import { validateCellphone, validateCellphoneControl, validateEmailControl, validateNameControl } from '../../../libs/form-validation';
import { ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";
import mdpImg from "./../../../assets/img/mdp.png";


function FinishCreateMDPForm({schematicImg, point, onClose}: { point: {src:any, x: number, y: number, width: number, height: number}, schematicImg: string, onClose: (point: {src:any, x: number, y: number, width: number, height: number}) => void }) {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [top, setTop] = useState(point.y);
    const [left, setLeft] = useState(point.x);

    const ref = useRef(null);

    useEffect(() => {
        const elem: any = ref!.current;
        setHeight(elem.clientHeight);
        setWidth(elem.clientWidth);
    });

    useEffect(() => {
        console.log("height", height);
        console.log("width", width);
    }, [height, width]);

    function onMouseDown(e: any) {
        setTop(e.clientY - (e.target.getBoundingClientRect().top + window.scrollY));
        setLeft(e.clientX - (e.target.getBoundingClientRect().left + window.scrollX));
    }

    useEffect(() => {
        console.log("top", top);
        console.log("left", left);
    }, [top, left]);
    
    

    return (<div className="w-full bg-color-white p-[10px]">
        <div className="mx-auto w-full max-w-[400px]">
            <StepperProgress completedSteps={5} totalSteps={5}/>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Lastly the MDP(s) details"/>
        </div>
        <div className="w-full relative">
            <img src={schematicImg} className='w-full' />
            <div ref={ref} onMouseDown={onMouseDown} className="w-full h-full absolute top-0 left-0">
                { top > -1 && left > -1 ?
                    <img src={point.src} className="absolute" style={{"top": `${top - (point.height/2)}px`, "left": `${left - (point.width / 2)}px`, "width": `${point.width}px`, "height": `${point.height}px`}}/>
                    : "" 
                }
            </div>
        </div>
        <Space classes="w-full h-[50px]" />                
        <div className="w-full max-w-[160px] mx-auto flex">
            <ButtonSecondary onClick={()=> {
                onClose({
                    ...point,
                    "y": top,
                    "x": left
                })
            }}>
                Cancel
            </ButtonSecondary>
        </div>

    </div>);
}


export default FinishCreateMDPForm;