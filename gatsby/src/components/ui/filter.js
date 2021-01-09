import React, {useContext} from "react";
import {WorkPageContext} from '../../templates/work-landing';

export const FilterWrap = ({children}) => {
    return (
        <div className="work-filters-wrap">
            {children && children}
        </div>
    );
}

export const FilterButtons = ({filters, classes}) => {
    const { isFilterActive, toggleFilters, resetFilters, filtersAreNotEmpty } = useContext(WorkPageContext);

    if(filters.length) {
        return (
            <ul className={`work-filters ${classes ? classes : ''}`}>
                <li 
                    onClick={() => resetFilters(filters)}
                    className={`${!filtersAreNotEmpty(filters) ? 'is-active' : ''}`}
                >All</li>
                {filters.map((el, i) => (
                    <li 
                        key={i}
                        onClick={() => toggleFilters(el.slug)}
                        className={`${isFilterActive(el.slug) ? 'is-active' : ''}`}
                    >{el.slug}</li>
                ))}
            </ul>
        );
    } else {
        return (
            <>
                Add filters
            </>
        );
    }

}
