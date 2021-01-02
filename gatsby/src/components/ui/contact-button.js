import React from 'react';
import Close from './close';
import ContactText from './contact-text';

const ContactButton = ({expanded, onClick}) => {
    return (
        <div 
            className={`contact-button ${expanded ? 'open' : ''}`}
            onClick={onClick}>
            <ContactText/>
            <Close/>
        </div>
    );
};

export default ContactButton;