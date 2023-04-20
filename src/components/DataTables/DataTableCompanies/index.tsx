import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { sendActivateDeactivateCompany, sendGetCompaniesTable, setCompaniesTable, sendGetCompaniesByUser, sendArchiveCompany } from "../../../actions/electripure";
import { ElectripureState } from "../../../interfaces/reducers";
import DataTable from "../../DataTable";
import { HeaderConfig, RowConfig, TableConfig } from "../../DataTable/interfaces/datatable";
import { settingPermissions } from "../../../libs/permissions"


export interface ICompanyRow {
    id: number;
    name: string;
    mdps: number;
    sites: number;
    users: number;
    status: string;
    date: string;
}

function DataTableCompanies({}) {
    // SECTION Instance hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // !SECTION
    // Get companies from redux store
    let companiesTable: ICompanyRow[] = JSON.parse(useSelector((state: ElectripureState) => state.companiesTable));
    // Filter companies by user
    if(settingPermissions("list_companies")[0] === 2){
        const cia = JSON.parse(useSelector((state: ElectripureState) => state.companies))[0];
        companiesTable = companiesTable.filter(company => cia?.company_name == company.name)
    }
    // Validate permission to activate/deactivate companies
    const canActivate = () => {
        if(settingPermissions("activate_user")[0] === 2){
            return false
        } else if(settingPermissions("activate_user")[0] === 1){
            return true
        } else {
            return false
        }
    }
    // SECTION Define action functions
    function archiveCompany(company: ICompanyRow) {
        dispatch(sendArchiveCompany({"id": company.id}))
    }
    async function deactivateCompany(company: ICompanyRow) {
        dispatch(sendActivateDeactivateCompany({"id": company.id, "action": "deactivate"}))
    }
    async function activateCompany(company: ICompanyRow) {
        dispatch(sendActivateDeactivateCompany({"id": company.id, "action": "activate"}))
    }
    // !SECTION
    // SECTION Request permissions and companies
    useEffect(() => {
        dispatch(sendGetCompaniesByUser({"userId": settingPermissions("list_companies")[1]}));
        dispatch(sendGetCompaniesTable({}));
    }, []);
    // !SECTION
    // SECTION Configure table
    const data: RowConfig[] = companiesTable.map((company: ICompanyRow): RowConfig => {
        return {
            "Company": {
                "label": <span onClick={() => {navigate(`/dashboard/company/details/${company.id}`)}} className="cursor-pointer f-medium color-primary">{company.name}</span>,
                "value": company.name
            },
            "Sites": {
                "label": <span className="f-medium">{company.sites}</span>,
                "value": company.sites
            },
            "MDPs": {
                "label": <span className="f-medium">{company.mdps}</span>,
                "value": company.mdps
            },
            "Users": {
                "label": <span className="f-medium">{company.users}</span>,
                "value": company.users
            },
            "Status": {
                "label": canActivate() ? company.status == "Active" ?
                        <span><span className="color-success f-bold">{company.status}</span><span className="cursor-pointer color-secondary underline f-light text-sm ml-[10px]" onClick={()=>{deactivateCompany(company)}}>deactivate</span></span> :
                        <span><span className="color-error f-bold">{company.status}</span><span className="cursor-pointer color-secondary underline f-light text-sm ml-[10px]" onClick={()=>{activateCompany(company)}}>activate</span></span>
                        : <span><span className={company.status == "Active" ? "color-success f-bold": "color-error f-bold"}>{company.status}</span><span className="cursor-pointer color-secondary underline f-light text-sm ml-[10px]"></span></span>,
                "value": company.status
            },
            "Date": {
                "label": <span className="f-medium">{company.date}</span>,
                "value": company.date
            },
            "Archive": {
                "label": <span className="cursor-pointer" onClick={()=> { archiveCompany(company) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                </span>,
                "value": 1
            }
        }
    });
    const headers: HeaderConfig[] = [
        {
            key: "Company",
            label: "Company",
            sort: () => {
                let companiesSorted = [...companiesTable].sort((a: ICompanyRow, b:ICompanyRow) => {
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
                let companiesSorted = [...companiesTable].sort((a: ICompanyRow, b:ICompanyRow) => {
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
        {
           key: "Archive",
           label: "Archive"
        }
    ];
    // !SECTION
    const config: TableConfig = {"headers": headers, "data": data};
    return <DataTable config={config} />;
}

export default DataTableCompanies;
