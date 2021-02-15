import React, {useContext, useEffect, useState} from "react";
import Layout from "../layout";
import {WorkPageContext} from "../../templates/work-landing";
import { ThemeDataContext } from '../../components/layout';
import {slugify_array, as_obj, shuffle} from "../../core/util/helpers";
import { AALink } from "../../core/page-transition";
import SkewScrollContainer from "./SkewScroll";
import leftArrow from "../../assets/images/left-arrow.svg";

export const WorkContainer = ({children, classes}) => {
    return (
        <SkewScrollContainer>
            <div className={`container work-wrap ${classes ? classes : ''}`}>
                {children && children}
            </div>
        </SkewScrollContainer>
    )
}

export const WorkBarNav = ({children, classes}) => {
    return (
        <div className={`work-nav-bar ${classes ? classes : ''}`}>
            <div>
                {children && children}
            </div>
        </div>
    );
}

export const WorkLayout = ({children, classes}) => {
    return (
        <Layout classes={`work-layout ${classes ? classes : ''}`}>
            {children && children}
        </Layout>
    );
}

export const WorkList = () => {
    const themeData = useContext(ThemeDataContext);

    //capture the proffession and technology filters, convert them into an object with name and slug
    let { professions, technologies } = themeData.wordpressAcfOptions.options;  
    technologies = technologies.map((a) => as_obj(a.technology));
    professions = professions.map((a) => as_obj(a.profession));
    
    //capture work list and filters and functions from page context
    let {work_list, filterList, hasGroupOfFilters, resetAllFilters, workItems, setWorkItems} = useContext(WorkPageContext);
    work_list = work_list.map(el => el.work);

    //capture active filters of type (either active tech filters, or active profession filters)
    const activeFilterOfType = (type) => type.filter((el) => filterList.includes(el.slug)); 
    const activeTechFilters = () => activeFilterOfType(technologies);
    const activeProfessionFilters = () => activeFilterOfType(professions);


    //check if a individual post has currently applied filters
    const postHasSelectedFiltersOfType = (type, filters) => {
        let filterType, activeFiltersOfType;

        switch(type) {
            case "tech":
                filterType = technologies;
                activeFiltersOfType = activeTechFilters();
                break;

            case "professions":
                filterType = professions;
                activeFiltersOfType = activeProfessionFilters();
                break;
        }
        //if there are no active filters supplied, then the post can be returned
        if(!hasGroupOfFilters(filterType)) {
            return true;
        } else {
            //else it must match the filters
            let hasMatch = false;
            for(var i = 0; i < activeFiltersOfType.length; i++) {
                for(var j = 0; j < filters.length; j++) {
                    if(activeFiltersOfType[i].slug === filters[j].slug) {
                        hasMatch = true;
                    }
                }
            }

            return hasMatch;
        }
    }
    //abstracted functions for checking if post contains active tech or active professions filters
    const postHasSelectedTechFilters = (filters) => postHasSelectedFiltersOfType("tech", filters);
    const postHasSelectedProfessionFilters = (filters) => postHasSelectedFiltersOfType("professions", filters);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if(initialLoad) {
            setInitialLoad(false);
        }
    }, [])

    //listen to changes for filters
    useEffect(() => {
        //if change, temp disable filtering
        setWorkItems({
            ...workItems,
            disabled: true,
            inTransit: true,
        });

        setTimeout(() => {
            let count = 0;
            const items = work_list.filter((el) => {
                if(filterList.length) {
                    let {professions, technologies} = el.acf;
                    professions = slugify_array(professions);
                    technologies = slugify_array(technologies);
    
                    if(postHasSelectedTechFilters(technologies) && postHasSelectedProfessionFilters(professions)) {
                        count++;
                        return el;
                    } 
                } else {
                    count++;
                    return el;
                }
            }); 
            
            //re enable
            setWorkItems({
                ...workItems,
                disabled: false,
                count: count,
                //items: shuffle(items), 
                items: items, 
                inTransit: false,
            });
        }, initialLoad ? 150 : 1100);
    }, [filterList]);

    return (
        <>
            {workItems.items.length ? (
                <>
                    {workItems.items.map((el, i) => <WorkLandingPost item={el} key={i}/>)}    
                </>
            ) : (
                <>
                    <p>No posts, please <span onClick={resetAllFilters}>reset the filters</span> and try again</p>
                </>
            )}
        </>
    )
}

export const WorkLandingPost = ({item, key}) => {
    const {post_name, post_title, acf } = item;
    const {main_technology, professions, thumbnail_image} = acf;

    console.log(thumbnail_image)

    const img = thumbnail_image !== null ? thumbnail_image.source_url : '';

    return (
        <div className={`work-post-wrap`} key={key}>
            <div className={`work-post work-post--${post_name} work-element triple-line-hover`}>
                <div className="work-post--wiper"></div>
                <AALink to={`/work/${post_name}`}>
                    <div className="work-post--featured-img" style={{backgroundImage: `url(${img}`}}></div>
                    <div className="work-post--detail">
                        <div className="name">
                            <h3>
                                <span className="outer-container">
                                    <span className="inner-container">
                                        {post_title}
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </span>
                            </h3>
                        </div>
                        <div className="meta">
                            <ul className="meta-list">
                                {main_technology && (
                                    <li>{main_technology}</li>
                                )}
                                
                                {professions.length && (
                                    <>
                                        {professions.map((el, i) => (
                                            <>
                                                ― <li key={i}>{el}</li>
                                            </>
                                        ))}
                                    </>
                                )}
                                <div className="hover-arrow">
                                    <img src={leftArrow}/>
                                </div>
                            </ul>
                        </div>
                    </div>
                </AALink>
            </div>
        </div>
    )
}