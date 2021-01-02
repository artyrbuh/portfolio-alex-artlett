import React, {useState} from 'react';
import Close from './close';
import ContactText from './contact-text';

const ContactButton = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => open === true ? setOpen(false) : setOpen(true);
    let textPath = `<textPath xlink:href="#curve">contact me</textPath>`;

    return (
        <div className={`contact-button ${open ? 'open' : ''}`}>
            <ContactText/>
            <Close/>
        </div>
    );
};

export default ContactButton;