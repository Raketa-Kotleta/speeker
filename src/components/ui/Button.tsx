import type { ReactNode } from "react"

export  interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode,
    className?: string,
    size?: 'sm' | 'md' |'lg',
}
const sizesClasses = {
    sm: 'py-1 px-2 text-xs',
    md: 'py-2 px-3 text-sm',
    lg: 'py-2 px-3 text-md'
}
export default function Button({children, className = '', size = 'md', ...rest} : IButtonProps) {
    
    return <button className={`py-2 px-3 ${sizesClasses[size]} cursor-pointer border-gray-500 border-1 rounded-md ${className}`} {...rest}>
        {children}
    </button>
}