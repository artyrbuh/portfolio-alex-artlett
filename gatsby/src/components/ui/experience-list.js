import React, {useState, useRef, useEffect, useContext, createContext} from 'react'
import ExperienceModal from './experience-modal';
import {TweenLite} from 'gsap';

export const ExperienceContext = createContext(null);

export const ExperienceWrapper = ({children}) => {
    const [modalLaunched, setModalLaunched] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const launchModal = (el) => {
        setModalLaunched(true);
        setModalContent(el);
    };

    return (
        <ExperienceContext.Provider value={{modalLaunched, setModalLaunched, modalContent, setModalContent, launchModal}}>
            {children}
        </ExperienceContext.Provider>
    );
}

const ExperienceList = ({experience_list}) => {
    let ul, hover = useRef(null);
    const [prevY, setPrevY] = useState(0);
    const [showHover, setShowHover] = useState(false);

    const {launchModal} = useContext(ExperienceContext);

    
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

    /*
     * Allow hover to follow direction of mouse
     */
    const liEnter = (e, i) => {
        const y = parseInt(e.target.clientHeight) * i;
        let skewY = y > prevY ? 4 : -4;

        setPrevY(y);

        TweenLite.to(hover, {
            skewY,
            ease: 'power3.inEaseOut',
        })

        TweenLite.to(hover, {
            duration: .45,
            delay: .1,
            y: y,
            skewY: 0,
            ease: 'power3.inEaseOut',
        });
    }

    if(experience_list.length) {
        return (
            <>
                <ul 
                    className="experience-list"
                    ref={el => ul = el}
                    onMouseEnter={() => setShowHover(true)}
                    onMouseLeave={() => setShowHover(false)}
                >
                    {experience_list.map((el, i) => {
                        return (
                            <li 
                                key={i}
                                onClick={() => launchModal(el)}
                                onMouseEnter={(e) => liEnter(e, i)}
                            >
                                <span>{el.company}</span>
                                {el.contract ? (
                                    <span>Contract</span>
                                ) : (
                                    <span>{totalYears(el.start_year, el.end_year)} year{totalYears(el.start_year, el.end_year) > 1 ? `s` : ''}</span>
                                )}
                                
                            </li>
                        );
                    })}
                    <p 
                        className={`experience-list--hover ${showHover ? 'show' : ''}`}
                        ref={el => hover = el}
                    >
                        <span>h o v e r</span>
                    </p>
                </ul>
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

export const ExperienceModalWithContext = () => {
    const {modalLaunched, setModalLaunched, modalContent} = useContext(ExperienceContext);
    return (
        <ExperienceModal 
            isActive={modalLaunched}
            content={modalContent}
            closeMenu={() => setModalLaunched(false)}
        />
    );
}

export default ExperienceList;