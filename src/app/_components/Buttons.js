const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-md",
}

export default function Button({children, className="", onClick, variant="primary"}) {
    const base = `px-4 py-2 cursor-pointer self-center rounden mt-2`
    const variantClass = variants[variant]??variants.primary
    return (
        <button className={`${base} ${variantClass} ${className}`}>
            {children}
        </button>
    )
}