


function Card({ children }: { children: any }) {
    return (<div className="w-full bg-color-white p-[10px] border-color-secondary border rounded-sm">
        {children}
    </div>);
}

export default Card;