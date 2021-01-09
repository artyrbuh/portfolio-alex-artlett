import React, { useState, createContext, useContext }  from 'react';
import Layout from '../components/layout'
import {graphql, StaticQuery, Link} from 'gatsby';
import WorkBarNav from '../components/ui/work-nav-bar';
import WorkContainer from '../components/ui/work-container';

export const WorkPageContext = createContext(null);

const WorkPage = ({pageContext}) => {
    console.log(pageContext);
    const {content, id, slug, status, template, title, wordpress_id} = pageContext;

    const [activeTech, setActiveTech] = useState([]);
    const [activeProfession, setActiveProfession] = useState([]);

    const toggleFilters = (filter, arr) => {
        let filterSet, setFilterSet;

        switch(arr) {
            case "tech":
                filterSet = activeTech;
                setFilterSet = setActiveTech;
            case "profession":
                filterSet = activeProfession;
                setFilterSet = setActiveProfession;
        }

        if(filterSet.includes(filter)) {
            setFilterSet(filterSet.filter(item => item !== filter));
        } else {
            setFilterSet(filterSet => [...filterSet, filter]);
        }
    };


    return (
        <Layout classes="work-layout">
            {/*<div>
                <h1 dangerouslySetInnerHTML={{__html: pageContext.title}}/>
                <div dangerouslySetInnerHTML={{__html: pageContext.content}} />
            </div>*/}
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
                  <WorkPageContext.Provider value={{activeTech, activeProfession, toggleFilters}}>
                    <WorkBarNav>
                      <h2>selected work</h2>
                    </WorkBarNav>
                    <WorkContainer>
                      you take mgself control
                    </WorkContainer>
                    
                  </WorkPageContext.Provider>
                );
            }}
            />
        </Layout>
    );
}

export default WorkPage;


/*
{
  wordpressPage(wordpress_id: {eq: 11}) {
    title
    wordpress_id
    slug
    content
    acf {
      back_to_work_cta_text
      work_list {
        work {
          wordpress_id
        }
      }
    }
  }
}
*/

/*
query MyQuery {
  wordpressWpWork(wordpress_id: {eq: 75}) {
    technology {
      name
    }
    profession {
      name
    }
    title
    acf {
      thumbnail_image {
        source_url
      }
    }
  }
}
*/