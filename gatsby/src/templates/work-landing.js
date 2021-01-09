import React, { useState, createContext, useContext }  from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';
import { ThemeDataContext } from '../components/layout';
import {WorkContainer, WorkBarNav, WorkLayout} from '../components/ui/work';
import { FilterButtons, FilterWrap } from '../components/ui/filter';
import {as_slug} from '../core/util/helpers';

export const WorkPageContext = createContext(null);

const WorkPage = () => {
    const [filterList, setFiltersList] = useState([]);

    //check if a particular filter is active
    const isFilterActive = (filter) => filterList.includes(filter);

    //toggle on or off a particular filter
    const toggleFilters = (filter) => {
        if(filterList.includes(filter)) {
          setFiltersList(filterList.filter(item => item !== filter));
        } else {
          setFiltersList(filterList => [...filterList, filter]);
        }
    };

    //turn off particular array of filters
    const resetFilters = (filters) => {
      const currFiltersFlattened = filters.map((a) => a.slug);
      const newFilterList = filterList.filter(el => !currFiltersFlattened.includes(el));

     setFiltersList(newFilterList);
    }

    //check if any of the selected array of filters have values
    const filtersAreNotEmpty = (filters) => filters.some(i => filterList.includes(i.slug));

    return (
        <WorkLayout>
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
                                        }
                                    }
                                    post_title
                                }
                            }
                        }
                    }
                }
            `}
            render={props => {
                console.log(props);
                return (
                  <WorkPageContext.Provider value={{isFilterActive, toggleFilters, resetFilters, filtersAreNotEmpty}}>
                    <WorkPageInner/>
                  </WorkPageContext.Provider>
                );
            }}
            />
        </WorkLayout>
    );
}

export const WorkPageInner = ({children}) => {
  const themeData = useContext(ThemeDataContext);

  let { professions, technologies } = themeData.wordpressAcfOptions.options;

  const asObj = (name) => {
    return {
      name: name,
      slug: as_slug(name),
    }
  }

  technologies = technologies.map((a) => asObj(a.technology));
  professions = professions.map((a) => asObj(a.profession));

  return (
    <>
      {children && children}
      <WorkBarNav>
        <h2>selected work</h2>
        <FilterWrap>
          <FilterButtons filters={technologies} />
          <FilterButtons filters={professions} />
        </FilterWrap>
      </WorkBarNav>
      <WorkContainer>
          enter content here
      </WorkContainer>
    </>
  )
}

export default WorkPage;
