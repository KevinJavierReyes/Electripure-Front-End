
import loadingUrl from "./../../assets/gif/loading.gif";

function Loading(props: {show: boolean}) {
    return (
        <div className={"fixed h-full w-full justify-center items-center " + (props.show ? "flex" : "hidden")} style={{"backgroundColor": "rgba(0, 0, 0, 0.4)"}}>
          <img src={loadingUrl} className="w-[50px] h-[50px]"/>
        </div>
    );
}
export default Loading;