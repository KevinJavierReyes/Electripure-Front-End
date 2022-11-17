import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ElectripureState } from "./../../../interfaces/reducers"
import { TYPE_SPACE } from "../../../config/enum";
import { ButtonNotification } from "../../FormInput/Button";
import { setJwt, setLoginToken, setTimestampTwoStepVerification } from "./../../../actions/electripure";
import InputSearch from "../../FormInput/InputSearch";
import Space from "../../Space";

import FloarUserSetting from "./components/FloarUserSetting";
import FloatUserSetting from "./components/FloarUserSetting";


function NavigationBar() {
    
    const user = localStorage.getItem('current_user');
    let name;
    let surname;
    if(user){
        name = user.split(" ")[0];
        surname = user.split(" ")[1];
    } else {
        name = " ";
        surname = " ";
    }

    useEffect(() =>{
    
    }, []);

    return (
        <div className="w-full md:h-[65px]	flex justify-between items-start md:items-center px-[30px] md:flex-nowrap flex-wrap flex-col-reverse md:flex-row">
            <Space type={TYPE_SPACE.TEXT_DISTANCE} classes="w-full sm:hidden"/>
            <div className="w-full sm:w-fit h-full flex justify-center items-center">
                <div className="f-medium text-sm md:text-base">
                    System Status
                </div>
                <Space type={TYPE_SPACE.TEXT_DISTANCE_VERTICAL}/>
                <span className="w-[15px] h-[15px] bg-color-success rounded-full"></span>
            </div>
            <Space type={TYPE_SPACE.TEXT_DISTANCE} classes="w-full md:hidden"/>
            <div className="w-full sm:w-fit  h-full flex justify-center items-center sm:flex-nowrap flex-wrap flex-col-reverse sm:flex-row">
                <div className="w-full sm:w-[300px]">
                    <InputSearch
                        placeholder="Search"
                        onChange={(value: string) => {}}
                    />
                </div>
                <Space type={TYPE_SPACE.FORM_DISTANCE_VERTICAL} classes="hidden sm:block"/>
                <Space type={TYPE_SPACE.TEXT_DISTANCE} classes="w-full sm:hidden"/>
                <div className="flex justify-center items-center flex-nowrap">
                    <span className="flex justify-center items-center flex-nowrap">
                        <span className="f-semibold">Howdy,&nbsp;</span>
                        <span className="f-semibold color-black-dark"> {name}</span>
                    </span>
                    <Space type={TYPE_SPACE.FORM_DISTANCE_VERTICAL} />
                    <Space type={TYPE_SPACE.TEXT_DISTANCE} classes="w-full sm:hidden"/>
                    <div className="flex">
                        <ButtonNotification onClick={() => {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                            </svg>
                        </ButtonNotification>
                        <Space type={TYPE_SPACE.TEXT_DISTANCE_VERTICAL}/>
                        <ButtonNotification notifications={4} onClick={() => {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                            </svg>
                        </ButtonNotification>
                        <Space type={TYPE_SPACE.TEXT_DISTANCE_VERTICAL}/>
                        <FloatUserSetting>
                            <span className="f-bold">{surname ? `${surname[0]}${name[0]}` : `${name[0]}${name[1]}`.toUpperCase()}</span>
                        </FloatUserSetting>
                    </div>
                   

                </div>
            </div>
            <Space classes="h-[10px] w-full md:hidden"/>
        </div>
    );
}

export default NavigationBar;
