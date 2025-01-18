import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

export default function Flower(props) {
    const bottom = `${props.index === 0 ? (props.index + 120) : ((props.index + 1) * 60) + 60}px`;
    const delay = `${((props.index + 1) / 2) + 1}s`;
    const [transitionClass, setTransitionClass] = useState("opacity-0");

    useEffect(() => {
        setTimeout(() => {
            setTransitionClass("opacity-100");
        }, 50);
    })

    let direction;
    if (props.flowerIndex === "ixora") {
        direction = props.index % 2 === 0 ? "ixora-left" : "ixora-right";
    } else {
        direction = props.index % 2 === 0 ? "-translate-x-9 -rotate-[25deg]" : "translate-x-9 rotate-[25deg] scale-x-[-1]";
    }

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
            className={`${transitionClass} transition-opacity duration-200 ease-in-out absolute ${direction}`
            }>
            <ReactSVG src={`/images/flowers/flower_${props.flowerIndex}.svg`} />
        </div>
    )
}

