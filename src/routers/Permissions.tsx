import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ElectripureState } from "../interfaces/reducers";
import { sendGetPermissions, sendGetCompaniesTable } from "../actions/electripure"
import jwt_decode from "jwt-decode";
import { useParams } from "react-router";

const enum STATE_PERMISSION {
    NOT_PERMISSION = 0,
    PERMISSION_OK = 1,
    OWN_INFORMATION = 2
}

type jwtDecoded = {
    data: string;
    fullname: string;
    role: string;
    exp: number;
}

function settingPermissions(roles:any[], jwt:string | null, role:string){
    const decoded:jwtDecoded = jwt_decode(jwt?? "")
    const userId = decoded?.data
    const roleUser = parseInt(decoded.role);
    const userPermissions = roles[roleUser]?? {};
    return [ userPermissions[role], userId ]
}

export function UserPermission(props: {children: any, redirect?: string, role:string}) {

    const dispatch = useDispatch();
    const {userId} = useParams()
    const [validation, setValidation] = useState(STATE_PERMISSION.NOT_PERMISSION);
    const rolesPermissions:any[] = JSON.parse(useSelector((state: ElectripureState) => state.permissions));
    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);
    const [hasPermission, Id] = settingPermissions(rolesPermissions, electripureJwt, props.role)

    useEffect(()=>{
        dispatch(sendGetPermissions({}))
        setValidation(hasPermission)
    }, [rolesPermissions])

    return (
        <Fragment>
            { validation == STATE_PERMISSION.NOT_PERMISSION ? <div></div>
            : validation == STATE_PERMISSION.PERMISSION_OK ?  props.children
            : validation == STATE_PERMISSION.OWN_INFORMATION ?
            props.redirect ? "" 
            : Id === parseInt(userId?? "0") ? props.children : <div></div>
            : <div></div>
            }
        </Fragment>);
}

export function CiaPermission(props: {children: any, redirect?: string, role:string, id?:string}) {

    const [validation, setValidation] = useState(STATE_PERMISSION.NOT_PERMISSION);
    const dispatch = useDispatch();
    const rolesPermissions:any[] = JSON.parse(useSelector((state: ElectripureState) => state.permissions));
    const cias = JSON.parse(useSelector((state: ElectripureState) => state.companiesTable));
    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);

    const [hasPermission, Id] = settingPermissions(rolesPermissions, electripureJwt, props.role)

    useEffect(()=>{
        setValidation(hasPermission)
        dispatch(sendGetPermissions({}))
        dispatch(sendGetCompaniesTable({}))
    }, [rolesPermissions])

    return (
        <Fragment>
            { validation == STATE_PERMISSION.NOT_PERMISSION ? <div></div>
            : validation == STATE_PERMISSION.PERMISSION_OK ?  props.children
            : validation == STATE_PERMISSION.OWN_INFORMATION ?
            props.redirect ? "" 
            : cias?.length >= 0 ? props.children : <div></div>
            : <div></div>
            }
        </Fragment>);
}


export function ChartPermission(props: {children: any, redirect?: string, role:string, id?:string}) {

    const [validation, setValidation] = useState(STATE_PERMISSION.NOT_PERMISSION);

    const dispatch = useDispatch();
    const rolesPermissions:any[] = JSON.parse(useSelector((state: ElectripureState) => state.permissions));
    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);
    const isSameUser = (currentId:number, id:string) => currentId === parseInt(id) ? true: false

    useEffect(()=>{

        const [hasPermission, userId] = settingPermissions(rolesPermissions, electripureJwt, props.role)
        setValidation(hasPermission)
        dispatch(sendGetPermissions({}))
    }, [rolesPermissions])

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
