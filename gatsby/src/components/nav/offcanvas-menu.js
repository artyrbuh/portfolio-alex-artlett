import React, { useState, createContext } from "react"
import {ThemeDataContext} from '../layout';

const OffcanvasMenu = () => (
    <ThemeDataContext.Consumer>
        {themeData => {
            return (
                <div className={`offcanvas-menu`}>
                    off canvas menu
                </div>
            )  
        }}
    </ThemeDataContext.Consumer>
);

export default OffcanvasMenu;