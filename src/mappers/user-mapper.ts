import { UserEntity, CompanyEntity } from "../interfaces/entities";


function toUsers(users: any[]): UserEntity[] {
    return users.map((user: any) => {
        return user as UserEntity;
    });
}

function toCompanies(companies: any[]): CompanyEntity[] {
    return companies.map((company: any) => {
        return company as CompanyEntity;
    });
}

export default {
    toUsers,
    toCompanies,
};
