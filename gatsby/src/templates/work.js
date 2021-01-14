import React, {createContext, useContext} from 'react';
import Layout from '../components/layout'
import { WorkBarNav, WorkContainer, WorkLayout } from '../components/ui/work';

const WorkSingleContext = createContext(null);

export default ({pageContext}) => {
    console.log(pageContext);
    const {acf, featured_media, slug, title} = pageContext;
    const {layouts_work, main_technology, professions, technologies} = acf;

    return (
        <WorkSingleContext.Provider value={{featured_media, slug, title, layouts_work, main_technology, professions, technologies}}>
            <WorkLayout>
                <WorkBarNav>
                    <h4>Back to my Selected work</h4>
                </WorkBarNav>
                <WorkContainer>
                    <WorkHeader/>
                </WorkContainer>
            </WorkLayout>
        </WorkSingleContext.Provider>
    )
}

const WorkHeader = () =>  {
    const { title, featured_media } = useContext(WorkSingleContext);
    return (
        <div className="work-single--header">
            <div className="">
                <h1 dangerouslySetInnerHTML={{__html: title}}/>
                <div className="featured-image"></div>
            </div>
        </div>
    )
};