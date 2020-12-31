import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';

const FooterMenu = () => {
    return (
        <StaticQuery query={graphql`
        {
            allWordpressWpApiMenusMenusItems(filter: {name: {eq: "Footer"}}) {
                edges {
                    node {
                        name
                        items {
                            classes
                            target
                            title
                            url
                            object_slug
                        }
                    }
                }
            }
        }
        `}
        render={props => {
            console.log('footer menu');
            console.log(props);
            return (
                <div></div>
            )
        }}
        />
    )
}

export default FooterMenu;