const variants = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm",
    gray: "bg-gray-700 hover:bg-gray-800 text-gray-400 rounded-md text-sm"
}

export default function Button({children, className="", onClick, variant="primary", as: Component = "button", href, type}) {
    const base = `px-3 py-2 cursor-pointer self-center`
    const variantClass = variants[variant]??variants.primary
    return (
        <Component href={href} onClick={onClick} type={type} className={`${base} ${variantClass} ${className}`}>
            {children}
        </Component>
    )
} 