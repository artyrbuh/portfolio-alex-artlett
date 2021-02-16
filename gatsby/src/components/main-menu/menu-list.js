import React, {useContext, useEffect, useState, useRef} from 'react';
import {ActiveMenu} from '../layout';
import { staggerItemsSkewUpDown } from '../../core/animation';
import { AALink } from '../../core/page-transition';
import { textAsSpans } from '../../core/util/helpers';


const MenuList = ({props}) => {
    const {toggleContactMenu} = useContext(ActiveMenu);
    const menu = props.allWordpressWpApiMenusMenusItems.edges[0].node.items;

    let menuItems = useRef(null);
    
    let [delay, setDelay] = useState(.15);

    const {activeMenu, contactMenuActive} = useContext(ActiveMenu);
    
    const getChildrenToAnimate = () => {
        let els = [];
        
        for(var i = 0; i < menuItems.children.length; i++) {
            els.push(menuItems.children[i].firstElementChild)
        }

        return els;
    }

    const openContactMenu = (e) => {
        e.preventDefault();
        toggleContactMenu();
    }

    useEffect(() => {
        if(activeMenu === "main") {
            if(contactMenuActive === true) {
                setDelay(2.2);
            }

            staggerItemsSkewUpDown(getChildrenToAnimate(), 0, 170, 0.3, .45);
        }
    }, [activeMenu]);


    return (
        <>
            {menu.length ? (
                <ul className="menu menu--main" ref={el => menuItems = el}>
                    {menu.map((el, i) => (
                        <li key={i} className="menu-item">
                            {el.object_slug !== "contact" ? (
                                <AALink 
                                    to={`${el.object_slug === 'home' ? '/' : `/${el.object_slug}`}`}
                                    className="flourish-hover"
                                >
                                    {textAsSpans(el.title)}
                                </AALink>
                            ) : 
                            (
                                <a 
                                    onClick={(e) => openContactMenu(e)}
                                    className="flourish-hover"
                                >
                                    {textAsSpans(el.title)}
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