import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ElectripureState } from "../interfaces/reducers";


export function IsAuthenticated(props: {children: any, redirect?: string}) {
    const electripureJwt = useSelector((state: ElectripureState) => state.electripureJwt);
    console.log("electripureJwt");
    console.log(electripureJwt);
    if (electripureJwt == null || electripureJwt == "" || electripureJwt == undefined) {
        return <Navigate to={props.redirect ?? "/login"} replace/>
    } else {
        return props.children;
    }
}

export function IsAuthenticatedLoginToken(props: {children: any, redirect?: string}) {
    const loginToken = useSelector((state: ElectripureState) => state.loginToken);
    console.log("loginToken");
    console.log(loginToken);
    if (loginToken == null || loginToken == "" || loginToken == undefined) {
        return <Navigate to={props.redirect ?? "/login"} replace/>
    } else {
        return props.children;
    }
}