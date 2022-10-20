import { UserEntity } from "../interfaces/entities";


function toUsers(users: any[]): UserEntity[] {
    return users.map((user: any) => {
        return user as UserEntity;
    });
}


export default {
    toUsers
};