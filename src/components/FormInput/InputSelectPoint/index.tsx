import { useEffect, useRef, useState } from 'react';
import { TYPE_SPACE } from "../../../config/enum";
import { ButtonSecondary } from '../../FormInput/Button';
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";

interface IPointSelected {
    x: number;
    y: number;
    width: number;
    height: number;
}

function InputSelectPoint({image, pointImage, point, onSave}: { image: any, pointImage: any, point: IPointSelected, onSave: (point: IPointSelected) => void }) {

    // SECTION Create states
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [top, setTop] = useState(-1);
    const [left, setLeft] = useState(-1);
    // !SECTION
    // SECTION Create refs
    const ref = useRef(null);
    // !SECTION 
    // SECTION Get height and width relative of the image and calculate initial position
    useEffect(() => {
        const elem: any = ref!.current;
        setHeight(elem.clientHeight);
        setWidth(elem.clientWidth);
        if (point.x > -1 && point.y > -1) {
            // Generate porcent to pixel
            setTop((elem.clientHeight / 100) * point.y);
            setLeft((elem.clientWidth / 100) * point.x);
        }
    });
    // !SECTION
    // SECTION Handle mouse down
    function onMouseDown(e: any) {
        let top = e.clientY - (e.target.getBoundingClientRect().top + window.scrollY);
        let left = e.clientX - (e.target.getBoundingClientRect().left + window.scrollX);
        setTop(top);
        setLeft(left);
    }
    // !SECTION
    return (<div className="w-full bg-color-white p-[10px]">
        <div className="mx-auto w-full max-w-[400px]">
            <StepperProgress completedSteps={5} totalSteps={5}/>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Lastly the MDP(s) details"/>
        </div>
        <div className="w-full relative">
            <img src={image} className='w-full' />
            <div ref={ref} onMouseDown={onMouseDown} className="w-full h-full absolute top-0 left-0">
                { top == -1 || left == -1 ? "" : 
                    <img src={pointImage} className="absolute" style={{"top": `${top - (point.height/2)}px`, "left": `${left - (point.width/2)}px`, "width": `${point.width}px`, "height": `${point.height}px`}}/>
                }
            </div>
        </div>
        <Space classes="w-full h-[50px]" />                
        <div className="w-full max-w-[160px] mx-auto flex">
            <ButtonSecondary onClick={()=> {
                onSave({
                    ...point,
                    "y": height/top,
                    "x": width/left
                })
            }}>
                Save
            </ButtonSecondary>
        </div>

    </div>);
}


export default InputSelectPoint;