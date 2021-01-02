import React from "react"
import {ThemeDataContext} from '../layout';
import ContactMenuList from "./contact-menu-list";

const ContactMenu = ({expanded}) => (
    <ThemeDataContext.Consumer>
        {themeData => {
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
            )
        }
    }
    </ThemeDataContext.Consumer>
)

export default ContactMenu;