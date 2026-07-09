const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-md",
}

export default function Button({children, className="", onClick, variant="primary", as: Component = "button", href}) {
    const base = `px-4 py-2 cursor-pointer self-center`
    const variantClass = variants[variant]??variants.primary
    return (
        <Component href={href} onClick={onClick} className={`${base} ${variantClass} ${className}`}>
            {children}
        </Component>
    )
} 