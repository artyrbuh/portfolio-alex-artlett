import React, {createContext, useContext, useState, useEffect, useRef} from 'react';
import { WorkBarNav, WorkContainer, WorkLayout } from '../components/ui/work';
import AAImage from '../components/ui/image';
import fitty from "fitty";
import AAButton from '../components/ui/button';
import HireMe from '../components/ui/hire-me-cta';
import Modal from '../components/ui/modal';
import Close from '../components/ui/close';
import ReactPlayer from 'react-player';
import leftArrow from '../assets/images/left-arrow.svg'
import { AALink, PageTransition } from '../core/page-transition';
import gsap from "gsap";
import { fadeUpFrom } from '../core/animation';
import SEO from '../components/seo';


const WorkSingleContext = createContext(null);

export default ({pageContext}) => {
    const {previous, next} = pageContext;
    const {acf, featured_media, slug, title} = pageContext.content;
    const {layouts_work, main_technology, professions, technologies, project_year, project_website} = acf;

    const animationDelay = featured_media ? 1 : .250;

    return (
        <PageTransition>
            <WorkSingleContext.Provider value={{featured_media, slug, title, layouts_work, main_technology, professions, technologies, project_year, previous, next, project_website, animationDelay}}>
                <SEO title={title}/>
                <VideoWrapper>
                    <WorkLayout classes={`work-single work-single--${slug}`}>
                        <WorkBarNav>
                            <AALink to={`/work`} className="back-cta triple-line-hover">
                                <span className="arrow-wrap">
                                    <svg width="32" height="32" 
                                        viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/><path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                                    </svg>
                                    <svg width="32" height="32" 
                                        viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/><path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                                    </svg>
                                </span>
                                <h4>
                                    <span className="outer-container">
                                        <span className="inner-container">
                                            Back to my Selected work
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </span>
                                    </span>
                                </h4>
                            </AALink>
                        </WorkBarNav>
                        <WorkContainer>
                            <WorkHeader/>
                            <WorkLayouts/>
                            <WorkFooterNav/>
                        </WorkContainer>
                    </WorkLayout>
                    <VideoModal/>
                </VideoWrapper>
            </WorkSingleContext.Provider>
        </PageTransition>
    )
}

const WorkHeader = () =>  {
    const { title, featured_media, project_year, professions, technologies, project_website, animationDelay } = useContext(WorkSingleContext);
    let containerRef, wiper, featuredImage, projectMeta, h1 = useRef();
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        fitty(h1.current, {
            multiLine: false,
            minSize: 10
        });
    }, []);

    useEffect(() => {
        if(initialLoad) {
            gsap.to(containerRef, {
                delay: 0.5,
                duration: 0,
                css: {opacity: 1}
            });

            gsap.to(wiper, {
                delay: animationDelay + 0.3,
                x: `100%`,
                duration: 1,
            });

            gsap.from(h1.current, {
                delay: animationDelay + 0.3,
                skewY: 7,
                duration: .85,
                y: `-400px`
            });

            gsap.from(featuredImage, {
                delay: animationDelay + 0.3,
                scale: 1.5,
                duration: 1,
            });

            gsap.from(h1.current, {
                delay: animationDelay + 0.4,
                css: {display: 'block'}
            });
        
            fadeUpFrom(projectMeta, animationDelay + 1);

            setInitialLoad(false);
        }
    }, []);

    return (
        <div className="work-single--header" ref={el => containerRef = el}>
                {featured_media ? (
                    <div className="work-single-header--inner">
                        <h1 
                            ref={h1}
                            dangerouslySetInnerHTML={{__html: title}}
                        />
                        <div className="featured-image--wrap">
                            <div className="wiper" ref={el=> wiper = el}></div>
                            <img 
                                src={featured_media.localFile.publicURL} 
                                className="featured-image"
                                alt={`${title} feature`}
                                ref={el => featuredImage = el}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="header--no-image">
                        <h1 
                            ref={h1}
                            dangerouslySetInnerHTML={{__html: title}}
                        />
                    </div>
                )}
                
            <div ref={el => projectMeta = el}>
                {project_website ? (
                    <a href={project_website} target="_blank" rel="noreferrer">
                        <h4>
                            <span className="">
                                <span className="inner-container">
                                    {title} ― {project_year}
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>

                                <img 
                                    src={leftArrow}
                                    alt={`Back Arrow`}
                                />
                            </span>
                        </h4>
                    </a>
                ) : (
                    <h4>
                        <span className="">
                            <span className="inner-container">
                                {title} ― {project_year}
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>

                            <img 
                                src={leftArrow}
                                alt={`Back Arrow`}
                            />
                        </span>
                    </h4>
                )}

                <p className="project-meta">
                    <InlineList list={professions}/>
                    <br/>
                    <InlineList list={technologies}/> 
                </p>
            </div>
        </div>
    )
};

const InlineList = ({list}) => (
    <>
        {list.map((el, i) => (
            <span key={i}>
                {(i === (list.length - 1) && list.length > 1) && ' & '}
                {el}
                {i === (list.length - 1) || i === (list.length - 2) ? '' : ', '}
            </span>
        ))} 
    </>
)

const WorkLayouts = () => {
    const { layouts_work, animationDelay } = useContext(WorkSingleContext);

    const [initialLoad, setInitialLoad] = useState(true);
    let workLayoutsBlock = useRef(null);

    useEffect(() => {
        if(initialLoad) {
            if(layouts_work && layouts_work.length) {
                fadeUpFrom(workLayoutsBlock, animationDelay + 1.25);
            }
            setInitialLoad(false);
        }
    }, []);

    if(layouts_work && layouts_work.length) {
        return (
            <div ref={el => workLayoutsBlock = el}>
                {layouts_work.map((el, i) => {
                    switch(true) {
                        case el.id.includes("content_block"):
                            return <WorkContentBlock data={el} i={i} key={i}/>
                        
                        case el.id.includes("images_block"):
                            return <WorkImagesBlock data={el} i={i} key={i}/>

                        case el.id.includes("video"):
                            return <WorkVideoBlock data={el} i={i} key={i}/>

                        default: 
                            return null;
                    }
                })}    
            </div>
        );
        
    } else {
        return (
            <>
                Add Layouts
            </>
        )
    }
}

const WorkContentBlock = ({data, i}) => {
    const {content, include_available_for_hire_cta, alignment, cta_url, cta_text, jumbo_text} = data;

    return (
        <div className={`work-block work-content-block ${alignment} ${jumbo_text === true ? 'jumbo-font' : ''}`}>
            {include_available_for_hire_cta && (
                <HireMe/>
            )}
            {content && (
                <div 
                    className={`content-block--content`}
                    dangerouslySetInnerHTML={{__html: content}}/>
            )}

            {cta_url && (
                <div className={`content-block--content content-block--cta`}>
                    <AAButton 
                        url={cta_url} 
                        title={cta_text} 
                        target="_blank"
                        rel="noreferrer"
                    />
                </div>
            )}
        </div>
    );
}

const WorkImagesBlock = ({data, i}) => {
    /*
     * - Caption: .alignment .content
     * - Images: .image.source_url
     */
    const {caption, images, include_available_for_hire_cta} = data;

    
    if(images.length) {
        return (
            <div className={`work-block work-content-images`}>
                {include_available_for_hire_cta && (
                    <HireMe/>
                )}
                <div className={`content-images-grid content-images--${images.length}`}>
                    {images.map((el, i) => (
                        <div className="work-content-images--image">
                            {el.make_as_window ? (
                                <div className="image-window">
                                    <div className="image-window--window">
                                        <div className="image-window--window-header">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        {el.is_video ? (
                                            <div>lol</div>
                                        ) : (
                                            <AAImage image={el.image}/>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {el.is_video ? (
                                        <div className={el.has_bg ? 'video-has-bg' : ''}>
                                            <video autoplay="autoplay" muted="muted" loop="loop">
                                                <source src={el.video.localFile.publicURL} type="video/mp4"></source>
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    ) : (
                                        <AAImage 
                                            image={el.image} 
                                            className={el.has_bg ? 'has-bg' : ''}
                                    />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {caption && (
                    <div 
                        className={`content-media--caption ${caption.alignment}`}
                        dangerouslySetInnerHTML={{__html: caption.content}}
                    />
                )}
            </div>
        );        
    } else {
        return (
            <>Add Images</>
        )
    }
}


const VideoContext = createContext(null);

const VideoWrapper = ({children}) => {
    const [modalLaunched, setModalLaunched] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState(null);

    const handleClose = () => { 
        setModalLaunched(false);
        setPlaying(false);
    }
    const handleShow = (youtube_url) => {
        if(youtubeUrl === null) {
            setYoutubeUrl(youtube_url);
        }

        setModalLaunched(true);
        setPlaying(true);
    }

    return (
        <VideoContext.Provider value={{modalLaunched, setModalLaunched, handleClose, handleShow, playing, setPlaying, youtubeUrl, setYoutubeUrl}}>
            {children}
        </VideoContext.Provider>
    );
}

const VideoModal = () => {
    const {modalLaunched, handleClose, playing, youtubeUrl} = useContext(VideoContext);

    return (
        <Modal 
            isActive={modalLaunched} 
            closeMenu={handleClose}
            classes={`video-modal`}>
            <header className="modal-card-head">
                <div onClick={handleClose} className="close-modal">
                    <Close/>
                </div>
            </header>
            <section className="modal-card-body">
                <ReactPlayer 
                    className="video-modal--video-player"
                    controls={true}
                    url={youtubeUrl}
                    playing={playing}

                />
            </section>
        </Modal>
    );
}

const WorkVideoBlock = ({data, i}) => {
    const {caption, include_available_for_hire_cta, video_preview, youtube_url} = data;
    const {handleShow} = useContext(VideoContext);

    return (
        <>
            <div className="work-block work-video-block">
                {include_available_for_hire_cta && (
                    <HireMe/>
                )}

                <div 
                    className="work-video-block--preview"
                    onClick={() => handleShow(youtube_url)}
                >
                    {video_preview && (
                        <img src={video_preview.localFile.publicURL} alt="Video Preview"/>
                    )}
                    <svg className="play-btn" x="0px" y="0px" width="408.221px" height="408.221px" viewBox="0 0 408.221 408.221" >
                        <path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11    C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012    c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"/>
                    </svg>
                </div>

                {caption && (
                    <div 
                        className={`content-media--caption ${caption.alignment}`}
                        dangerouslySetInnerHTML={{__html: caption.content}}
                    />
                )}                
            </div>
        </>
    );
}

const WorkFooterNav = () => {
    const { previous, next } = useContext(WorkSingleContext);

    return (
        <div className="columns work-footer-nav">
            {previous && (
                <div className="column left">
                    <AALink to={`/work/${previous.slug}`}>
                        <p>
                            <span className="arrow">
                                <svg 
                                    width="32" 
                                    height="32" 
                                    viewBox="0 0 32 32" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                                </svg>  
                                <svg 
                                    width="32" 
                                    height="32" 
                                    viewBox="0 0 32 32" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                                </svg>  
                            </span>
                            <span dangerouslySetInnerHTML={{__html: previous.title}} className="dashing-hover-line"/>
                        </p>
                    </AALink>
                </div>
            )}
            
            {next && (
                <div className="column right">
                    <AALink to={`/work/${next.slug}`}>
                        <p>
                            <span dangerouslySetInnerHTML={{__html: next.title}} className="dashing-hover-line"/>
                            <span className="arrow">
                                <svg 
                                    width="32" 
                                    height="32" 
                                    viewBox="0 0 32 32" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                                </svg>
                                <svg 
                                    width="32" 
                                    height="32" 
                                    viewBox="0 0 32 32" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                                </svg>  
                            </span>
                        </p>
                    </AALink>
                </div>
            )}
            
        </div>
    );


}