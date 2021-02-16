import React from 'react';
import {Link} from 'gatsby';
import { textAsSpans } from '../../core/util/helpers';

const FooterMenu = ({menu}) => {
    return (
        <>
            {menu.length ? (
                <ul>
                    {
                        menu.map((el,i) => (
                            <li key={i}>
                                {el.object_slug !== "email" ? (
                                    <Link to={`${el.url}`} target="_blank" className="skew-hover">
                                        {textAsSpans(el.title)}
                                    </Link>
                                ) : (
                                    <a href={el.url} className="skew-hover">
                                        {textAsSpans(el.title)}
                                    </a>
                                )}
                            </li>
                        ))
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