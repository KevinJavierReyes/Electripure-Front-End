import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer, TypeOptions } from "react-toastify";
import { ElectripureState } from "../../interfaces/reducers";
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from "../../actions/electripure";


function Toast () {

    const dispatch = useDispatch();

    const toastMessage: string = useSelector((state: ElectripureState) => state.toastMessage);
    const toastTitle: string = useSelector((state: ElectripureState) => state.toastTitle);
    const toastType: string = useSelector((state: ElectripureState) => state.toastType);

    useEffect(() => {
        if (toastMessage != "" || toastTitle != "") {
            toast(<div>
                <strong>
                    {toastTitle}
                </strong>
                <p>
                    {toastMessage}
                </p>
            </div>, {
                "type": (toastType as TypeOptions),
                "position": "bottom-right"
            });
            dispatch(showToast({
                "title": "",
                "message": "",
                "status": ""
            }))
        }
    }, [toastMessage])

    // Forcar dispatch a Toast
    // useEffect(() => {
    //     dispatch(showToast({
    //         "title": "Title",
    //         "message": "Message",
    //         "status": "warning"
    //     }))
    // }, []);

    return (<ToastContainer/>);

}

export default Toast;