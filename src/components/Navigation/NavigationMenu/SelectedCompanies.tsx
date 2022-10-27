import { Fragment, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { CompanyEntity } from "../../../interfaces/entities"
import { ElectripureState } from "../../../interfaces/reducers"
import img from "./item_img.svg"

const SelectedCompanies = ({companySelected}: any) => {
    const [ toggleData, setToggleData ] = useState(false)
    const [ togglesubData, setSubToggleData ] = useState(false)
    const [ companyInfo, setCompanyInfo ] = useState("")

    const company = JSON.parse(useSelector((state: ElectripureState) => state.companies)).filter(function(a: any){
        return a.company_name  === companySelected
    })

    console.log(company)
    function settingEvent(e:any){
        let elements = document.getElementsByClassName('dropdown1')
        for(const element in elements) {
            elements[element].addEventListener('click', ()=> console.log('clicking'))
        }
        let selected = e.target.getAttribute('data-site-index')
        console.log(selected)
    }

    useEffect(()=>{

    }, [])

    return (
        <Fragment>
            { company?.map((item:any , index: any) => (
                item.list_sites.map((site:any, site_index:any) => (
                <div key={site_index}>
                <hr className="mt-[15px] w-full " />
                    <div className="w-full flex justify-between" >
                        <div className="flex h-[75px]">
                            <div className="h-[60px]
                                            w-[60px]
                                            mt-2
                                            ">
                                <img className="h-full w-full rounded-md" src={site.link} alt="image" />
                            </div>
                            <div className="ml-4 mt-3">
                                <h3>{site.name}</h3>
                                <div >
                                    <small>Status</small>
                                    <span className="p-1 text-[#55BA47]">&#9679;</span>
                                </div>
                            </div>
                        </div>
                        <div data-site-index={site_index} onClick={() => setToggleData(prev => !toggleData)} 
                                className="dropdown1 w-[50px] h-[50px] my-auto border-l-2 cursor-pointer">
                            <i className={`border-solid 
                                          border-black
                                          divide-x-[3px] 
                                          p-[3px]   
                                          ml-4 
                                          mt-3 
                                          inline-block 
                                          border-b-2 
                                          translate-x-1/2 
                                          translate-y-1/2 
                                          border-r-2 
                                          ${toggleData ? 'rotate-[-135deg]':'rotate-45'}`}>
                            </i>
                        </div>
                    </div>
                    {site?.mdp_list?.map((mdp:any, index_mdp:any) => (
                    <div key={index_mdp} data-mdp-id={mdp.id} className={toggleData ? "dropdown2 block" : "hidden"}>
                    <hr className="w-full" />
                        <div className="w-full flex justify-between">
                            <div className="flex h-[75px] ml-8">
                                <div className="h-[40px]
                                                v-[40px]
                                                mt-2
                                                ">
                                    <img className="h-full w-full rounded-md" src={img} alt="image" />
                                </div>
                                <div className="ml-4 mt-6">
                                    <h3>{mdp.name}</h3>
                                </div>
                            </div>
                            <div id={mdp.name}  onClick={() =>setSubToggleData(prev => !togglesubData)}
                                 className="dropdown3 w-[50px] h-[50px] my-auto border-l-2 cursor-pointer">
                                <i className={`border-solid 
                                               border-black 
                                               divide-x-[3px] 
                                               p-[3px] 
                                               mxlix-4 
                                               ml-4 
                                               mt-3 
                                               inline-block 
                                               border-b-2 
                                               translate-x-1/2 
                                               translate-y-1/2 border-r-2 ${togglesubData ? 'rotate-[-135deg]' : 'rotate-45' }`}>
                                </i>
                            </div>
                        </div>
                        <hr className="w-full " />
                        { mdp?.sub_mdp?.map((sub_mdp:any, index_sub_mdp:any) => (
                            <div data-sub-mdp={sub_mdp} key={index_sub_mdp} className={togglesubData? "text-center m-1 text-black" : "hidden" }>
                                <p><strong>{sub_mdp}</strong></p>
                            </div>
                        ))}
                    </div>
                    ))}
                </div> 
                ))
            ))}
        </Fragment>
    )
}

export default SelectedCompanies;
