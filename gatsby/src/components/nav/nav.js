import React, { useContext } from "react"
import { ThemeDataContext, ActiveMenu } from '../layout';
import OffcanvasMenu from './offcanvas-menu';
import Burger from '../ui/burger';
import { AALink } from "../../core/page-transition";

const Nav = () => {
    const themeData = useContext(ThemeDataContext);
    const { isMenu } = useContext(ActiveMenu);
    const d = new Date();
    const {logo, designation, name} = themeData.wordpressAcfOptions.options;

    return (
        <>
            <Burger/>
            <div className="nav">
                <div className={`nav--branding`}>
                    <span className="nav--branding__designation">{designation}</span>    
                    <AALink to="/">
                        <img 
                            src={logo.url.source_url}
                            className="logo"
                        />
                    </AALink>
                    <span className="nav--branding__title">{`${name} - ${d.getFullYear()}`}</span>
                </div>
            </div>
            <OffcanvasMenu expanded={isMenu("main")} />
        </>
    );
}

export default Nav;