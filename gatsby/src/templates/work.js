import React from 'react';
import Layout from '../components/layout'

export default ({pageContext}) => {
    console.log(pageContext);
    return (
        <Layout>
            <div>
                <h1 dangerouslySetInnerHTML={{__html: pageContext.title}}/>
                <div dangerouslySetInnerHTML={{__html: pageContext.content}} />
            </div>
        </Layout>
    )
}