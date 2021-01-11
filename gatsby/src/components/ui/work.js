import React, {useContext} from "react";
import Layout from "../layout";
import {WorkPageContext} from "../../templates/work-landing";
import { ThemeDataContext } from '../../components/layout';
import {slugify_array, as_obj} from "../../core/util/helpers";

export const WorkContainer = ({children, classes}) => {
    return (
        <div className={`container work-wrap ${classes ? classes : ''}`}>
            {children && children}
        </div>
    )
}

export const WorkBarNav = ({children}) => {
    return (
        <div className="work-nav-bar">
            {children && children}
        </div>
    );
}

export const WorkLayout = ({children}) => {
    return (
        <Layout classes="work-layout">
            {children && children}
        </Layout>
    );
}

export const WorkList = ({}) => {
    const themeData = useContext(ThemeDataContext);

    //capture the proffession and technology filters, convert them into an object with name and slug
    let { professions, technologies } = themeData.wordpressAcfOptions.options;  
    technologies = technologies.map((a) => as_obj(a.technology));
    professions = professions.map((a) => as_obj(a.profession));
    
    //capture work list and filters and functions from page context
    let {work_list, filterList, hasGroupOfFilters, resetAllFilters} = useContext(WorkPageContext);
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
    let postCount = 0;

    return (
        <>
            {work_list.map((el, i) => {
                if(filterList.length) {
                    let {professions, technologies} = el.acf;
                    professions = slugify_array(professions);
                    technologies = slugify_array(technologies);

                    if(postHasSelectedTechFilters(technologies) && postHasSelectedProfessionFilters(professions)) {
                        postCount++;

                        return(
                            <>
                                <WorkLandingPost item={el} key={i}/>
                            </>
                        );
                    } 
                } else {
                    postCount++;

                    return (   
                        <>
                            <WorkLandingPost item={el} key={i}/>
                        </>
                    );
                }
            })}

            {postCount === 0 && (
                <>
                    <p>No posts, please <span onClick={resetAllFilters}>reset the filters</span> and try again</p>
                </>
            )} 
        </>
    )
}

export const WorkLandingPost = ({item}) => {
    return (
        <div className={`work-post-wrap`}>
            <div className={`work-post work-post--${item.post_name}`}>
                <div className="work-post--featured-img">

                </div>
                {item.post_title}
            </div>
        </div>
    )
}