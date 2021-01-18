import React from "react";

const AAButton = ({url, target, title}) => (
    <a 
        className="button"
        href={url}
        target={target}
    >{title}</a>
);

export default AAButton;