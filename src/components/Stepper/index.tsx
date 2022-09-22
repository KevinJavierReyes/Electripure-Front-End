import { MouseEventHandler } from "react";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import StepperProgress from "../../components/StepperProgress";

function Stepper(props: {children: any, totalSteps: number, completedSteps: number, title: String, buttonTitle: String, buttonClasses: String, buttonClick: MouseEventHandler }) {
    return (
        <div className="w-full max-w-[500px] bg-color-white px-[60px] pt-[30px] pb-[50px] border-color-secondary rounded-sm">
          <StepperProgress totalSteps={props.totalSteps} completedSteps={props.completedSteps} />
          <h2 className="color-primary-dark f-bold title pt-[20px]">{props.title}</h2>
          <div className="mt-[30px] mb-[50px]">
            {props.children}
          </div>
          <Button title={props.buttonTitle} classes={props.buttonClasses} click={props.buttonClick} />
        </div>
    );
}

export default Stepper;