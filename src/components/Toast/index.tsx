import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer, TypeOptions } from "react-toastify";
import { ElectripureState } from "../../interfaces/reducers";
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from "../../actions/electripure";


function Toast () {

    const dispatch = useDispatch();

    const toastMessage: string = useSelector((state: ElectripureState) => state.toastMessage);
    const toastType: string = useSelector((state: ElectripureState) => state.toastType);

    useEffect(() => {
        if (toastMessage != "") {
            toast(toastMessage, {
                "type": (toastType as TypeOptions),
                "position": "bottom-right"
            });
            dispatch(showToast({
                "message": "",
                "status": ""
            }))
        }
    }, [toastMessage])

    return (<ToastContainer/>);

}

export default Toast;