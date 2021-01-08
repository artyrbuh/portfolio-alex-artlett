import React from "react";
import Close from "./close";
import Modal from './modal';

const ExperienceModal = ({isActive, content, children, closeMenu}) => {
    const {company, description, end_year, start_year, position} = content;

    const dateMarkup = () => {
        let markup;

        if(start_year === end_year) {
            markup = start_year;
        } else if (end_year !== "" && start_year !== end_year) {
            markup = `${start_year} - ${end_year}`;
        } else if(end_year === "") {
            markup = `${start_year} - present`;
        }

        return markup;
    }

    return (
        <Modal 
            isActive={isActive} 
            content={content} 
            children={children} 
            closeMenu={closeMenu}
            classes="experience-modal"
        >
            <header className="modal-card-head">
                <p className="modal-card-title">{company}</p>
                <span>{dateMarkup()}</span>
                <div onClick={closeMenu} className="close-modal">
                    <Close/>
                </div>
            </header>
            <section className="modal-card-body">
                <p className="designation">{position}</p>
                <div  dangerouslySetInnerHTML={{__html: description}}/>
            </section>
            <footer className="modal-card-foot">
            </footer>
        </Modal> 
    )
};

export default ExperienceModal;