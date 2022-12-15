import { jwtDecoded } from "../interfaces/actions"
import jwt_decode from "jwt-decode";

export function settingPermissions(role:string){
    const jwt:jwtDecoded = jwt_decode(localStorage.getItem("electripureJwt")?? "")
    const userId = jwt?.data
    const roleUser = jwt?.role;

    return [ roleUser[role], userId ]
}
