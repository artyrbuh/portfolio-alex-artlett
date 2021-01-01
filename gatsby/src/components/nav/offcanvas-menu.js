import React, { useState, createContext } from "react"
import {ThemeDataContext} from '../layout';
import Menu from '../main-menu/menu';

const OffcanvasMenu = ({expanded}) => (
    <ThemeDataContext.Consumer>
        {themeData => {
            console.log('expanded: ')
            console.log(expanded)
            return (
                <div className={`offcanvas-menu ${expanded ? 'expanded' : ''}`}>
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column">
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