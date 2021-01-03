import React, {useContext} from 'react';
import {ActiveMenu} from '../layout';
import {Link} from 'gatsby';


const MenuList = ({props}) => {
    const {toggleContactMenu} = useContext(ActiveMenu);
    const menu = props.allWordpressWpApiMenusMenusItems.edges[0].node.items;

    const openContactMenu = (e) => {
        e.preventDefault();
        toggleContactMenu();
    }

    return (
        <>
            {menu.length ? (
                <ul className="menu menu--main">
                    {menu.map((el, i) => (
                        <li key={i} className="menu-item">
                            {el.object_slug !== "contact" ? (
                                <Link to={`${el.object_slug === 'home' ? '/' : el.object_slug}`}>
                                    {el.title}
                                </Link>
                            ) : 
                            (
                                <a onClick={(e) => openContactMenu(e)}>
                                    {el.title}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>add menu items</div>
            )}
        </>
    )
}

export default MenuList;