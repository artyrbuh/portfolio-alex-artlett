import React, {useContext} from "react"
import ContactButton from '../ui/contact-button'
import {ActiveMenu} from '../layout';
import ContactMenu from "./contact-menu";

const Contact = () => {
    const {toggleContactMenu, isMenu} = useContext(ActiveMenu);

    return (
        <>
            <ContactButton 
                onClick={toggleContactMenu} 
                expanded={isMenu("contact")}
            />
            <ContactMenu 
                expanded={isMenu("contact")}
            />
        </>
    );
}

export default Contact;