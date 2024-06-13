import { ReactNode } from "react";

interface IProps extends React.DOMAttributes<HTMLButtonElement>{
    name?:string,
    className:string
    children?:ReactNode
    width?: "w-full" | "w-fit"
    type?:string
 
}

const Button = ({name,className,children,width="w-full",type,...rest}: IProps) => {
    return (
        <>
            <button className={`${className} ${width} text-white p-2 rounded-md text-lg `} {...rest} >{children? children : name}</button>
        </>
    );
};

export default Button;