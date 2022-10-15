import { MouseEventHandler } from "react";
import {Button} from "../../FormInput/Button";
import Navbar from "../../Navbar";
import StepperProgress from "..";

function Stepper(props: {children: any, totalSteps: number, completedSteps: number, title: String, buttonTitle: String, buttonClasses: String, buttonClick: MouseEventHandler, skipClick?: MouseEventHandler }) {
    return (
        <div className="w-full max-w-[500px] bg-color-white px-[60px] pt-[30px] pb-[50px] border-color-secondary rounded-sm">
          <StepperProgress totalSteps={props.totalSteps} completedSteps={props.completedSteps} />
          <h2 className="color-primary-dark f-bold title pt-[20px]">{props.title}</h2>
          <div className="mt-[30px] mb-[50px]">
            {props.children}
          </div>
          <Button title={props.buttonTitle} classes={props.buttonClasses} click={props.buttonClick} />
          <div className={"justify-center items-center mt-[14px] " + (props.skipClick == null || props.skipClick == undefined  ? "hidden" : "flex")}>
            <button className="color-black-dark text-sm underline" onClick={props.skipClick}>Skip for now</button>
          </div>
        </div>
    );
}

export default Stepper;