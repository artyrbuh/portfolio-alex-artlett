import React, {useRef, useState} from "react";
import { textAsSpans } from "../../core/util/helpers";

const AAButton = ({url, target, title, classes, action, disabled, rel}) => {
    let button = useRef(null);
    let [bgPos, setBgPos] = useState({x: 0, y: 0});

    const setHoverPos = (e) => {
        const boundingRect = button.getBoundingClientRect();

        setBgPos({
            x: e.clientX - boundingRect.left,
            y: e.clientY - boundingRect.top
        });
    }

    return (
        <a 
            className={`button hoverable-cta--wrap ${classes ? classes : ''}`}
            {... url ? {href: url} : {}}
            {... target ? {target: target} : {}}
            {... rel ? {rel: rel} : {}}
            ref={el => button = el}
            onMouseEnter={setHoverPos}
            onMouseLeave={setHoverPos}
            onClick={action}
            disabled={disabled}
        >   
            <span className="button--border">
                <span className="button--active-bg">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <span 
                    className="button--bg"
                    style={{left: `${bgPos.x}px`, top: `${bgPos.y}px`}}
                ></span>
            </span>
            <span className="button--text hoverable-cta">
                <span className="hoverable--text">{textAsSpans(title)}</span>
                <span className="hoverable--text">{textAsSpans(title)}</span>
            </span>
        </a>
    )
};

export default AAButton;