import { FC } from 'react';
interface Button {
    onClick?: () => void;
    variant?: 'primary' | 'secondary'
    children: React.ReactNode;
    disabled?: boolean
    fullWidth?: boolean
    extraClass?: string
}
const Button: FC<Button> = ({ onClick, children, variant = 'secondary', fullWidth = false, extraClass = '', disabled = false }) => {
    return <button
        disabled={disabled}
        onClick={onClick}
        className={
            `${extraClass}
            disabled:bg-gray-600 disabled:text-white
            sm:p-3 p-2 sm:text-base text-sm rounded-md shadow-md 
        ${fullWidth ? 'w-full' : ''}  
        ${variant === 'primary' ? 'bg-blue-800 text-white' : ''} 
        `
        }>
        {children}
    </button>
}

export default Button;