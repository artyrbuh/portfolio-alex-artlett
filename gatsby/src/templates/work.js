import React, {createContext, useContext, useState, useEffect, useRef} from 'react';
import {Link} from "gatsby";
import { WorkBarNav, WorkContainer, WorkLayout } from '../components/ui/work';
import AAImage from '../components/ui/image';
import fitty from "fitty";
import AAButton from '../components/ui/button';
import HireMe from '../components/ui/hire-me-cta';
import Modal from '../components/ui/modal';
import Close from '../components/ui/close';
import ReactPlayer from 'react-player';

const WorkSingleContext = createContext(null);

export default ({pageContext}) => {
    const {previous, next} = pageContext;
    const {acf, featured_media, slug, title} = pageContext.content;
    const {layouts_work, main_technology, professions, technologies, project_year, project_website} = acf;

    return (
        <WorkSingleContext.Provider value={{featured_media, slug, title, layouts_work, main_technology, professions, technologies, project_year, previous, next, project_website}}>
            <WorkLayout classes={`work-single work-single--${slug}`}>
                <WorkBarNav>
                    <Link to={`/work`} className="back-cta">
                        <svg 
                            width="32" 
                            height="32" 
                            viewBox="0 0 32 32" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                        </svg>  

                        <h4>Back to my Selected work</h4>
                    </Link>
                </WorkBarNav>
                <WorkContainer>
                    <WorkHeader/>
                    <WorkLayouts/>
                    <WorkFooterNav/>
                </WorkContainer>
            </WorkLayout>
        </WorkSingleContext.Provider>
    )
}

const WorkHeader = () =>  {
    const { title, featured_media, project_year, main_technology,professions, technologies, project_website } = useContext(WorkSingleContext);

    const containerRef = React.useRef();
    const elRef = React.useRef();

    React.useEffect(() => {
        fitty(elRef.current, {
          multiLine: false,
          minSize: 10
        });
      }, []);

    return (
        <div className="work-single--header" ref={containerRef}>
            <div className="featured-image-wrap">
                <h1 
                    ref={elRef}
                    dangerouslySetInnerHTML={{__html: title}}
                />
                {featured_media ? (
                    <img src={featured_media.source_url} className="featured-image"/>
                ) : (
                    <div className="featured-image"></div>
                )}
                
            </div>
                <a href={project_website} target="_blank">
                    <h4
                        dangerouslySetInnerHTML={{__html: `${title} ― ${project_year}`}}
                    />
                </a>
                <p className="project-meta">
                    <InlineList list={professions}/>
                    <br/>
                    <InlineList list={technologies}/> 
                </p>
            
        </div>
    )
};

const InlineList = ({list}) => (
    <>
        {list.map((el, i) => (
            <>
                {(i === (list.length - 1) && list.length > 1) && ' & '}
                {el}
                {i === (list.length - 1) || i === (list.length - 2) ? '' : ', '}
            </>
        ))} 
    </>
)

const WorkLayouts = () => {
    const { layouts_work } = useContext(WorkSingleContext);

    if(layouts_work && layouts_work.length) {
        return (
            <>
                {layouts_work.map((el, i) => {
                    switch(true) {
                        case el.id.includes("content_block"):
                            return <WorkContentBlock data={el} i={i} key={i}/>
                        
                        case el.id.includes("images_block"):
                            return <WorkImagesBlock data={el} i={i} key={i}/>

                        case el.id.includes("video"):
                            return <WorkVideoBlock data={el} i={i} key={i}/>
                    }
                })}    
            </>
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
    const {content, cta, heading, include_available_for_hire_cta, alignment} = data;

    return (
        <div className={`work-block work-content-block ${alignment}`}>
            {include_available_for_hire_cta && (
                <HireMe/>
            )}
            {content && (
                <div 
                    className={`content-block--content`}
                    dangerouslySetInnerHTML={{__html: content}}/>
            )}

            {cta && (
                <div className={`content-block--content content-block--cta`}>
                    <AAButton url={cta.url} title={cta.title} target={cta.target}/>
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
                            <AAImage image={el.image}/>
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

const WorkVideoBlock = ({data, i}) => {
    const [modalLaunched, setModalLaunched] = useState(false);
    const [playing, setPlaying] = useState(false);


    const handleClose = () => { 
        setModalLaunched(false);
        setPlaying(false);
    }
    const handleShow = () => {
        setModalLaunched(true);
        setPlaying(true);
    }

    const {caption, include_available_for_hire_cta, video_preview, youtube_url} = data;
    return (
        <>
            <div className="work-block work-video-block">
                {include_available_for_hire_cta && (
                    <HireMe/>
                )}

                <div 
                    className="work-video-block--preview"
                    onClick={handleShow}
                >
                    <img src={video_preview.source_url} />
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

            <Modal 
                isActive={modalLaunched} 
                closeMenu={handleClose}
                classes={`video-modal`}>
                <header className="modal-card-head">
                    <div 
                        onClick={handleClose} 
                        className="close-modal"
                    >
                        <Close/>
                    </div>
                </header>
                <section className="modal-card-body">
                    <ReactPlayer 
                        className="video-modal--video-player"
                        controls={true}
                        url={youtube_url}
                        playing={playing}

                    />
                </section>
            </Modal>
        </>
    );
}

const WorkFooterNav = ({}) => {
    const { previous, next } = useContext(WorkSingleContext);

    return (
        <div className="columns work-footer-nav">
            {next && (
                <div className="column left">
                    <Link to={`/work/${next.slug}`}>
                        <p>
                            <svg 
                                width="32" 
                                height="32" 
                                viewBox="0 0 32 32" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                            </svg>  
                            <span dangerouslySetInnerHTML={{__html: next.title}}/>
                        </p>
                    </Link>
                </div>
            )}
            
            {previous && (
                <div className="column right">
                    <Link to={`/work/${previous.slug}`}>
                        <p>
                            <span dangerouslySetInnerHTML={{__html: previous.title}}/>
                            <svg 
                                width="32" 
                                height="32" 
                                viewBox="0 0 32 32" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.7078 9.29202C11.801 9.38491 11.8748 9.49526 11.9253 9.61675C11.9757 9.73824 12.0016 9.86848 12.0016 10C12.0016 10.1316 11.9757 10.2618 11.9253 10.3833C11.8748 10.5048 11.801 10.6151 11.7078 10.708L6.41383 16L11.7078 21.292C11.8008 21.385 11.8746 21.4954 11.9249 21.6168C11.9752 21.7383 12.0011 21.8685 12.0011 22C12.0011 22.1315 11.9752 22.2617 11.9249 22.3832C11.8746 22.5047 11.8008 22.615 11.7078 22.708C11.6149 22.801 11.5045 22.8747 11.383 22.9251C11.2615 22.9754 11.1313 23.0013 10.9998 23.0013C10.8683 23.0013 10.7381 22.9754 10.6167 22.9251C10.4952 22.8747 10.3848 22.801 10.2918 22.708L4.29183 16.708C4.19871 16.6151 4.12482 16.5048 4.07441 16.3833C4.024 16.2618 3.99805 16.1316 3.99805 16C3.99805 15.8685 4.024 15.7382 4.07441 15.6167C4.12482 15.4953 4.19871 15.3849 4.29183 15.292L10.2918 9.29202C10.3847 9.19889 10.4951 9.125 10.6166 9.07459C10.7381 9.02418 10.8683 8.99823 10.9998 8.99823C11.1314 8.99823 11.2616 9.02418 11.3831 9.07459C11.5046 9.125 11.6149 9.19889 11.7078 9.29202Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16Z" fill="black"/>
                            </svg>  
                        </p>
                    </Link>
                </div>
            )}
            
        </div>
    );


}