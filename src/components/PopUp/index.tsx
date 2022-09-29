import FormCard from "../FormCard";

function PopUp(props: {show: boolean, children: any, title: string}) {
    return (
        <div className={"fixed h-full w-full justify-center items-center top-0 left-0 " + (props.show ? "flex" : "hidden")} style={{"backgroundColor": "rgba(0, 0, 0, 0.4)"}}>
          <FormCard title={props.title} classes="max-w-[1000px]">
            {props.children}
          </FormCard>
        </div>
    );
}
export default PopUp;