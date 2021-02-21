import React, {useEffect, useState, useRef} from "react"
import {graphql, StaticQuery} from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../assets/styles/index.scss"
import ContentBlock from "../components/ui/content-block";
import ExperienceList, { ExperienceWrapper, ExperienceModalWithContext } from "../components/ui/experience-list";
import { textAsSpans } from "../core/util/helpers";
import { PageTransition, AALink } from "../core/page-transition";
import { fadeUpFrom } from "../core/animation";
import { TweenLite } from "gsap";
import SkewScrollContainer from "../components/ui/SkewScroll";

const IndexPage = () => (
  <PageTransition>
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
                          post_name
                          wordpress_id
                          acf {
                            thumbnail_image {
                              source_url
                              localFile {
                                publicURL
                              }
                            }
                            thumbnail_text {
                              text {
                                source_url
                                localFile {
                                  publicURL
                                }
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
                        contract
                        position
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
          const {about_block, experience_block, header, moving_text, selected_showcase} = props.allWordpressPage.edges[0].node.acf;
          
          return (
              <Layout>
                <SEO title="Home" />
                <ExperienceWrapper>
                  <SkewScrollContainer>
                    <HomeHeader header={header}/>
                    <SelectedShowcase selected_showcase={selected_showcase} />
                    <AboutSection about_block={about_block} />
                    <ExperienceSection experience_block={experience_block} />
                    <MovingText />
                  </SkewScrollContainer>
                  <ExperienceModalWithContext/>
                </ExperienceWrapper>
              </Layout>
            );
          }
          }/>
    </PageTransition>
)

export const HomeHeader = ({header}) => {
  const [initialLoad, setInitialLoad] = useState(true);
  let hero, h1, hugeText = useRef(null);

  const getH1Pieces = () => {
    let pieces = [];
    for(var i = 0; i < h1.children.length; i++) {
      pieces.push(h1.children[i].children[0]);
    }

    return pieces;
  }

  useEffect(() => {
    if(initialLoad) {
      //set visible
      TweenLite.to(hero, {
        delay: 1,
        duration: 0,
        css: {visibility: 'visible'}
      });

      TweenLite.from(getH1Pieces(), {
        y: `190%`,
        delay: 1.35,
        skewY: 7,
        duration: .5,
        stagger: {
          amount: .3
        }
      });

      TweenLite.from(hugeText, {
        delay: .9,
        css: {display: 'block'}
      });

      TweenLite.from(hugeText, {
        delay: .95,
        skewY: 7,
        duration: .6,
        y: `-400px`
      })

      setInitialLoad(false);      
    }
  }, []);

  return (
    <section className="hero-header--home hero is-fullheight" ref={el => hero = el}>
      <div ref={el => hugeText = el}>
        <svg 
          className="home-header-text"
          width="1179" 
          height="290" 
          viewBox="0 0 1179 290" 
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M211.9 290H134.9L125.8 199.7H87.3L78.9 290H0.5L63.5 -242L151.7 -242L211.9 290ZM118.8 133.2L105.5 3.69999L93.6 133.2H118.8ZM422.622 290L229.422 290L229.422 -242H314.822L314.822 204.6L422.622 204.6V290ZM633.196 290H439.996L439.996 -242L633.196 -242V-160.1L525.396 -160.1V-15.2H593.296L593.296 63.2H525.396V208.1H633.196V290ZM900.126 290H811.926L776.226 166.1L744.026 290H660.026L736.326 20.5L654.426 -242H742.626L776.226 -132.8L811.226 -242L894.526 -242L814.026 19.8L900.126 290ZM1265.45 290H1188.45L1179.35 199.7H1140.85L1132.45 290H1054.05L1117.05 -242L1205.25 -242L1265.45 290ZM1172.35 133.2L1159.05 3.69999L1147.15 133.2H1172.35ZM1427.18 289.3C1420.18 277.167 1416.68 258.733 1416.68 234V95.4C1416.68 64.6 1407.58 49.2 1389.38 49.2H1368.38V290H1282.98V-242H1408.28C1433.01 -242 1454.24 -233.133 1471.98 -215.4C1490.18 -198.133 1499.28 -176.433 1499.28 -150.3V-39C1499.28 -15.2 1489.71 5.79998 1470.58 24C1491.58 38.4667 1502.08 64.1333 1502.08 101V233.3C1502.08 258.967 1505.58 277.867 1512.58 290L1427.18 289.3ZM1413.88 -131.4C1413.88 -152.867 1405.01 -163.6 1387.28 -163.6H1368.38V-32.7H1390.08C1405.94 -32.7 1413.88 -43.2 1413.88 -64.2V-131.4ZM1716.1 -160.8L1651 -160.8V290H1565.6V-160.8H1500.5V-242L1716.1 -242V-160.8ZM1926.72 290L1733.52 290V-242H1818.92V204.6H1926.72V290ZM2137.29 290H1944.09V-242L2137.29 -242V-160.1H2029.49V-15.2H2097.39V63.2H2029.49V208.1H2137.29V290ZM2364.91 -160.8H2299.81V290H2214.41V-160.8L2149.31 -160.8V-242L2364.91 -242V-160.8ZM2573.43 -160.8L2508.33 -160.8V290L2422.93 290V-160.8L2357.83 -160.8V-242H2573.43V-160.8Z" fill="#EC2A2A"/>
        </svg>
      </div>
      <div className="hero-body">
        <div className="container">
          <h1 dangerouslySetInnerHTML={{__html: header.content}} ref={el => h1 = el}/>
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

export const SelectedShowcase = ({selected_showcase}) => {
  const [initialLoad, setInitialLoad] = useState(true);
  let showcase = useRef(null);

  useEffect(() => {
    if(initialLoad) {
      fadeUpFrom(showcase, 2.25);
      setInitialLoad(false);      
    }
  }, []);
  
  return (
    <div ref={el => showcase = el}>
      {selected_showcase.showcase.length ? (
        <>
          <div className="container selected-showcase--heading-wrap">
            <div className="columns ">
              <div className="column">
                <p>{selected_showcase.heading}</p>
              </div>
              <div className="column has-text-right">
                <AALink to={`/work`} className="hoverable-cta--wrap">
                  <span className="hoverable-cta">
                    <span className="hoverable--text">{textAsSpans("View All")}</span>
                    <span className="hoverable--text">{textAsSpans("View All")}</span>
                  </span>
                </AALink>
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
    </div>
  );
};

export const ShowcaseItem = ({item, key}) => {
  const {post_name} = item;
  const {thumbnail_image, thumbnail_text} = item.acf;
  const colSize = thumbnail_text.length >= 3 ? 'is-full' : 'is-half';

  return (
    <div className={`column ${colSize} work-element work-post--${post_name}`} key={key}>
      <AALink to={`/work/${item.post_name}`}>
        <div className="showcase-inner">
          <div className="bg-image" style={{backgroundImage: `url(${thumbnail_image.localFile.publicURL})`}}></div>
          <div className="thumbnail-texts">
            {thumbnail_text.length && (
              <div className="thumbnail-text-wrap">
                {thumbnail_text.map((el) => (
                  <div className="thumbnail-text">
                    <img 
                      src={el.text.localFile.publicURL} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AALink>
    </div>
  );
}

export const ViewAllWorkCTA = () => {
  return (
    <div className="showcase-cta">
      <AALink to={`/work`}>
        <div className="circle"></div>
        <div className="showcase-cta__arrow black-arrow"></div>

        <svg className="hover-text" width="298" height="520" viewBox="0 0 298 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.2182 0.935895L33.0152 63.7624L26.0122 0.935895L0.00126515 0.935895L17.4086 153H41.2186L61.6272 0.935895L40.2182 0.935895ZM91.0178 0.935895L66.6075 0.935895L66.6075 153L91.0178 153L91.0178 0.935895ZM158.182 129.59H127.369V88.1727L146.777 88.1727L146.777 65.7632L127.369 65.7632V24.3458L158.182 24.3458V0.935895L102.959 0.935895L102.959 153H158.182V129.59ZM227.206 0.935895L222.204 56.3593L217.202 0.935895L198.995 0.935895L191.992 56.3593L188.19 0.935895L163.179 0.935895L174.184 153H197.994L205.197 107.581L211.8 153H235.61L251.016 0.935895L227.206 0.935895ZM43.2195 182.936H18.0089L0.00126515 335H22.4107L24.8117 309.189H35.8164L38.4175 335H60.4267L43.2195 182.936ZM26.6125 290.181L30.0139 253.166L33.8155 290.181H26.6125ZM120.658 310.59H89.8454L89.8454 182.936L65.4351 182.936L65.4351 335H120.658V310.59ZM180.848 310.59L150.035 310.59L150.035 182.936H125.625L125.625 335L180.848 335V310.59ZM64.0283 364.936L59.0261 420.359L54.024 364.936H35.8164L28.8134 420.359L25.0118 364.936H0.00126515L11.0059 517H34.8159L42.019 471.581L48.6218 517H72.4318L87.8383 364.936H64.0283ZM151.615 393.348C151.615 383.944 148.414 376.541 142.211 370.938C136.609 365.936 129.606 363.335 121.402 363.135C112.799 362.935 105.596 365.336 99.7933 370.338C93.1905 375.941 89.7891 383.544 89.7891 393.348L89.7891 488.588C89.7891 498.192 92.9905 505.795 99.3932 511.598C105.196 516.6 112.399 519.201 120.602 519.201C129.006 519.201 136.009 516.6 141.811 511.598C148.414 505.795 151.615 498.192 151.615 488.588L151.615 393.348ZM126.405 490.589C126.405 494.39 124.404 496.391 120.602 496.391C116.801 496.391 114.8 494.39 114.8 490.589L114.8 391.547C114.8 387.746 116.801 385.945 120.602 385.945C124.404 385.945 126.405 387.746 126.405 391.547L126.405 490.589ZM226.228 517C224.227 513.599 223.227 508.196 223.227 500.793V462.977C223.227 452.373 220.225 445.17 214.223 440.968C219.625 435.766 222.426 429.763 222.426 422.96V391.147C222.426 383.744 219.825 377.541 214.623 372.539C209.621 367.537 203.418 364.936 196.415 364.936L160.6 364.936L160.6 517H185.01V448.171H191.013C196.215 448.171 198.816 452.573 198.816 461.377V500.993C198.816 508.196 199.817 513.398 201.818 516.8L226.228 517ZM198.016 415.757C198.016 421.76 195.815 424.761 191.213 424.761H185.01V387.345H190.413C195.015 387.345 198.016 391.747 198.016 396.549V415.757ZM272.763 364.936L255.556 411.956V364.936H231.146L231.146 517H255.556V475.182L260.158 463.778L269.562 517H294.172L276.765 419.759L297.173 364.936H272.763Z" fill="#000"/>
        </svg>
        <svg width="298" height="520" viewBox="0 0 298 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.2182 0.935895L33.0152 63.7624L26.0122 0.935895L0.00126515 0.935895L17.4086 153H41.2186L61.6272 0.935895L40.2182 0.935895ZM91.0178 0.935895L66.6075 0.935895L66.6075 153L91.0178 153L91.0178 0.935895ZM158.182 129.59H127.369V88.1727L146.777 88.1727L146.777 65.7632L127.369 65.7632V24.3458L158.182 24.3458V0.935895L102.959 0.935895L102.959 153H158.182V129.59ZM227.206 0.935895L222.204 56.3593L217.202 0.935895L198.995 0.935895L191.992 56.3593L188.19 0.935895L163.179 0.935895L174.184 153H197.994L205.197 107.581L211.8 153H235.61L251.016 0.935895L227.206 0.935895ZM43.2195 182.936H18.0089L0.00126515 335H22.4107L24.8117 309.189H35.8164L38.4175 335H60.4267L43.2195 182.936ZM26.6125 290.181L30.0139 253.166L33.8155 290.181H26.6125ZM120.658 310.59H89.8454L89.8454 182.936L65.4351 182.936L65.4351 335H120.658V310.59ZM180.848 310.59L150.035 310.59L150.035 182.936H125.625L125.625 335L180.848 335V310.59ZM64.0283 364.936L59.0261 420.359L54.024 364.936H35.8164L28.8134 420.359L25.0118 364.936H0.00126515L11.0059 517H34.8159L42.019 471.581L48.6218 517H72.4318L87.8383 364.936H64.0283ZM151.615 393.348C151.615 383.944 148.414 376.541 142.211 370.938C136.609 365.936 129.606 363.335 121.402 363.135C112.799 362.935 105.596 365.336 99.7933 370.338C93.1905 375.941 89.7891 383.544 89.7891 393.348L89.7891 488.588C89.7891 498.192 92.9905 505.795 99.3932 511.598C105.196 516.6 112.399 519.201 120.602 519.201C129.006 519.201 136.009 516.6 141.811 511.598C148.414 505.795 151.615 498.192 151.615 488.588L151.615 393.348ZM126.405 490.589C126.405 494.39 124.404 496.391 120.602 496.391C116.801 496.391 114.8 494.39 114.8 490.589L114.8 391.547C114.8 387.746 116.801 385.945 120.602 385.945C124.404 385.945 126.405 387.746 126.405 391.547L126.405 490.589ZM226.228 517C224.227 513.599 223.227 508.196 223.227 500.793V462.977C223.227 452.373 220.225 445.17 214.223 440.968C219.625 435.766 222.426 429.763 222.426 422.96V391.147C222.426 383.744 219.825 377.541 214.623 372.539C209.621 367.537 203.418 364.936 196.415 364.936L160.6 364.936L160.6 517H185.01V448.171H191.013C196.215 448.171 198.816 452.573 198.816 461.377V500.993C198.816 508.196 199.817 513.398 201.818 516.8L226.228 517ZM198.016 415.757C198.016 421.76 195.815 424.761 191.213 424.761H185.01V387.345H190.413C195.015 387.345 198.016 391.747 198.016 396.549V415.757ZM272.763 364.936L255.556 411.956V364.936H231.146L231.146 517H255.556V475.182L260.158 463.778L269.562 517H294.172L276.765 419.759L297.173 364.936H272.763Z" fill="#EC2A2A"/>
        </svg>
      </AALink>
    </div>
  );
}

export const AboutSection = ({about_block}) => {
  const {heading, content} = about_block;
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
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

export const MovingText = () => {
  const [x, setX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const inc = 4;

  const onScroll = () => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollingDown = scrollY > prevY;
    const scrollingUp = scrollY < prevY;

    scrollingDown && setX(x => x = x + inc);
    scrollingUp && setX(x => x = x - inc);
    setPrevY(window.scrollY);
  }

  useEffect(() => {
    if(typeof window !== 'undefined') {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      if(typeof window !== 'undefined') {
        window.removeEventListener("scroll", onScroll);
      } 
    }
  })

  return (
    <div className="moving-text" style={{backgroundPositionX: x}}></div>
  );
}

export default IndexPage
