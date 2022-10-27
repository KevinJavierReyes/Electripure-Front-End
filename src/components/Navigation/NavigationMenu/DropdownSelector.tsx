import { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ElectripureState } from "./../../../interfaces/reducers"
import { sendGetCompanies, sendGetCompaniesByUser } from "../../../actions/electripure"
import { CompanyEntity } from "../../../interfaces/entities";

import SelectedCompanies from "./SelectedCompanies"
import { ModalMiddle } from "../../Modal";
import BasicCompanyInformationForm from "../../Form/BasicCompanyInformationForm";
import MainPointContactForm from "../../Form/MainPointContactForm";
import SiteManagerForm from "../../Form/SiteManagerForm";
import SiteDetailForm from "../../Form/SiteDetailForm";

const DropdownSelector = ( { onCreateCompany } : {onCreateCompany: () => void}) => {
    
    const dispatch = useDispatch();

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
    
    const setValue = (e:any) => {
        setCompanySelected(prev => e.target.innerHTML)
        setToggleSearch(!toggleSearch)
    }

    const handleSearch = (event: any) => {
        const value = event.target.value
        setSearchCompanyName(value)
        if(filteredData.length !== 0){
            if (value != "") {
                const sortResult = companies.filter((company: any) => {
                return company.company_name.toLowerCase().includes(value.toLowerCase())
                         })
                setFilteredData(sortResult)
                } else {
                    setFilteredData(companies)
                }
            } else {
                setFilteredData(companies)
            }
        }

    useEffect(()=>{
        dispatch(sendGetCompaniesByUser({
            "userId": 42
        }));
    }, [])

    return (
        <Fragment>
            <div className="flex w-[82%] gap-[22px] justify-between">
                <div className="w-[222px]
                                flex
                                justify-around
                                max-h-[350px]
                                border-[1px]
                                border-solid
                                border-[#D2D6DE]"
                     >
                    <div className="w-[82%]">
                    {
                        toggleSearch?
                        <div className="mt-[40px] relative w-[200px]">
                            <div>
                                <div className="rotate-90 w-[40px] h-[40px] relative bottom-[-45px] text-center">
                                { searchCompanyName.length === 0? 
                                <span className="text-[26px] text-black font-extrabold">&#9740;</span>
                                :
                                <span onClick={handleClean}
                                      className="text-[26px] 
                                                 relative 
                                                 cursor-pointer
                                                 bottom-[158px] 
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
                                <div>
                                    <ul className="overflow-scroll h-[150px]">
                                    {
                                        searchCompanyName === "" || filteredData.length === 0 ? companies?.map((company, index) => (
                                        <li key={index} 
                                            onClick={setValue} 
                                            value={company.company_name}
                                            className="my-4 cursor-pointer
                                                       hover:bg-[#D7D7D7]
                                                       ">
                                            {company.company_name}
                                        </li>
                                        ))
                                    : filteredData.map((company, index) => (
                                        <li key={index} 
                                            onClick={setValue} 
                                            value={company.company_name}
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
                        <div className="relative top-[10px]">
                            { companySelected? companySelected :"Select Company"}
                        </div>
                    }
                    </div>
                    <div className="relative top-[8px] right-[5px]"
                         onClick={() => setToggleSearch(!toggleSearch) }>
                        <i 
                           className={`cursor-pointer
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
                <div className="w-[48px] cursor-pointer h-[48px] text-[32px] rounded-full text-center bg-[#D9D9D9]" onClick={onCreateCompany}>
                    <span className="text-black" >
                        &#43;
                    </span>
                </div>
            </div>
            <SelectedCompanies companySelected={companySelected} />
        </Fragment>
    )
}

export default DropdownSelector
