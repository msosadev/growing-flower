import { ReactSVG } from 'react-svg';

export default function Flower(props) {
    console.log(props.palette);
    return (
        <div
            style={{
                opacity: props.runningTime === 0 ? "0" : "",
                "--flower-appear-delay": `${props.index + 1}s`,
                "--flower-bottom": `${props.index === 0 ? (props.index + 60) * 60 : (props.index + 1) * 60}px`,
                "--primary-fill": props.palette.primaryFill,
                "--secondary-fill": props.palette.secondaryFill,
                "--tertiary-fill": props.palette.tertiaryFill,
                "--leaf-fill":  props.palette.leafFill,
                "--stem-fill":  props.palette.stemFill
            }}
            className={`flower ${props.index % 2 === 0 ? "left" : "right"}`}>
            <ReactSVG src={`/images/flowers/flower_${props.index + 1}.svg`} />
        </div>
    )
}

