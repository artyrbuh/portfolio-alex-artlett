import React, {useEffect, useState, useRef} from "react";
//import { TweenLite, Power3 } from "gsap";
import { getMousePos } from "../../core/util/helpers";

const Cursor = () => {
    let cursor = useRef(null);
    let cursorWorkElement = useRef(null);

    const [cursorHover, setCursorHover] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    

    const onMouseMove = e => {
        setMouse({
            ...getMousePos(e)
        });
    }

    const onMouseHover = e => {
        document.querySelectorAll(".work-element").forEach((el) => {
            el.addEventListener("mouseover", () => setCursorHover(true));
            el.addEventListener("mouseout", () => setCursorHover(false));
        });
    }


    useEffect(() => {
        if(typeof window !== 'undefined') {

            window.addEventListener("mousemove", onMouseMove);

            onMouseHover();

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                document.querySelectorAll(".work-element").forEach((el) => {
                    el.removeEventListener("mouseover", () => setCursorHover(true));
                    el.removeEventListener("mouseout", () => setCursorHover(false));
                });
            }
        }
    });

    /*
    useEffect(() => {
        if(cursorHover) {
            //
            TweenLite.to(cursorWorkElement, 0.35, {
                opacity: 1,
                transform: `scale(1) rotate(45deg)`,
                ease: Power3.easeIn
              });
        } else {
            //
            TweenLite.to(cursorWorkElement, .35, {
                opacity: 0,
                transform: `scale(0) rotate(45deg)`,
                ease: Power3.easeOut
            });
        }
    }, [cursorHover])
    */

    return (
        <div 
            className={`cursor ${cursorHover ? 'work-element' : ''}`}
            ref={el => cursor = el}
            style={{transform: `translateX(${mouse.x}px) translateY(${mouse.y}px)`}}
        >
            <div className={"cursor--inner"}>
            </div>
            <div 
                className={`cursor--work-element`}
                ref={el => cursorWorkElement = el}
            >
                <div className="view-more-text--wrapper">
                    <div className="view-more-text white"></div>
                    <div className="view-more-text white"></div>
                    <div className="view-more-text black"></div>
                    <div className="view-more-text white"></div>
                    <div className="view-more-text white"></div>
                </div>
            </div>
        </div>
    )
}

export default Cursor;