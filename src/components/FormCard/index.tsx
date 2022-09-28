
function FormCard(props: {children: any, title: String}) {
    return (
        <div className="w-full max-w-[500px] bg-color-white px-[60px] pt-[30px] pb-[50px] border-color-secondary rounded-sm">
           <h2 className="color-primary-dark f-bold title pt-[20px]">{props.title}</h2>
            {props.children}
        </div>
    );
}

export default FormCard;