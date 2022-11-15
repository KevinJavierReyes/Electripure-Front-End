
const MDPDetails = (props:any) => {
    return(
        <div>
            {props.sub_id?.map((id:string, index:number)=> <div key={index}>{id}</div>)}
            {props.sub_mdp?.map((sub:string, index:number)=> <div key={index}>{sub}</div>)}
        </div>
    )
}

export default MDPDetails;
