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
                            text {
                              source_url
                            }
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
            {selected_showcase.showcase.map((el, i) => <ShowcaseItem key={i} item={el.selected_work}/>)}
            <div className="column is-half selected-showcase--cta">
              <ViewAllWorkCTA/>
            </div>
            <div className="column is-quarter "></div>
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

export const ShowcaseItem = ({item}) => {
  const {thumbnail_image, thumbnail_text} = item.acf;
  const colSize = thumbnail_text.length >= 3 ? 'is-full' : 'is-half';
  return (
    <div className={`column ${colSize}`}>
      <div>
        {thumbnail_text.length && (
          <div className="thumbnail-text-wrap">
            {thumbnail_text.map((el, i) => (
              <img 
                src={el.text.source_url} 
                className="thumbnail-text"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const ViewAllWorkCTA = () => {
  return (
    <div className="showcase-cta">
      <Link to={`/work`}>
        <div className="showcase-cta__arrow"></div>
        <svg width="354" height="527" viewBox="0 0 354 527" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.2106 161L0.60194 0.932529L23.0114 0.932529L33.4158 85.5682L36.8172 141.792H41.2191L44.6205 85.5682L55.0249 0.932529L77.4343 0.932529L57.0257 161H21.2106ZM82.5881 161L82.5881 0.932529L104.397 0.932529L104.397 161L82.5881 161ZM114.836 161L114.836 0.932529L172.06 0.932529V20.1406L136.645 20.1406V70.3618H170.059L170.059 89.5699H136.645V141.792H172.06V161H114.836ZM187.942 161L174.736 0.932529L196.545 0.932529L200.947 67.5606L204.549 141.792H209.151L211.552 67.5606L221.956 1.93295L251.369 1.93295L261.773 67.5606L264.174 141.792H268.576L272.377 67.5606L276.779 0.932529L298.588 0.932529L285.383 161L248.968 161L242.965 112.38L238.763 20.3407H234.562L230.36 112.38L224.357 161H187.942ZM0.60194 343L20.2102 182.933H56.2254L75.8337 343H53.8244L50.0228 302.983H26.6129L22.8113 343H0.60194ZM28.6137 283.975H47.8218L44.4204 248.76L41.019 202.141H35.4166L32.0152 248.76L28.6137 283.975ZM78.2894 343L78.2894 182.933L100.099 182.933L100.099 323.792H135.714V343H78.2894ZM139.065 343L139.065 182.933H160.874L160.874 323.792L196.489 323.792V343L139.065 343ZM14.4078 525L1.20219 364.933H23.0114L27.4132 431.561L31.0148 505.792H35.6167L38.0177 431.561L48.4221 365.933H77.8345L88.2389 431.561L90.6399 505.792H95.0418L98.8433 431.561L103.245 364.933H125.054L111.849 525H75.4335L69.431 476.38L65.2292 384.341H61.0274L56.8256 476.38L50.8231 525H14.4078ZM163.321 526.601C151.315 526.601 142.645 524.066 137.31 518.997C132.107 513.929 129.373 505.458 129.106 493.587C128.439 461.173 128.439 428.693 129.106 396.146C129.373 384.407 132.107 376.004 137.31 370.935C142.645 365.866 151.315 363.332 163.321 363.332C175.326 363.332 183.929 365.866 189.131 370.935C194.334 376.004 197.135 384.407 197.535 396.146C198.335 428.826 198.335 461.306 197.535 493.587C197.135 505.458 194.334 513.929 189.131 518.997C183.929 524.066 175.326 526.601 163.321 526.601ZM163.321 508.793C171.457 508.793 175.659 504.992 175.926 497.388C176.326 486.317 176.526 474.779 176.526 462.774C176.659 450.769 176.659 438.764 176.526 426.759C176.393 414.754 176.193 403.282 175.926 392.344C175.659 384.874 171.457 381.139 163.321 381.139C155.05 381.139 150.849 384.874 150.715 392.344C150.315 403.282 150.048 414.754 149.915 426.759C149.781 438.764 149.781 450.769 149.915 462.774C150.048 474.779 150.315 486.317 150.715 497.388C150.849 504.992 155.05 508.793 163.321 508.793ZM205.89 525L205.89 364.933H237.503C249.375 364.933 257.979 367.467 263.314 372.536C268.783 377.605 271.718 385.875 272.118 397.346C272.385 404.683 272.518 411.152 272.518 416.754C272.518 422.357 272.385 428.426 272.118 434.962C271.584 449.902 266.649 459.506 257.312 463.774L274.719 525H251.709L236.903 467.376H227.699V525H205.89ZM227.699 448.168H237.303C245.707 448.168 250.109 444.166 250.509 436.163C251.176 422.824 251.176 409.551 250.509 396.346C250.109 388.209 245.773 384.141 237.503 384.141H227.699L227.699 448.168ZM280.148 525L280.148 364.933H303.158L302.957 401.148L299.356 441.565H303.558L314.762 401.548L327.568 364.933H351.178L325.967 433.762L353.179 525L330.969 525L311.761 458.172L302.357 480.781L302.357 525H280.148Z" fill="#EC2A2A"/>
        </svg>
      </Link>
    </div>
  );
}

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
