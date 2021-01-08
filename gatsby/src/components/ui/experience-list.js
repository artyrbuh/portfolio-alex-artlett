import React, {useState} from 'react'
import ExperienceModal from './experience-modal';

const ExperienceList = ({experience_list}) => {

    const [modalLaunched, setModalLaunched] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const totalYears = (start_year, end_year) => {
        let total;

        if(end_year != "") {
            total = parseInt(end_year) - parseInt(start_year);
        } else {
            const d = new Date();
            total = d.getFullYear() - parseInt(start_year);
        }

        return (total > 0) ? total : (total + 1);
    };

    const launchModal = (el) => {
        setModalLaunched(true);
        setModalContent(el);
    };


    if(experience_list.length) {
        return (
            <>
                <ul className="experience-list">
                    {experience_list.map((el, i) => {
                        return (
                            <li 
                                key={i}
                                onClick={() => launchModal(el)}
                            >
                                <span>{el.company}</span>
                                <span>{totalYears(el.start_year, el.end_year)} years</span>
                            </li>
                        );
                    })}
                </ul>
                <ExperienceModal 
                    isActive={modalLaunched}
                    content={modalContent}
                    closeMenu={() => setModalLaunched(false)}
                />
            </>
        )
    } else {
        return (
            <>
                Add Experience items
            </>
        )
    }
};

export default ExperienceList;