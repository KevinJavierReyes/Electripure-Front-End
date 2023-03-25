import React from "react";
import { Outlet } from "react-router";

function PowerPage () {

    return (
        <React.Fragment>
            <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                <span className="ml-[20px]"><h3 className="f-bold text-lg">Power</h3></span>
            </div>
            <div id="container-graph" className="w-full rounded border-color-secondary border bg-white p-[30px]">
                <Outlet/>
            </div>
        </React.Fragment>
    );
    
    // const navigate = useNavigate();
    // const [tapIndex, setTapIndex] = useState(1);

    // return (
    //     <React.Fragment>
    //         <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
    //             <span className="ml-[20px]"><h3 className="f-bold text-lg">Power</h3></span>
    //         </div>
    //         <div className="w-full rounded border-color-secondary border bg-white p-[30px]">
    //             <div className="flex">
    //                 <div className="flex flex-col items-start justify-start w-[170px] border-color-secondary border-r border-t">
    //                     <Tab active={tapIndex == 1} onClick={()=> { if (tapIndex != 1) { setTapIndex(1); navigate("active") } }}>
    //                         Active
    //                     </Tab>
    //                     {/* <Tab active={tapIndex == 2} onClick={()=> { if (tapIndex != 2) { setTapIndex(2); navigate("factor") } }}>
    //                         factor
    //                     </Tab> */}
    //                     <Tab active={tapIndex == 3} onClick={()=> { if (tapIndex != 3) { setTapIndex(3); navigate("apparent") } }}>
    //                         Apparent
    //                     </Tab>
    //                     <Tab active={tapIndex == 4} onClick={()=> { if (tapIndex != 4) { setTapIndex(4); navigate("reactive") } }}>
    //                         Reactive
    //                     </Tab>
    //                     <Tab active={tapIndex == 5} onClick={()=> { if (tapIndex != 5) { setTapIndex(5); navigate("linea") } }}>
    //                         Line A
    //                     </Tab>
    //                     <Tab active={tapIndex == 6} onClick={()=> { if (tapIndex != 6) { setTapIndex(6); navigate("lineb") } }}>
    //                         Line B
    //                     </Tab>
    //                     <Tab active={tapIndex == 7} onClick={()=> { if (tapIndex != 7) { setTapIndex(7); navigate("linec") } }}>
    //                         Line C
    //                     </Tab>
    //                 </div>
    //                 <div className="w-full">
    //                    <Outlet/>
    //                 </div>
    //             </div>
    //         </div>
    //     </React.Fragment>
    // );
}

export default PowerPage;
