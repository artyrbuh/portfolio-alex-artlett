import React, { useState, createContext } from "react"
import {ThemeDataContext} from '../layout';
import Menu from '../main-menu/menu';

const OffcanvasMenu = ({expanded}) => (
    <ThemeDataContext.Consumer>
        {themeData => {
            const title = themeData.site.siteMetadata.title;
            return (
                <div className={`offcanvas-menu ${expanded ? 'expanded' : ''}`}>
                    <div className="container">
                        <div className="columns is-vcentered is-flex">
                            <div className="column wrap--main-menu">
                                <div className="designation-col">
                                    <div>
                                        <p>{title}</p>
                                    </div>
                                </div>
                                <Menu/>
                            </div>
                        </div>
                    </div>
                </div>
            )  
        }}
    </ThemeDataContext.Consumer>
);

export default OffcanvasMenu;