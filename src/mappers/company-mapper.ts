import { GlobalCompanyEntity } from "../interfaces/entities";


function toCompanies(companies: any[]): GlobalCompanyEntity[] {
    return companies.map((company): GlobalCompanyEntity => {
        return {
            "id": company.idCompany,
            "name": company.companyName
        };
    })
}

export default {
    toCompanies
};