import { ReactSVG } from 'react-svg';

export default function Flower(props) {
    const bottom = `${props.index === 0 ? (props.index + 120) : ((props.index + 1) * 60) + 60}px`;
    const delay = `${(props.index + 1)/2}s`;
    return (
        <div
            style={{
                opacity: props.runningTime === 0 ? "0" : "",
                bottom: bottom,
                transitionDelay: delay,
                "--primary-fill": props.palette.primaryFill,
                "--secondary-fill": props.palette.secondaryFill,
                "--tertiary-fill": props.palette.tertiaryFill,
                "--leaf-fill":  props.palette.leafFill,
                "--stem-fill":  props.palette.stemFill
            }}
            className={`transition-opacity duration-200 ease-in-out absolute
            ${props.index % 2 === 0 ? "-translate-x-10 -rotate-[25deg]" : "translate-x-10 rotate-[25deg] scale-x-[-1]"}`
            }>
            <ReactSVG src={`/images/flowers/flower_${props.randomIndex}.svg`} />
        </div>
    )
}

