import { CompanyRowEntity, GlobalCompanyEntity } from "../interfaces/entities";


function toCompanies(companies: any[]): GlobalCompanyEntity[] {
    return companies.map((company): GlobalCompanyEntity => {
        return {
            "id": company.idCompany,
            "name": company.companyName
        };
    })
}

function toCompaniesRows(companies: any[]): CompanyRowEntity[] {
    return companies.map((company: any): CompanyRowEntity => {
        return {
            "id": company.id,
            "name": company.company_name,
            "mdps": company.sites_count,
            "sites": company.MDP_count,
            "users": company.users_count,
            "status": company.Status,
            "date": company.DateAdd
        };
    })
}

export default {
    toCompanies,
    toCompaniesRows
};