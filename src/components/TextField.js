function TextField({
    onChange,
    type = "text",
    state = "resting",
    disabled = false,
    name,
    id,
    placeholder,
    classes
}) {
    const styles = {
        resting: "border border-white-600 text-white-600 hover:bg-white-100",
        error: "border border-red-600 text-red-600 hover:bg-red-100",
        disabled: "border border-gray-400 text-gray-400 opacity-50 cursor-not-allowed",
    };

    return (
        <input type={type} name={name || undefined} id={id || undefined} placeholder={placeholder || undefined} onChange={onChange} disabled={disabled} className={`p-2 rounded-md border-2 border-gray-300 ${styles[state]} ${classes}`} />
    )
}

export default TextField;