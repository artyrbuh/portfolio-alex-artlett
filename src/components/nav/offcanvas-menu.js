import React, {useContext, useEffect, useRef, useState} from "react"
import {ThemeDataContext, ActiveMenu} from '../layout';
import Menu from '../main-menu/menu';
import { slideCloseMenuUp, slideOpenMenuDown, animateSideText } from "../../core/animation/menu";

const OffcanvasMenu = ({expanded}) => {
    const d = new Date();
    const themeData = useContext(ThemeDataContext);
    const {activeMenu, contactMenuActive, initialClick, setMainMenuActive, setContactMenuActive} = useContext(ActiveMenu);
    const name = themeData.wordpressAcfOptions.options.name;

    let menuRef = useRef(null);
    let menuInner = useRef(null);
    let menuInnerBG = useRef(null);
    let sideTextRef = useRef(null);
    let [delay, setDelay] = useState(0.1);

    const sideText = () => `${name} - ${d.getFullYear()}`.split('').map((el, i) => <span key={i}>{el}</span>);

    useEffect(() => {
        if(activeMenu === "main") {
            //if contact menu is already open, it will 
            if(contactMenuActive === true) {
                setDelay(2.2);
                setContactMenuActive(false);
            }

            slideOpenMenuDown(menuRef, menuInnerBG, menuInner, delay);
            animateSideText(sideTextRef);
        } else if((activeMenu === "" && initialClick == true) || (activeMenu == "contact" && initialClick == true)) {
            //close menu if no active menu or if active menu is contact menu
            slideCloseMenuUp(menuRef, menuInnerBG, menuInner);
            setMainMenuActive(false);
        }
    }, [activeMenu]);

    return (
        <div 
            className={`offcanvas-menu ${expanded ? '' : ''}`}
            ref={el => menuRef = el}
        >
            <div className="offcanvas-bg" ref={el => menuInnerBG = el}></div>
            <div ref={el => menuInner = el} className="offcanvas-menu--inner">
                <div className="container">
                    <div className="columns is-vcentered is-flex">
                        <div className="column menu wrap--main-menu">
                            <div className="designation-col">
                                <div>
                                    <p ref={el => sideTextRef = el}>{sideText()}</p>
                                </div>
                            </div>
                            <Menu/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OffcanvasMenu;