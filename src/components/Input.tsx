import { InputHTMLAttributes } from "react";


interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    

}

const Input = ({...rest}: IProps) => {
    return (
        <>
        <input  {...rest} className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"  />
 
        </>
    );
};

export default Input;