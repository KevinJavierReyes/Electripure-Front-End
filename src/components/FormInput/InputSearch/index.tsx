import searchIcon from "./../../assets/svg/search.svg";

function InputSearch({ placeholder, onChange}: { placeholder: string, onChange: (value: string) => void }) {
    function handleChange(event: any) {
        onChange(event.target.value);
    }
    return (
        <div className="w-full flex items-stretch">
            <label className="w-[50px] flex items-center justify-center border-color-black-light border-0 border-l border-y">
                {/* <img src={searchIcon} className="w-[2 5px] w-[25px]"/> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

            </label>
            <input
                onChange={handleChange}
                placeholder={placeholder}
                className={"w-full h-[36px] px-[10px] pl-0 border-color-black-light color-black border-0 border-r border-y"} type="text"/>
        </div>
    );
}

export default InputSearch;