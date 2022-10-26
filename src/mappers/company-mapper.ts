import { CompanyEntity } from "../interfaces/entities";


function toCompanies(companies: any[]): CompanyEntity[] {
    return companies.map((company): CompanyEntity => {
        return {
            "id": company.idCompany,
            "name": company.companyName
        };
    })
}

export default {
    toCompanies
};