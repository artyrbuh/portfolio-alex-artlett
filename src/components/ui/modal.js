import React, {useState, useEffect, useRef} from "react";
import gsap from "gsap";

const Modal = ({isActive, children, closeMenu, classes}) => {
    let modal, modalBG, modalContents = useRef(null);
    const [disabled, setDisabled] = useState(false);
    const [initialClick, setInitialClick] = useState(false);

    useEffect(() => {
        if(isActive) {
            setInitialClick(true);
            showModal();
        }
        
        if(!isActive && initialClick) {
            hideModal();
        }
    }, [isActive]);

    const showModal = () => {
        setDisabled(true);

        gsap.to(modal, 
            {
                css: {display: 'flex'}
            }
        );

        //wipe in the background
        gsap.from(modalBG, {
            delay: 0,
            duration: .8,
            height: 0,
            skewY: 4,
            transformOrigin: 'right top',
            ease: 'power3.inOut'
        });

        //zoom in the modal card
        gsap.from(modalContents, {
            delay: 0.4,
            duration: .45,
            scale: 0.85,
            opacity: 0,
            skewY: 3,
            ease: 'power3.inOut',
        });

        //unset disabled
        setTimeout(() => {
            setDisabled(false);
        }, 1200);
    };

    const hideModal = () => {
        setDisabled(true);
        //wipe out everything

        //wipe in the background
        gsap.to(modalBG, {
            delay: 0,
            duration: .8,
            height: 0,
            transformOrigin: 'right top',
            skewY: 3,
            ease: 'power3.inOut'
        });
        
        gsap.to(modalContents, {
            delay: 0,
            duration: .5,
            scale: 0.85,
            opacity: 0,
            skewY: 3,
            ease: 'power3.inOut',
        });

        gsap.to(modal, 
            {
                delay: .85,
                css: {display: 'none'},
                duration: 0
            }
        );

        gsap.to(modalBG, {
            delay: .85,
            duration: 0,
            height: `100%`,
            skewY: 0,
            transformOrigin: 'right top',
            ease: 'power3.inOut'
        });

        gsap.to(modalContents, {
            delay: .85,
            duration: 0,
            scale: 1,
            opacity: 1,
            skewY: 0,
            ease: 'power3.inOut',
        });

        setTimeout(() => {
            setDisabled(false);
        }, 900);
    }

    return (
        <div 
            className={`modal aa-modal ${classes ? classes : ''} ${isActive ? '' : ''}`}
            ref={el => modal = el}
        >
            <div 
                className="modal-background" 
                onClick={() => !disabled && closeMenu()}
                ref={el => modalBG = el}
            ></div>
            <div 
                className="modal-card"
                ref={el => modalContents = el}
            >
                {children}
            </div>
        </div>  
    );
};

export default Modal;