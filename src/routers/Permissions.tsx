import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ElectripureState } from "../interfaces/reducers";
import { sendGetCompaniesTable } from "../actions/electripure"
import { settingPermissions } from "../libs/permissions"
import { useParams } from "react-router";


const enum STATE_PERMISSION {
    NOT_PERMISSION = 0,
    PERMISSION_OK = 1,
    OWN_INFORMATION = 2
}


export function UserPermission(props: {children: any, redirect?: string, role:string}) {

    const {userId} = useParams()
    const [validation, setValidation] = useState(STATE_PERMISSION.NOT_PERMISSION);
    const [hasPermission, Id] = settingPermissions(props.role)

    console.log(hasPermission, Id)
    useEffect(()=>{
        setValidation(hasPermission)
    }, [])

    return (
        <Fragment>
            { validation == STATE_PERMISSION.NOT_PERMISSION ? <div></div>
            : validation == STATE_PERMISSION.PERMISSION_OK ?  props.children
            : validation == STATE_PERMISSION.OWN_INFORMATION ?
            props.redirect ? <div></div>
            : Id === parseInt(userId?? "0") ? props.children : <div></div>
            : <div></div>
            }
        </Fragment>);
}

export function CiaPermission(props: {children: any, redirect?: string, role:string, id?:string}) {

    const [validation, setValidation] = useState(STATE_PERMISSION.NOT_PERMISSION);
    const cias = JSON.parse(useSelector((state: ElectripureState) => state.companiesTable));

    const [hasPermission, Id] = settingPermissions(props.role)

    useEffect(()=>{
        setValidation(hasPermission)
    }, [])

    return (
        <Fragment>
            { validation == STATE_PERMISSION.NOT_PERMISSION ? <div></div>
            : validation == STATE_PERMISSION.PERMISSION_OK ?  props.children
            : validation == STATE_PERMISSION.OWN_INFORMATION ?
            props.redirect ? <Navigate to={props.redirect} /> 
            : cias?.length >= 0 ? props.children : <div></div>
            : <div></div>
            }
        </Fragment>);
}


export function ChartPermission(props: {children: any, redirect?: string, role:string, id?:string}) {

    const [validation, setValidation] = useState(STATE_PERMISSION.NOT_PERMISSION);
    const isSameUser = (currentId:number, id:string) => currentId === parseInt(id) ? true: false
    const [hasPermission, userId] = settingPermissions(props.role)

    useEffect(()=>{
        setValidation(hasPermission)
    }, [])

    return (
        <Fragment>
            { validation == STATE_PERMISSION.NOT_PERMISSION ? <div></div>
            : validation == STATE_PERMISSION.PERMISSION_OK ?  props.children
            : validation == STATE_PERMISSION.OWN_INFORMATION ?
            props.redirect ? "" 
            : isSameUser(10, props.id?? "0") ? props.children : <div></div>
            : <div></div>
            }
        </Fragment>);
}
