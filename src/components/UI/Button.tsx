import { ReactNode } from "react";

interface IProps extends React.DOMAttributes<HTMLButtonElement>{
    name?:string,
    className:string
    children?:ReactNode
    width?: "w-full" | "w-fit"
}

const Button = ({name,className,children,width="w-full",...rest}: IProps) => {
    return (
        <>
            <button className={`${className} ${width} text-white p-2 rounded-md text-lg w-full`}  {...rest} >{children? children : name}</button>
        </>
    );
};

export default Button;