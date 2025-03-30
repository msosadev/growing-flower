function Button({
    children,
    onClick,
    type = "filled",
    state = "resting",
    disabled = false,
    htmlFor,
    classes
}) {
    const styles = {
        filled: {
            resting: "bg-purple-600 text-white hover:bg-purple-500",
            error: "bg-red-600 text-white hover:bg-red-500",
            disabled: "bg-gray-400 text-white opacity-50 cursor-not-allowed",
        },
        outlined: {
            resting: "border border-purple-600 text-purple-600 hover:bg-purple-100",
            error: "border border-red-600 text-red-600 hover:bg-red-100",
            disabled: "border border-gray-400 text-gray-400 opacity-50 cursor-not-allowed",
        },
        text: {
            resting: "text-purple-600 hover:bg-purple-100",
            error: "text-red-600 hover:bg-red-100",
            disabled: "text-gray-400 opacity-50 cursor-not-allowed",
        },
    };

    const Component = htmlFor ? "label" : "button";


    return (
        <Component htmlFor={htmlFor || undefined} onClick={onClick} disabled={disabled} className={`px-2 text-sm w-fit py-1 block rounded-md text-s transition-colors cursor-pointer ${styles[type][state]} ${classes}`}>{children || "Button"}</Component>
    )
}

export default Button;