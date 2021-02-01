import React, {useContext, useEffect, useRef, useState} from 'react';
import { ActiveMenu } from '../layout';
import { TimelineLite } from 'gsap';

const Burger = () => {
    const [initialClick, setInitialClick] = useState(false);
    const {toggleMainMenu, disabled, mainMenuActive, contactMenuActive} = useContext(ActiveMenu);
    let burger, line1, line2, line3 = useRef(null);
    
    useEffect(() => {
        if(mainMenuActive) {
            !initialClick && setInitialClick(true);
            activateBurger();
        }

        if(!mainMenuActive && initialClick) {
            deactivateBurger();
        }
    }, [mainMenuActive]);


    const activateBurger = () => {
        let tl = new TimelineLite({delay: .35});

        tl.to([line1, line2, line3], .45, {
            ease: "power3.easeInOut",
            css: {backgroundColor: "#fff"}
        }, "start");

        tl
            .to(burger, .35, {
                ease: "power3.easeInOut",
                rotate: `180deg`
            }, 0)
            .to(line2, .25, {
                ease: "power3.easeInOut",
                width: 0,
            }, 0.0)
            .to(line1, .25, {
                ease: "power3.easeInOut",
                y: 5
            }, 0.0)
            .to(line3, .25, {
                ease: "power3.easeInOut",
                y: -5
            }, 0.1)
            .to(line1, .25, {
                ease: "power3.easeInOut",
                rotate: `45deg`
            }, 0.2)
            .to(line3, .25, {
                ease: "power3.easeInOut",
                rotate: `-45deg`
            }, 0.2);
        
    }

    const deactivateBurger = () => {
        let tl = new TimelineLite({delay: .35});

        tl.to([line1, line2, line3], .45, {
            ease: "power3.easeInOut",
            css: {backgroundColor: "#000"}
        });

        tl
            .to(burger, .35, {
                ease: "power3.easeInOut",
                rotate: `0deg`
            }, 0)
            .to(line1, .25, {
                ease: "power3.easeInOut",
                rotate: `0deg`
            }, 0.1)
            .to(line3, .25, {
                ease: "power3.easeInOut",
                rotate: `0deg`
            }, 0.2)
            .to(line2, .25, {
                ease: "power3.easeInOut",
                width: `100%`,
            }, 0.3)
            .to(line1, .25, {
                ease: "power3.easeInOut",
                y: 0
            }, 0.4)
            .to(line3, .25, {
                ease: "power3.easeInOut",
                y: 0
            }, 0.5);
    }

    return (
        <div
            className={`
                    burger-wrap 
                    ${mainMenuActive ? '' : ''} 
                    ${contactMenuActive ? 'contact-menu-open' : ''}
                `
            }
            disabled={disabled} 
            onClick={toggleMainMenu}
        >
            <div 
                className={`burger`} 
                ref={el => burger = el}
            >
                <div ref={el => line1 = el}></div>
                <div ref={el => line2 = el}></div>
                <div ref={el => line3 = el}></div>
            </div>
        </div>
    );
}

export default Burger;