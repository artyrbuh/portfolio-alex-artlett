import React from "react";

const WorkBarNav = ({children}) => {
    return (
        <div className="work-nav-bar">
            {children && children}
        </div>
    );
}

export default WorkBarNav;