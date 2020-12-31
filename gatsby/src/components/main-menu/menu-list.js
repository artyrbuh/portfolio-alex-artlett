import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';
import {ThemeDataContext} from '../layout';


const MenuList = () => {
    return (
        <ThemeDataContext.Consumer>
            {themeData => {
                console.log('theme data :')
                console.log(themeData)
                return (<div>hey</div>)
            }}
        </ThemeDataContext.Consumer>
    )
}

export default MenuList;