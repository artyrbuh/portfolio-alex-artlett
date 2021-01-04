import React from 'react'

const ExperienceList = ({experience_list}) => {

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


    if(experience_list.length) {
        return (
            <ul className="experience-list">
                {experience_list.map((el, i) => {
                    return (
                        <li key={i}>
                            <span>{el.company}</span>
                            <span>{totalYears(el.start_year, el.end_year)} years</span>
                        </li>
                    );
                })}
            </ul>
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