import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

export default function Flower(props) {
    const bottom = `${props.index === 0 ? (props.index + 120) : ((props.index + 1) * 60) + 60}px`;
    const delay = `${((props.index + 1) / 2) + 1}s`;
    const [transitionClass, setTransitionClass] = useState("opacity-0");

    
    let direction;
    let invertFlower = props.index % 2 === 0 ? "" : "scale-x-[-1]";
    if (props.flowerIndex === "ixora") {
        direction = props.index % 2 === 0 ? " -rotate-[35deg]" : "rotate-[35deg]";
    } else {
        direction = props.index % 2 === 0 ? " -rotate-[25deg]" : "rotate-[25deg]";
    }

    useEffect(() => {
        setTimeout(() => {
            setTransitionClass(`opacity-100 ${direction}`);
        }, 50);
    })

    return (
        <div
            style={{
                bottom: bottom,
                transitionDelay: delay,
                "--primary-fill": props.palette.primaryFill,
                "--secondary-fill": props.palette.secondaryFill,
                "--tertiary-fill": props.palette.tertiaryFill,
                "--leaf-fill": props.palette.leafFill,
                "--stem-fill": props.palette.stemFill
            }}
            className={`${transitionClass} origin-bottom transition-all duration-500 ease-in-out absolute ${invertFlower}`
            }>
            <ReactSVG src={`/growing-flower/images/flowers/flower_${props.flowerIndex}.svg`} />
        </div>
    )
}

