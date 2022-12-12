import { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ElectripureState } from "./../../../interfaces/reducers"
import { sendGetCompanies, sendGetCompaniesTable, sendGetCompaniesByUser } from "../../../actions/electripure"
import { CompanyEntity } from "../../../interfaces/entities";
import { CreateUserData } from "../../../interfaces/form"

import SelectedCompanies from "./SelectedCompanies"
import { ModalMiddle } from "../../Modal";
import BasicCompanyInformationForm from "../../Form/BasicCompanyInformationForm";
import MainPointContactForm from "../../Form/MainPointContactForm";
import SiteManagerForm from "../../Form/SiteManagerForm";
import SiteDetailForm from "../../Form/SiteDetailForm";
import { useNavigate } from "react-router-dom";
import { CiaPermission } from "../../../routers/Permissions"

const DropdownSelector = ( { onCreateCompany } : {onCreateCompany: () => void}) => {
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Toogle
    const [ toggleSearch, setToggleSearch ] = useState(false);
    // Keyword
    const [ searchCompanyName, setSearchCompanyName ] = useState("");
    // List filtered
    const [ filteredData, setFilteredData ] = useState<CompanyEntity[]>([]);
    // 
    const [ companySelected, setCompanySelected ] = useState("")
    // Companies
    const companies: CompanyEntity[] = JSON.parse(useSelector((state: ElectripureState) => state.companies));

    const handleClean = () => setSearchCompanyName(prev => "")
    // get user to make a request with specific user
    const user_id = localStorage.getItem('user_id');
    
    const selectCompany = (company: any) => {
        setCompanySelected(company.company_name)
        setToggleSearch(!toggleSearch)
        navigate(`company/${company.company_id}`);
    }

    const handleSearch = (event: any) => {
        const value = event.target.value
        setSearchCompanyName(value)
        if(filteredData.length !== 0){
            if (value != "") {
                const sortResult = companies.filter((company: any) => {
                    return company.company_name.toLowerCase().includes(value.toLowerCase())
                });
                setFilteredData(sortResult)
            } else {
                setFilteredData(companies)
            }
        } else {
            setFilteredData(companies)
        }
    }

    useEffect(()=>{
        dispatch(sendGetCompaniesByUser({"userId": Number(user_id)}));
    }, [companySelected]);

    return (
        <Fragment>
            <div className="flex w-[82%] gap-[22px] justify-between">
                <div className={`w-[230px]
                                flex
                                absolute
                                bg-white
                                rounded-md
                                shadow-md
                                justify-around
                                ${toggleSearch?'h-[350px]':'h-[50px]'}
                                border-[1px]
                                border-solid
                                border-[#D2D6DE]`}>
                    <div className="w-[80%]">
                    {
                        toggleSearch?
                        <div className="mt-[40px] relative w-[210px] h-[290px]">
                            <div className="pl-[15px]">
                                <div className="rotate-90 w-[40px] h-[40px] relative bottom-[-45px] text-center">
                                { searchCompanyName.length === 0? 
                                <span className="text-[26px] text-black font-extrabold">&#9740;</span>
                                :
                                <span onClick={handleClean}
                                      className="text-[26px] 
                                                 relative 
                                                 cursor-pointer
                                                 bottom-[153px] 
                                                 h-full 
                                                 block 
                                                 bg-white">&#10005;</span>
                                }
                                </div>
                                <input 
                                    className={`w-[100%] h-[48px] border border-[#D2D6DE] mb-8  ${searchCompanyName.length === 0 ? 'pl-[35px]' :'pl-[5px] pr-[20px]' }`}
                                    type="search" 
                                    value={searchCompanyName}
                                    onChange={handleSearch}
                                    placeholder="Search Company"/>
                                <div className="h-[170px]">
                                    <ul className="overflow-auto h-full">
                                    {
                                        searchCompanyName === "" || filteredData.length === 0 ? companies?.map((company:any, index:number) => (
                                        <li key={index} 
                                            onClick={()=> {selectCompany(company)}} 
                                            //value={company.company_name}
                                            value={company.name}
                                            className="my-4 cursor-pointer
                                                       hover:bg-[#D7D7D7]
                                                       ">
                                            {company.company_name}
                                        </li>
                                        ))
                                    : filteredData.map((company:any, index:number) => (
                                        <li key={index} 
                                            onClick={()=> {selectCompany(company)}} 
                                            value={company.name}
                                            className="my-4 cursor-pointer
                                                       hover:bg-[#D7D7D7]
                                                       ">
                                            {company.company_name}
                                        </li>
                                        ))
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="relative top-[10px] left-[15px]">
                            { companySelected? companySelected :"Select Company"}
                        </div>
                    }
                    </div>
                    <div className="relative w-[45px] h-[45px] cursor-pointer" 
                         onClick={() => setToggleSearch(!toggleSearch)}>
                        <i 
                           className={`
                                       relative
                                       top-[10px]
                                       left-[20px]
                                       border-solid
                                       border-black
                                       divide-x-[3px]
                                       p-[3px]
                                       inline-block
                                       border-b-2
                                       border-r-2
                                       ${ toggleSearch? 'rotate-[-135deg]': 'rotate-45'}`}>
                        </i>
                    </div>
                </div>
                <CiaPermission role="create_company">
                    <div className="w-[48px] cursor-pointer absolute right-[30px] h-[48px] text-[32px] rounded-full text-center bg-[#D9D9D9]" onClick={onCreateCompany}>
                        <span className="text-black" >
                            &#43;
                        </span>
                    </div>
                </CiaPermission>
            </div>
            <SelectedCompanies companySelected={companySelected} />
        </Fragment>
    )
}

export default DropdownSelector
