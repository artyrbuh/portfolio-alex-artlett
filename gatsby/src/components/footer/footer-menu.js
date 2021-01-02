import React from 'react';
import {Link} from 'gatsby';

const FooterMenu = ({menu}) => {
    return (
        <>
            {menu.length ? (
                <ul>
                    {
                        menu.map((el,i) => (
                            <li key={i}>
                                <Link to={el.object_slug}>
                                    {el.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            ): (
                <>
                    nelson
                </>
            )}
        </>
    )
}

export default FooterMenu;