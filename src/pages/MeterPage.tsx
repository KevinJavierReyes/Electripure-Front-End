import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";



function MeterPage () {

    const { meterId } = useParams();

    let [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log("Device Id changed to " + meterId);
        setLoading(false);
        setInterval(() => {
            setLoading(true);
        }, 500);
    }, [meterId]);


    return (
        loading ? <Outlet/>: <div></div>
    );
}

export default MeterPage;