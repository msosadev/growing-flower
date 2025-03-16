function Button(props) {
    return(
        <button onClick={props.onClick} className="px-2 w-fit py-1 block bg-purple-500 text-white rounded-md text-sm hover:bg-purple-400 transition-colors cursor-pointer">{props.label}</button>
    )
}

export default Button;