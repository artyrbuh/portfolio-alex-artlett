import React, { useState, createContext, useContext, useRef, useEffect }  from 'react';
import {graphql, StaticQuery} from 'gatsby';
import { ThemeDataContext } from '../components/layout';
import {WorkContainer, WorkBarNav, WorkLayout, WorkList} from '../components/ui/work';
import { FilterButtons, FilterWrap } from '../components/ui/filter';
import { as_obj } from '../core/util/helpers';
import {TweenLite} from "gsap";
import { PageTransition } from '../core/page-transition';
import SkewScrollContainer from '../components/ui/SkewScroll';
import { staggerItemsSkewUpDown } from '../core/animation';
import SEO from '../components/seo';
export const WorkPageContext = createContext(null);

const WorkPage = () => {
    const [filterList, setFiltersList] = useState([]);

    //check if a particular filter is active
    const isFilterActive = (filter) => filterList.includes(filter);

    //toggle on or off a particular filter
    const toggleFilters = (filter) => {
        if(workItems.initialClick !== true) {
          setWorkItems({...workItems, initialClick: true});
        }
        
        if(filterList.includes(filter)) {
          setFiltersList(filterList.filter(item => item !== filter));
        } else {
          setFiltersList(filterList => [...filterList, filter]);
        }
    };

    const [workItems, setWorkItems] = useState({
      items: [],
      disabled: false,
      count: 0,
      initialClick: false
    });

    //turn off particular array of filters
    const resetFilters = (filters) => {
      if(workItems.initialClick !== true) {
        setWorkItems({...workItems, initialClick: true});
      }

      const currFiltersFlattened = filters.map((a) => a.slug);
      const newFilterList = filterList.filter(el => !currFiltersFlattened.includes(el));

      setFiltersList(newFilterList);
    }

    const resetAllFilters = () => setFiltersList([]);

    //check if any of the selected array of filters have values
    const hasGroupOfFilters = (filters, filtersArray = filterList) => filters.some(i => filtersArray.includes(i.slug));

    return (
      <PageTransition>
        <WorkLayout>
            <SEO title="Work"/>
            <StaticQuery query={graphql`
                {
                    wordpressPage(slug: {eq: "work"}) {
                        title
                        wordpress_id
                        slug
                        content
                        acf {
                            back_to_work_cta_text
                            work_list {
                                work {
                                    wordpress_id
                                    acf {
                                        technologies
                                        professions
                                        main_technology
                                        thumbnail_image {
                                            source_url
                                            alt_text
                                            localFile{
                                              publicURL
                                            }
                                        }
                                    }
                                    post_title
                                    post_name
                                }
                            }
                        }
                    }
                }
            `}
            render={props => {
                const { back_to_work_cta_text, work_list } = props.wordpressPage.acf;

                return (
                  <WorkPageContext.Provider
                    value={
                      {isFilterActive, toggleFilters, resetFilters, hasGroupOfFilters, work_list, filterList, back_to_work_cta_text, resetAllFilters, workItems, setWorkItems}
                    }>
                    <WorkPageInner/>
                  </WorkPageContext.Provider>
                );
            }}
            />
        </WorkLayout>
      </PageTransition>
    );
}

export const WorkPageInner = ({children}) => {
  const themeData = useContext(ThemeDataContext);
  let { professions, technologies } = themeData.wordpressAcfOptions.options;
  technologies = technologies.map((a) => as_obj(a.technology));
  professions = professions.map((a) => as_obj(a.profession));
  let { filterList, workItems } = useContext(WorkPageContext);
  let wiperOne, wiperTwo, workList = useRef();
  let workLandingRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    if(workItems.initialClick === true) {
      TweenLite.to([wiperOne, wiperTwo], {
        css: {display: 'block'},
      });

      TweenLite.to([wiperOne, wiperTwo], {
        y: `-100%`,
        skewY: 6,
        duration: 0
      });

      TweenLite.to([wiperOne, wiperTwo], {
        y: `0%`,
        duration: .75,
        delay: 0.25,
        skewY: 0,
        transformOrigin: 'right top',
        ease: 'power3.easeInOut',
        stagger: {
          amount: 0.1
        }
      });

      TweenLite.to([wiperTwo, wiperOne], {
        y: `100%`,
        delay: 1,
        duration: .8, 
        skewY: -6,
        stagger: {
          amount: 0.2
        }
      });

      TweenLite.to([wiperOne], {
        y: `-100%`,
        css: {display: 'none'},
        duration: 0,
        delay: 2.5,
        skewY: 0,
      });
    }
  }, [filterList]);

  useEffect(() => {
    if(workItems.items.length > 0 && initialLoad) {
      TweenLite.to(workLandingRef, {
          duration: 0,
          css: {opacity: 1}
      });

      staggerItemsSkewUpDown(workLandingRef.children, 0, 800, 1.25, 1.25, 4, 0);
      
      setInitialLoad(false);
    }
  }, [workItems.items.length]);

  return (
    <>
      <WorkBarNav>
        <h2>
          selected work
          <span class="flourish-hover">
              {workItems.items.length} projects
              <span class="flourish-one aa-red--text">{workItems.items.length} projects</span>
          </span>
        </h2>

        <FilterWrap>
            <FilterButtons filters={technologies} animateOnLoad={true} />
            <FilterButtons filters={professions} animateOnLoad={true} />
        </FilterWrap>
      </WorkBarNav>

      <SkewScrollContainer>
        <div className={`container work-wrap work-landing`} ref={el => workLandingRef = el}>
          <WorkList animateOnLoad={true} ref={el => workList = el}/>
        </div>
      </SkewScrollContainer>

      <div className="work-landing--wipers">
        <div className="work-landing--wiper" ref={el => wiperOne = el}></div>
        <div className="work-landing--wiper" ref={el => wiperTwo = el}></div>
      </div>
    </>
  )
}

export default WorkPage;
