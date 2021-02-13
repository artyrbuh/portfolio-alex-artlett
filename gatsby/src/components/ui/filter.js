import React, {useContext, useEffect, useState} from "react";
import {WorkPageContext} from '../../templates/work-landing';
import AAButton from "./button";

export const FilterWrap = ({children}) => {
    const [hideFilters, setHideFilters] = useState(true);
    const [height, setHeight] = useState("unset");
    const getWidth = () => typeof window !== 'undefined' && typeof document !== 'undefined' ? window.innerWidth 
    || document.documentElement.clientWidth 
    || document.body.clientWidth : 0;
    let currWidth = useCurrentWidth();
  
    //bind window width to state prop
    function useCurrentWidth() {
        // save current window width in the state object
        let [width, setWidth] = useState(getWidth());

        useEffect(() => {
            // timeoutId for debounce mechanism
            let timeoutId = null;
            const resizeListener = () => {
                // prevent execution of previous setTimeout
                clearTimeout(timeoutId);
                // change width from the state object after 150 milliseconds
                timeoutId = setTimeout(() => setWidth(getWidth()), 50);
            };

            // set resize listener
            window.addEventListener('resize', resizeListener);

            return () => {
                // remove resize listener
                window.removeEventListener('resize', resizeListener);
            }
        }, [])

        return width;
    }
    
    //hide filters by changing height to 0, or show filters by setting the div to calculated the height
    useEffect(() => {
        if(hideFilters === true) {
            setHeight("0");
        } else {
            calcFiltersHeight();
        }
    }, [hideFilters]);

    //when the window is resized, recalculate the width of the filters div
    useEffect(() => {
        if(hideFilters !== true) {
            calcFiltersHeight();
        }
    }, [currWidth]);

    const calcFiltersHeight = () => {
        const height = document.querySelector('.work-filters-wrap > div').clientHeight;
        console.log(height);
        setHeight(`${height}px`);
    }

    return (
        <>
            <div className="toggle-filters" onClick={() => setHideFilters(!hideFilters)}>
                <a className="flourish-hover">
                    {`${hideFilters ? 'Show' : 'Hide'} filters`}
                    <span className="flourish-one aa-black--text">{`${hideFilters ? 'Show' : 'Hide'} filters`}</span>
                </a>
            </div>
            <div className="work-filters-wrap" style={{height}}>
                <div>{children && children}</div>
            </div>
        </>
    );
}

export const FilterButtons = ({filters, classes}) => {
    const { isFilterActive, toggleFilters, resetFilters, hasGroupOfFilters, workItems } = useContext(WorkPageContext);

    if(filters.length) {
        return (
            <ul className={`work-filters ${classes ? classes : ''}`}>
                <li>
                    <AAButton 
                        action={() => !workItems.disabled && resetFilters(filters)} 
                        title={`All`}
                        classes={`${!hasGroupOfFilters(filters) ? 'is-active' : ''}`}
                    />
                </li>
                
                {filters.map((el, i) => (
                    <li key={i}>
                        <AAButton 
                            action={() => toggleFilters(el.slug)} 
                            title={el.name}
                            disabled={workItems.disabled}
                            classes={`${isFilterActive(el.slug) ? 'is-active' : ''}`}
                        />
                    </li>
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
