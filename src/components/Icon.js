import { ReactSVG } from "react-svg";

function Icon({name = "help-circle"}) {
    return (
        <ReactSVG src={`/growing-flower/images/icons/${name}.svg`} />
    )
}

export default Icon;