import React from "react"
import {graphql, StaticQuery, Link} from 'gatsby';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../assets/styles/index.scss"
import ContentBlock from "../components/ui/content-block";
import ExperienceList from "../components/ui/experience-list";

const IndexPage = () => (
  <StaticQuery query={graphql`
        {
          allWordpressPage(filter: {slug: {eq: "home"}}, limit: 1) {
            edges {
              node {
                content
                wordpress_id
                slug
                title
                acf {
                  header {
                    content
                    heading
                  }
                  selected_showcase {
                    heading
                    view_all_cta_text
                    showcase {
                      selected_work {
                        post_title
                        wordpress_id
                        acf {
                          thumbnail_image {
                            source_url
                          }
                          thumbnail_text {
                            text
                          }
                        }
                      }
                    }
                  }
                  about_block {
                    content
                    heading
                  }
                  experience_block {
                    experience_list {
                      company
                      description
                      end_year
                      start_year
                    }
                    heading
                  }
                  moving_text
                }
              }
            }
          }
        }
    `} render={props => {
        console.log(props);
        const {about_block, experience_block, header, moving_text, selected_showcase} = props.allWordpressPage.edges[0].node.acf;
        return (
          <Layout>
            <SEO title="Home" />
            <HomeHeader header={header} />
            <SelectedShowcase selected_showcase={selected_showcase} />
            <AboutSection about_block={about_block} />
            <ExperienceSection experience_block={experience_block} />
          </Layout>
          );
        }
        }/>
)

export const HomeHeader = ({header}) => {
  return (
    <section className="hero-header--home hero is-fullheight">
      <HeaderText />
      <div className="hero-body">
        <div className="container">
          <h1>{header.content}</h1>
        </div>
      </div>
    </section>
  );
}

export const HeaderText = () => (
  <svg 
    className="home-header-text"
    width="1179" 
    height="290" 
    viewBox="0 0 1179 290" 
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M211.9 290H134.9L125.8 199.7H87.3L78.9 290H0.5L63.5 -242L151.7 -242L211.9 290ZM118.8 133.2L105.5 3.69999L93.6 133.2H118.8ZM422.622 290L229.422 290L229.422 -242H314.822L314.822 204.6L422.622 204.6V290ZM633.196 290H439.996L439.996 -242L633.196 -242V-160.1L525.396 -160.1V-15.2H593.296L593.296 63.2H525.396V208.1H633.196V290ZM900.126 290H811.926L776.226 166.1L744.026 290H660.026L736.326 20.5L654.426 -242H742.626L776.226 -132.8L811.226 -242L894.526 -242L814.026 19.8L900.126 290ZM1265.45 290H1188.45L1179.35 199.7H1140.85L1132.45 290H1054.05L1117.05 -242L1205.25 -242L1265.45 290ZM1172.35 133.2L1159.05 3.69999L1147.15 133.2H1172.35ZM1427.18 289.3C1420.18 277.167 1416.68 258.733 1416.68 234V95.4C1416.68 64.6 1407.58 49.2 1389.38 49.2H1368.38V290H1282.98V-242H1408.28C1433.01 -242 1454.24 -233.133 1471.98 -215.4C1490.18 -198.133 1499.28 -176.433 1499.28 -150.3V-39C1499.28 -15.2 1489.71 5.79998 1470.58 24C1491.58 38.4667 1502.08 64.1333 1502.08 101V233.3C1502.08 258.967 1505.58 277.867 1512.58 290L1427.18 289.3ZM1413.88 -131.4C1413.88 -152.867 1405.01 -163.6 1387.28 -163.6H1368.38V-32.7H1390.08C1405.94 -32.7 1413.88 -43.2 1413.88 -64.2V-131.4ZM1716.1 -160.8L1651 -160.8V290H1565.6V-160.8H1500.5V-242L1716.1 -242V-160.8ZM1926.72 290L1733.52 290V-242H1818.92V204.6H1926.72V290ZM2137.29 290H1944.09V-242L2137.29 -242V-160.1H2029.49V-15.2H2097.39V63.2H2029.49V208.1H2137.29V290ZM2364.91 -160.8H2299.81V290H2214.41V-160.8L2149.31 -160.8V-242L2364.91 -242V-160.8ZM2573.43 -160.8L2508.33 -160.8V290L2422.93 290V-160.8L2357.83 -160.8V-242H2573.43V-160.8Z" fill="#EC2A2A"/>
  </svg>
);

export const SelectedShowcase = ({selected_showcase}) => (
  <>
    {selected_showcase.showcase.length ? (
      <>
        <div className="container selected-showcase--heading-wrap">
          <div className="columns ">
            <div className="column">
              <p>{selected_showcase.heading}</p>
            </div>
            <div className="column has-text-right">
              <Link to={`/work`}>View All</Link>
            </div>
          </div>
        </div>
        <div className="container selected-showcase--wrap">
          <div className="columns">
            <div className="column is-full">
              <div>
                and is farmor good
              </div>
            </div>
            <div className="column is-half">
              <div>
                and is farmor good
              </div>
            </div>
            <div className="column is-full">
              <div>
                and is farmor good
              </div>
            </div>
            <div className="column is-half">
              <div>
                and is farmor good
              </div>
            </div>
            <div className="column is-full">
              <div>
                and is farmor good
              </div>
            </div>
          </div>        
        </div>
      </>
    ) : (
      <>
        Add Items
      </>
    )}
  </>
);

export const AboutSection = ({about_block}) => {
  const {heading, content} = about_block;
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          {/*<Image stye/>*/}
        </div>
        <div className="column">
          <ContentBlock heading={heading} content={content}/>
        </div>
      </div>
    </div>
  );
}

export const ExperienceSection = ({experience_block}) => {
  const {heading, experience_list} = experience_block;

  return (
    <div className="container">
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <ContentBlock heading={heading}>
              <ExperienceList experience_list={experience_list} />
          </ContentBlock>
        </div>
      </div>
    </div>
  );
}

export default IndexPage
