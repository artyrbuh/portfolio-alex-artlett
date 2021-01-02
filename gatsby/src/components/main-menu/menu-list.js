import React from 'react';
import {Link} from 'gatsby';


const MenuList = ({props}) => {
    const menu = props.allWordpressWpApiMenusMenusItems.edges[0].node.items;

    return (
        <>
            {menu.length ? (
                <ul className="menu menu--main">
                    {menu.map((el, i) => (
                        <li key={i} className="menu-item">
                            <Link to={el.object_slug}>
                                {el.title}
                            </Link>
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