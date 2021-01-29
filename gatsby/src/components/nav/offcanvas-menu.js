import React, {useContext, useEffect, useRef, useState} from "react"
import {ThemeDataContext, ActiveMenu} from '../layout';
import Menu from '../main-menu/menu';
import {TweenLite} from 'gsap';

const OffcanvasMenu = ({expanded}) => {
    const d = new Date();
    const themeData = useContext(ThemeDataContext);
    const {activeMenu, contactMenuActive, initialClick} = useContext(ActiveMenu);
    const name = themeData.wordpressAcfOptions.options.name;

    let menuRef = useRef(null);
    let menuInner = useRef(null);
    let menuInnerBG = useRef(null);
    let sideTextRef = useRef(null);
    let [delay, setDelay] = useState(0);

    const sideText = () => `${name} - ${d.getFullYear()}`.split('').map((el) => <span>{el}</span>);

    useEffect(() => {
        if(activeMenu === "main") {
            //if contact menu is already open, it will 
            if(contactMenuActive === true) {
                setDelay(2.2);
            }

            openMenu();
            animateSideText();
        } else if((activeMenu === "" && initialClick == true) || (activeMenu == "contact" && initialClick == true)) {
            //close menu if no active menu or if active menu is contact menu
            closeMenu();
        }
    }, [activeMenu]);

    //animate in the menu
    const openMenu = () => {
        TweenLite.to(menuRef, 
            {
                duration: delay,
                css: {display: 'block'}
            }
        );
        TweenLite.to([menuInnerBG, menuInner], {
            duration: 0,
            opacity: 1,
            height: '100%',
            skewY: 0,
          });
        TweenLite.from([menuInnerBG, menuInner], 
            {
                duration: .8,
                height: 0,
                transformOrigin: 'right top',
                skewY: 4,
                ease: 'power3.inOut',
                stagger: {
                  amount: 0.1
                }
            }
        );
    }

    //animate out the menu
    const closeMenu = () => {
        TweenLite.to([menuInner, menuInnerBG], 
            {
                duration: .8,
                height: 0,
                transformOrigin: 'right top',
                ease: 'power3.inOut',
                skewY: 4,
                stagger: {
                  amount: 0.07
                }
            }
        );

        TweenLite.to(menuRef, 
            {
                duration: 1,
                skewY: 0,
                css: {display: 'none'}
            }
        );
    }

    const animateSideText = () => {
        TweenLite.from(sideTextRef.children, 
            {
                delay: .8,
                duration: .4,
                transformOrigin: 'right top',
                opacity: 0,
                left: 5,
                ease: 'power3.inOut',
                stagger: {
                  amount: 0.3
                }
            }
        );
    }

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