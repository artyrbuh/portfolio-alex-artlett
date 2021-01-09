import React from "react";

const WorkContainer = ({children}) => {
    return (
        <div className="container work-wrap">
            <div className="columns">
                <div className="column">
                    {children && children}
                </div>
            </div>                    
        </div>
    )
}

export default WorkContainer;