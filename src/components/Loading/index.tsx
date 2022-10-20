import { useSelector } from "react-redux";
import { ElectripureState } from "../../interfaces/reducers";
import loadingUrl from "./../../assets/gif/loading.gif";

function Loading() {

  const loading = useSelector((state: ElectripureState) => state.loading);
  return (
    <div className={"z-50 fixed h-full w-full justify-center items-center top-0 left-0 " + (loading ? "flex" : "hidden")} style={{"backgroundColor": "rgba(0, 0, 0, 0.4)"}}>
      <img src={loadingUrl} className="w-[50px] h-[50px]"/>
    </div>
  );
}
export default Loading;