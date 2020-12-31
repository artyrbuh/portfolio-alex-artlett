import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';
import {UserStateContext} from '../layout';


const MenuList = () => {
    return (
        <UserStateContext.Consumer>
            {themeData => {
                console.log('theme data :')
                console.log(themeData)
                return (<div>hey</div>)
            }}
        </UserStateContext.Consumer>
    )
}

export default MenuList;