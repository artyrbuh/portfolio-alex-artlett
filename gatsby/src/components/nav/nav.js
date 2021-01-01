import React, { useState, createContext } from "react"
import {ThemeDataContext} from '../layout';
import OffcanvasMenu from './offcanvas-menu';
import Burger from '../ui/burger';

const Nav = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => expanded === true ? setExpanded(false) : setExpanded(true);
    
    return (
        <ThemeDataContext.Consumer>
            {themeData => {
                const d = new Date();
                const title = themeData.site.siteMetadata.title;
                const {logo, designation} = themeData.wordpressAcfOptions.options;
                return (
                        <>
                            <div
                                className={`burger-wrap ${expanded ? 'expanded' : ''}`}
                                onClick={toggleExpand}
                            >
                                <Burger/>
                            </div>
                            <div className="nav">
                                <div className={`nav--branding`}>
                                    <span className="nav--branding__designation">{designation}</span>    

                                    <img 
                                        src={logo.url.source_url}
                                        className="logo"
                                    />

                                    <span className="nav--branding__title">{`${title} - ${d.getFullYear()}`}</span>
                                </div>
                            </div>
                            <OffcanvasMenu expanded={expanded} />
                        </>
                );
            }}
        </ThemeDataContext.Consumer>
    );
}

export default Nav;