import React, {useContext} from "react"
import {ThemeDataContext} from '../layout';
import Menu from '../main-menu/menu';

const OffcanvasMenu = ({expanded}) => {
    const d = new Date();
    const themeData = useContext(ThemeDataContext);
    const name = themeData.wordpressAcfOptions.options.name;

    return (
        <div className={`offcanvas-menu ${expanded ? 'expanded' : ''}`}>
            <div className="container">
                <div className="columns is-vcentered is-flex">
                    <div className="column menu wrap--main-menu">
                        <div className="designation-col">
                            <div>
                                <p>{name} - {d.getFullYear()}</p>
                            </div>
                        </div>
                        <Menu/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OffcanvasMenu;