import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { sendActivateDeactivateCompany, sendGetCompaniesTable,  sendResentEmail, setCompaniesTable, setUsers, sendGetCompaniesByUser } from "../../../actions/electripure";
import { CompanyRowEntity, UserEntity } from "../../../interfaces/entities";
import { ElectripureState } from "../../../interfaces/reducers";
import DataTable from "../../DataTable";
import { HeaderConfig, RowConfig, TableConfig } from "../../DataTable/interfaces/datatable";
import { CiaPermission } from "../../../routers/Permissions"
import { settingPermissions } from "../../../libs/permissions"


function DataTableCompanies({}) {

    let companiesTable: CompanyRowEntity[] = JSON.parse(useSelector((state: ElectripureState) => state.companiesTable));
    if(settingPermissions("list_companies")[0] === 2){
        const cia = JSON.parse(useSelector((state: ElectripureState) => state.companies))[0];
        companiesTable = companiesTable.filter(company => cia?.company_name == company.name)
    }

    const canActivate = () => {
        if(settingPermissions("activate_user")[0] === 2){
            return false
        } else if(settingPermissions("activate_user")[0] === 1){
            return true
        } else {
            return false
        }
    }


    //const companiesTable = companies.filter((cia:any)=> cia.)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function deleteCompany(company: CompanyRowEntity) {
        console.log(company);
        console.log("Company deleted!");
    }

     
    async function deactivateCompany(company: CompanyRowEntity) {
        dispatch(sendActivateDeactivateCompany({"id": company.id, "action": "deactivate"}))
    }
    
    async function activateCompany(company: CompanyRowEntity) {
        dispatch(sendActivateDeactivateCompany({"id": company.id, "action": "activate"}))
    }
     
    
    // async function resendInvite(user: UserEntity) {
    //     dispatch(sendResentEmail({"id": user.id}))
    // }
     
    useEffect(() => {
        dispatch(sendGetCompaniesByUser({"userId": settingPermissions("list_companies")[1]}));
        dispatch(sendGetCompaniesTable({}));
    }, []);

    const data: RowConfig[] = companiesTable.map((companyRow: CompanyRowEntity): RowConfig => {
        return {
            "Company": {
                "label": <span onClick={() => {navigate(`/dashboard/company/details/${companyRow.id}`)}} className="cursor-pointer f-medium color-primary">{companyRow.name}</span>,
                "value": companyRow.name
            },
            "Sites": {
                "label": <span className="f-medium">{companyRow.sites}</span>,
                "value": companyRow.sites
            },
            "MDPs": {
                "label": <span className="f-medium">{companyRow.mdps}</span>,
                "value": companyRow.mdps
            },
            "Users": {
                "label": <span className="f-medium">{companyRow.users}</span>,
                "value": companyRow.users
            },
            "Status": {

                "label": canActivate() ? companyRow.status == "Active" ?
                        <span><span className="color-success f-bold">{companyRow.status}</span><span className="cursor-pointer color-secondary underline f-light text-sm ml-[10px]" onClick={()=>{deactivateCompany(companyRow)}}>deactivate</span></span> :
                        <span><span className="color-error f-bold">{companyRow.status}</span><span className="cursor-pointer color-secondary underline f-light text-sm ml-[10px]" onClick={()=>{activateCompany(companyRow)}}>activate</span></span>
                        : <div></div>,
                "value": companyRow.status
            },
            "Date": {
                "label": <span className="f-medium">{companyRow.date}</span>,
                "value": companyRow.date
            },
            "Delete": {
                "label": <span className="cursor-pointer" onClick={()=> { deleteCompany(companyRow) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></span>,
                "value": 1
            }
        }
    });

    const headers: HeaderConfig[] = [
        {
            key: "Company",
            label: "Company",
            sort: () => {
                let companiesSorted = [...companiesTable].sort((a: CompanyRowEntity, b:CompanyRowEntity) => {
                    return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
                });
                if (JSON.stringify(companiesTable) == JSON.stringify(companiesSorted)) {
                    companiesSorted.reverse();
                }
                dispatch(setCompaniesTable({
                    companies: companiesSorted
                }))
            }
        },
        {
            key: "Sites",
            label: "Sites"
        },
        {
            key: "MDPs",
            label: "MDPs",
        },
        {
            key: "Users",
            label: "Users",
        },
        {
            key: "Status",
            label: "Status",
            sort: () => {
                let companiesSorted = [...companiesTable].sort((a: CompanyRowEntity, b:CompanyRowEntity) => {
                    return `${a.status}`.toLowerCase().localeCompare(`${b.status}`.toLowerCase())
                });
                if (JSON.stringify(companiesTable) == JSON.stringify(companiesSorted)) {
                    companiesSorted.reverse();
                }
                dispatch(setCompaniesTable({
                    companies: companiesSorted
                }))
            }
        },
        {
            key: "Date",
            label: "Date Add",
        },
        //{
        //    key: "Delete",
        //    label: "Delete"
        //}
    ];

    const config: TableConfig = {"headers": headers, "data": data};
    return <DataTable config={config} />;
}

export default DataTableCompanies;
