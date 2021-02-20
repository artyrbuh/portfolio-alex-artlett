import React from 'react';
import {Link} from 'gatsby';
import { textAsSpans } from '../../core/util/helpers';

const FooterMenu = ({menu}) => {
    return (
        <>
            {menu.length ? (
                <ul>
                    {
                        menu.map((el,i) => {
                            return (
                            <li key={i}>
                                {el.classes !== "Email" ? (
                                    <Link to={`${el.title}`} target="_blank" className="skew-hover">
                                        {textAsSpans(el.classes.toString())}
                                    </Link>
                                ) : (
                                    <a href={`mailto:${el.title}`} className="skew-hover">
                                        {textAsSpans(el.classes.toString())}
                                    </a>
                                )}
                            </li>
                        )})
                        
                    }
                </ul>
            ): (
                <>
                    Add menu items
                </>
            )}
        </>
    )
}

export default FooterMenu;