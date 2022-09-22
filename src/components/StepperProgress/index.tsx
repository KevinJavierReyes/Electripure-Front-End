
function Step(props: {completed: boolean}) {
    return (
        <div className={ "flex-auto h-[4px] " + (props.completed ? "bg-color-primary" : "bg-color-secondary")}></div>
    );
}


function StepperProgress(props: {totalSteps: number, completedSteps: number}) {
    var steps: boolean[] = [];
    for (var i = 1; i <= props.totalSteps; i++) {
        steps.push(props.completedSteps >= i);
    }
    return (
        <div className="flex space-x-1">
            {steps.map((completed: boolean, index: number) => {
                return <Step key={index} completed={completed}></Step>;
            })}
        </div>
    );
}

export default StepperProgress;