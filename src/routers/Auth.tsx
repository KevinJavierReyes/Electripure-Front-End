import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setJwt } from "../actions/electripure";
import { ElectripureState } from "../interfaces/reducers";

const enum STATE_VALIDATION {
    NOT_VALIDATED = 0,
    VALIDATED_OK = 1,
    VALIDATED_BAD = 2
}

export function IsAuthenticated(props: {children: any, redirect?: string}) {
    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);
    const dispatch = useDispatch();
    const [validation, setValidation] = useState(STATE_VALIDATION.NOT_VALIDATED);
    
    useEffect(()=> {
        if (electripureJwt) {
            setValidation(STATE_VALIDATION.VALIDATED_OK);
        } else {
            if (localStorage.getItem("electripureJwt")) {
                dispatch(setJwt({
                    "token": localStorage.getItem("electripureJwt")
                }));
            } else {
                setValidation(STATE_VALIDATION.VALIDATED_BAD);
            }
        }
    }, [electripureJwt]); 

    return (<Fragment>
        { validation == STATE_VALIDATION.NOT_VALIDATED ? <div></div> 
        :  validation == STATE_VALIDATION.VALIDATED_OK ?  props.children 
        : <Navigate to={props.redirect ?? "/login"} replace/>}
    </Fragment>);
}

export function IsAuthenticatedLoginToken(props: {children: any, redirect?: string}) {
    const loginToken = useSelector((state: ElectripureState) => state.loginToken);
    if (loginToken == null || loginToken == "" || loginToken == undefined) {
        return <Navigate to={props.redirect ?? "/login"} replace/>
    } else {
        return props.children;
    }
}