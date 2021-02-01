import React, {useContext, useRef, useEffect} from 'react';
import ContactText from './contact-text';
import {ActiveMenu} from '../layout';
import { scaleOutRotate, scaleInRotate, bgColourChange, staggerWidthsIn} from '../../core/animation';

const ContactButton = ({expanded, onClick}) => {
    const {disabled, mainMenuActive} = useContext(ActiveMenu);
    let contactRef = useRef(null);
    let closeRef = useRef(null);

    useEffect(() => {
        if(mainMenuActive) {
            scaleOutRotate(contactRef);
        }

        if(!mainMenuActive) {
            scaleInRotate(contactRef, 1);
        }
    }, [mainMenuActive]);

    useEffect(() => {
        if(expanded) {
            bgColourChange(contactRef, "#fff", .3);
            staggerWidthsIn(closeRef.children, .4);
        } 

        if(!expanded) {
            bgColourChange(contactRef, "#000", .3, .4);
        }
    }, [expanded])

    return (
        <div 
            disabled={disabled}
            className={`contact-button ${expanded ? '' : ''}`}
            onClick={onClick}
            ref={el => contactRef = el}
        >
            <ContactText/>
            <div className={`close`} ref={el => closeRef = el}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default ContactButton;