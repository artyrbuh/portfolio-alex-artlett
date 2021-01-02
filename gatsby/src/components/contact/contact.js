import React, {useState} from "react"
import ContactButton from '../ui/contact-button'

const Contact = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => expanded === true ? setExpanded(false) : setExpanded(true);

    return (
        <>
            <ContactButton/>
        </>
    );
}

export default Contact;