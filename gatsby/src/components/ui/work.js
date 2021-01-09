import React from "react";
import Layout from "../layout";

export const WorkContainer = ({children}) => {
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

export const WorkBarNav = ({children}) => {
    return (
        <div className="work-nav-bar">
            {children && children}
        </div>
    );
}

export const WorkLayout = ({children}) => {
    return (
        <Layout classes="work-layout">
            {children && children}
        </Layout>
    );
}
