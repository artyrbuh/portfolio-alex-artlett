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
                                {el.object_slug !== "email" ? (
                                    <Link to={`${el.url}`} target="_blank">
                                        {el.title}
                                    </Link>
                                ) : (
                                    <a href={el.url}>{el.title}</a>
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