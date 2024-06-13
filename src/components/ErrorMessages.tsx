interface IProps {
message:string,

}

const ErrorMessages =({message}:IProps)=>{
    return(
        <>
            {message ? <span className="block text-red-700 font-semibold text-sm">{message}</span> : null}
        </>
    );
};

export default ErrorMessages;