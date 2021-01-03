import React from 'react';
import {graphql, StaticQuery} from 'gatsby';
import MenuList from './menu-list';

const Menu = () => {
    return (
        
            <StaticQuery query={graphql`
            {
                allWordpressWpApiMenusMenusItems(filter: {name: {eq: "Main Menu"}}) {
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
            render={props => <MenuList props={props}/>}
            />
    )
}

export default Menu;