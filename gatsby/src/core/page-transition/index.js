import React, {useState, useEffect, useRef, useContext, createContext} from "react";
import {TweenLite} from "gsap";
import { navigate } from "gatsby";

export const PageTransitionContext = createContext(null);

// In a component that wraps your page contents
export const PageTransition = ({ children, delay }) => {
    // We're using the TransitionState component here to provide the current transition status to our pose
    let wiperOne, wiperTwo = useRef();
    const [state, setState] = useState({
        initialLoad: false,
        loaded: false,
        inTransit: false
    });

    useEffect(() => {
        if(state.initialLoad === false) {
            setState({...state, initialLoad: true});
        }
    });

    useEffect(() => {
        if(state.initialLoad === true && state.loaded === false) {
            slideIn();
            setState({...state, loaded: true});
        }
    }, [state.initialLoad]);

    useEffect(() => {
        if(state.inTransit) {
            slideOut();
        }
    }, [state.inTransit]);

    const slideIn = () => {
        TweenLite.to([wiperOne, wiperTwo], {
            skewY: 0,
            duration: 0    
        });

        TweenLite.to([wiperTwo, wiperOne], {
            skewX: -3,
            duration: .87,
            delay: 0,
            x: `100%`,
            ease: 'power3.inOut',
            stagger: {
                amount: 0.1
            }
        });

        TweenLite.to([wiperOne, wiperTwo], {
            duration: 0,
            delay: .5,
            css: {display: "none"}
        });
    }

    const slideOut = () => {
        TweenLite.to([wiperOne, wiperTwo], {
            css: {display: 'block'},
        });
        TweenLite.to([wiperOne, wiperTwo], {
            skewX: 3,
            x: `-110%`,
            duration: 0    
        });

        TweenLite.to([wiperOne, wiperTwo], {
            skewX: 0,
            duration: .87,
            delay: 0.1,
            x: `0`,
            ease: 'power3.inOut',
            stagger: {
                amount: 0.1
            }
        });
    }

    return (
        <div>
            <PageTransitionContext.Provider value={{state, setState}}>
                {children}
            </PageTransitionContext.Provider>

            <div className="page-transition--wiper aa-pale-red--bg" ref={el => wiperOne = el}></div>
            <div className="page-transition--wiper aa-white--bg" ref={el => wiperTwo = el}></div>
        </div>
    );
};

export const AALink = ({to, delay, children, className}) => {
    const {state, setState} = useContext(PageTransitionContext);
    const time = delay !== undefined ? delay * 1000 : 700;

    const onClick = (e) => {
        e.preventDefault();
        
        if(typeof document !== "undefined") {
            if(document.location.pathname !== `${to}`) {
                goToPage();
            }
        } else {
            goToPage();
        }
    }

    const goToPage = () => {
        setState({...state, inTransit: true});
        setTimeout(() => {
            navigate(to);
        }, time);
    }

    return <a onClick={onClick} {... className ? {className: className} : {}}>{children}</a>
}