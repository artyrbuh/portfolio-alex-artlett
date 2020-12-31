import React, { useState, createContext } from "react"
import {ThemeDataContext} from '../layout';
import OffcanvasMenu from './offcanvas-menu';

const Nav = () => {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <ThemeDataContext.Consumer>
            {themeData => {
                const d = new Date();
                const title = themeData.site.siteMetadata.title;
                const {logo, designation} = themeData.wordpressAcfOptions.options;
                return (
                        <>
                            <div className="nav">
                                <div
                                    className={`nav--burger ${expanded ? 'expanded' : ''}`}
                                    onClick={() => setExpanded(true)}
                                >
                                    <div className={`burger`}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>

                                <div className={`nav--branding`}>
                                    <span className="nav--branding__designation">{designation}</span>    

                                    <img 
                                        src={logo.url.source_url}
                                        className="logo"
                                    />

                                    <span className="nav--branding__title">{`${title} - ${d.getFullYear()}`}</span>
                                </div>
                            </div>
                            <OffcanvasMenu />
                        </>
                );
            }}
        </ThemeDataContext.Consumer>
    );
}

export default Nav;