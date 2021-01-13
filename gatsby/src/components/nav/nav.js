import React, { useContext } from "react"
import { ThemeDataContext, ActiveMenu } from '../layout';
import OffcanvasMenu from './offcanvas-menu';
import { Link } from 'gatsby';
import Burger from '../ui/burger';

const Nav = () => {
    const themeData = useContext(ThemeDataContext);
    const {toggleMainMenu, isMenu} = useContext(ActiveMenu);
    const d = new Date();
    //const title = themeData.site.siteMetadata.title;
    const {logo, designation, name} = themeData.wordpressAcfOptions.options;

    return (
        <>
            <div
                className={`
                    burger-wrap 
                    ${isMenu("main") ? 'expanded' : ''} 
                    ${isMenu("contact") ? 'contact-menu-open' : ''}`
                }
                onClick={toggleMainMenu}
            >
                <Burger/>
            </div>
            <div className="nav">
                <div className={`nav--branding`}>
                    <span className="nav--branding__designation">{designation}</span>    

                    <Link to="/">
                        <img 
                            src={logo.url.source_url}
                            className="logo"
                        />
                    </Link>

                    <span className="nav--branding__title">{`${name} - ${d.getFullYear()}`}</span>
                </div>
            </div>
            <OffcanvasMenu expanded={isMenu("main")} />
        </>
    );
}

export default Nav;