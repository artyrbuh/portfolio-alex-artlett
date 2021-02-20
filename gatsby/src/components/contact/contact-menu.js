import React, {useContext, useRef, useState, useEffect} from "react"
import {ThemeDataContext, ActiveMenu} from '../layout';
import ContactMenuList from "./contact-menu-list";
import { slideOpenMenuRight, slideCloseMenuLeft, staggerItemsSkewUpDown, animateSideText} from "../../core/animation/menu";
import { TweenLite } from "gsap";
import { textAsSpans } from "../../core/util/helpers";

const ContactMenu = ({expanded}) => {
    let menuRef = useRef(null);
    let menuInner = useRef(null);
    let menuInnerBG = useRef(null);
    let menuItems = useRef(null);
    let emailRef = useRef(null);
    let [delay, setDelay] = useState(.25);
    const {activeMenu, mainMenuActive, setMainMenuActive, setContactMenuActive, initialClick} = useContext(ActiveMenu);

    const getChildrenToAnimate = () => {
        let els = [];
        
        for(var i = 0; i < menuItems.children.length; i++) {
            els.push(menuItems.children[i].firstElementChild)
        }

        return els;
    }

    useEffect(() => {
        if(activeMenu === "contact") {
            if(mainMenuActive === true) {
                //setDelay(4.2);
                setMainMenuActive(false);
            }
            
            slideOpenMenuRight(menuRef, menuInnerBG, menuInner, delay);
            
            TweenLite.from(getChildrenToAnimate(), {
                delay: delay,
                duration: 1.2,
                y: 170,
                skewY: 9,
                ease: 'power3.inOut',
                stagger: {
                    amount: 0.3
                }
            });

            animateSideText(emailRef, (delay + 1), .8);

        } else if((activeMenu === "" && initialClick == true) || (activeMenu == "main" && initialClick == true)) {
            //close menu if no active menu or if active menu is contact menu
            setContactMenuActive(false);
            slideCloseMenuLeft(menuRef, menuInnerBG, menuInner);
        }
    }, [activeMenu]);


    const themeData = useContext(ThemeDataContext);
    const menu = themeData.allWordpressWpApiMenusMenusItems.edges[0].node.items;
    const email = themeData.wordpressAcfOptions.options.email;

    return (
        <div 
            className={`offcanvas-menu contact-menu ${expanded ? '' : ''}`}
            ref={el => menuRef = el}
        >
            <div className="offcanvas-bg" ref={el => menuInnerBG = el}></div>
            <div ref={el => menuInner = el} className="offcanvas-menu--inner">
                <div className="container wrap--contact-menu">
                    <div className="columns is-vcentered is-flex is-desktop menu" ref={el => menuItems = el}>
                        <ContactMenuList menu={menu}/>
                    </div>

                    <a 
                        href={`mailto:${email}`}
                        className="email"
                        ref={el => emailRef = el}
                    >{textAsSpans(email)}</a>
                </div>
            </div>
        </div>
    );
}

export default ContactMenu;