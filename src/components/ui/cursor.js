import React, {useEffect, useState, useRef, useContext} from "react";
import { PageTransitionContext } from "../../core/page-transition";
import { getMousePos } from "../../core/util/helpers";

const Cursor = () => {
    let cursor = useRef(null);
    let cursorWorkElement = useRef(null);

    const [cursorHover, setCursorHover] = useState(false);
    const [hideCursor, setHideCursor] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const {state} = useContext(PageTransitionContext);

    

    const onMouseMove = e => {
        setMouse({
            ...getMousePos(e)
        });
    }

    const onMouseHover = e => {
        if(typeof document !== 'undefined') {
            document.querySelectorAll(".work-element").forEach((el) => {
                el.addEventListener("mouseover", () => setCursorHover(true));
                el.addEventListener("mouseout", () => setCursorHover(false));
            });
    
            document.querySelectorAll(".button").forEach((el) => {
                el.addEventListener("mouseover", () => setHideCursor(true));
                el.addEventListener("mouseout", () => setHideCursor(false));
            });
        }
    }


    useEffect(() => {
        if(typeof window !== 'undefined' && typeof document !== 'undefined') {

            window.addEventListener("mousemove", onMouseMove);

            onMouseHover();

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                document.querySelectorAll(".work-element").forEach((el) => {
                    el.removeEventListener("mouseover", () => setCursorHover(true));
                    el.removeEventListener("mouseout", () => setCursorHover(false));
                });

                document.querySelectorAll(".button").forEach((el) => {
                    el.removeEventListener("mouseover", () => setHideCursor(true));
                    el.removeEventListener("mouseout", () => setHideCursor(false));
                });
            }
        }
    });

    return (
        <div 
            className={`
                cursor ${cursorHover ? 'work-element' : ''}
                ${hideCursor ? 'hide-cursor' : ''}
                ${typeof state !== "undefined" && state.inTransit ? 'fully-hide-cursor' : ''}
            `}
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