import React, {useContext, useEffect, useState} from "react";
import { textAsSpans } from "../../core/util/helpers";
import {WorkPageContext} from '../../templates/work-landing';

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
                <a className="hoverable-cta">
                    <span>{ textAsSpans(`${hideFilters ? 'Show' : 'Hide'} filters`)}</span>
                    <span>{ textAsSpans(`${hideFilters ? 'Show' : 'Hide'} filters`)}</span>
                </a>
            </div>
            <div className="work-filters-wrap" style={{height}}>
                <div>{children && children}</div>
            </div>
        </>
    );
}

export const FilterButtons = ({filters, classes}) => {
    const { isFilterActive, toggleFilters, resetFilters, hasGroupOfFilters } = useContext(WorkPageContext);

    if(filters.length) {
        return (
            <ul className={`work-filters ${classes ? classes : ''}`}>
                <li 
                    onClick={() => resetFilters(filters)}
                    className={`${!hasGroupOfFilters(filters) ? 'is-active' : ''}`}
                >All</li>
                {filters.map((el, i) => (
                    <li 
                        key={i}
                        onClick={() => toggleFilters(el.slug)}
                        className={`${isFilterActive(el.slug) ? 'is-active' : ''}`}
                    >{el.name}</li>
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
