import React from 'react';
import Layout from '../components/layout'
import {graphql, StaticQuery, Link} from 'gatsby';

export default ({pageContext}) => {
    console.log(pageContext);
    const {content, id, slug, status, template, title, wordpress_id} = pageContext;
    return (
        <Layout>
            <div>
                <h1 dangerouslySetInnerHTML={{__html: pageContext.title}}/>
                <div dangerouslySetInnerHTML={{__html: pageContext.content}} />
                this is the work landing page bruh
            </div>
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
                    <div>the</div>
                );
            }}
            />
        </Layout>
    );
}


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