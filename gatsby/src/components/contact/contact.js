import React, {useState} from "react"
import ContactButton from '../ui/contact-button'
import ContactMenu from "./contact-menu";

const Contact = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => expanded === true ? setExpanded(false) : setExpanded(true);
    const the = () => {
        console.log(the);
    }
    return (
        <>
            <ContactButton onClick={toggleExpand} expanded={expanded}/>
            <ContactMenu expanded={expanded}/>
        </>
    );
}

export default Contact;