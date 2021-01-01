import React, { useState, createContext } from "react"
import {ThemeDataContext} from '../layout';

const OffcanvasMenu = ({expanded}) => (
    <ThemeDataContext.Consumer>
        {themeData => {
            console.log('expanded: ')
            console.log(expanded)
            return (
                <div className={`offcanvas-menu ${expanded ? 'expanded' : ''}`}>
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                off canvas menu
                            </div>
                        </div>
                    </div>
                </div>
            )  
        }}
    </ThemeDataContext.Consumer>
);

export default OffcanvasMenu;