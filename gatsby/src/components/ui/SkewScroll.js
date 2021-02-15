import React, { useRef, useEffect } from "react"
import { useWindowSize } from "../../core/util/helpers";

const SkewScrollContainer = ({className, children}) => {
    const size = useWindowSize();
    const scrollContainer = useRef(null);
    const skewConfigs = {
        ease: .1,
        current: 0,
        previous: 0,
        rounded: 0
    };

    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();

    const skewScrolling = (time) => {
        if (previousTimeRef.current != undefined) {
            skewConfigs.current = window.scrollY;
            skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
            skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;
        
            const difference = skewConfigs.current  - skewConfigs.rounded;
            const acceleration = difference / size.width;
            const velocity = +acceleration;
            const skew = velocity * 3.25;
            scrollContainer.current.style.transform = `skewY(${skew}deg)`;
        }

        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(skewScrolling);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(skewScrolling);

        //clean up 
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div 
            ref={scrollContainer} 
            {... className ? {className: className} : {}}
        >
            {children}
        </div>
    )
}

export default SkewScrollContainer;