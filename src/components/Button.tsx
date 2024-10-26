import {ReactNode} from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    bg1: string;
    bg2: string;
}

const Button: React.FC<ButtonProps> = ({children, onClick, className, bg1, bg2, ...props}) => {
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center h-12 px-4 justify-center cursor-pointer rounded-xl ${className}`}
            style={{backgroundColor: bg1}}
            {...props}
        >
            <div
                className={`flex items-center justify-center absolute h-full -top-1 rounded-xl left-0 right-0 bg-[${bg1}]`}
                style={{backgroundColor: bg2, fontFamily: 'ABeeZee', fontWeight: 'bold',textShadow: "2px 2px 0 black"}}
            >
                {children}
            </div>
        </button>
    );
};

export default Button;
