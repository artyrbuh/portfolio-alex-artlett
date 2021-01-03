import React, {useState, useContext} from "react"
import ContactButton from '../ui/contact-button'
import {ActiveMenu} from '../layout';
import ContactMenu from "./contact-menu";

const Contact = () => {
    const {toggleContactMenu, isMenu} = useContext(ActiveMenu);
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <ContactButton onClick={toggleContactMenu} expanded={isMenu("contact")}/>
            <ContactMenu expanded={isMenu("contact")}/>
        </>
    );
}

export default Contact;