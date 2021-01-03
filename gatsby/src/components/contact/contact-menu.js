import React, {useContext} from "react"
import {ThemeDataContext} from '../layout';
import ContactMenuList from "./contact-menu-list";

const ContactMenu = ({expanded}) => {
    const themeData = useContext(ThemeDataContext);
    const menu = themeData.allWordpressWpApiMenusMenusItems.edges[0].node.items;
    const email = themeData.wordpressAcfOptions.options.email;

    return (
        <div className={`offcanvas-menu contact-menu ${expanded ? 'expanded' : ''}`}>
            <div className="container wrap--contact-menu">
                <div className="columns is-vcentered is-flex is-desktop menu">
                    <ContactMenuList menu={menu}/>
                </div>

                <a 
                    href={`mailto:${email}`}
                    className="email"
                >{email}</a>
            </div>
        </div>
    );
}

export default ContactMenu;