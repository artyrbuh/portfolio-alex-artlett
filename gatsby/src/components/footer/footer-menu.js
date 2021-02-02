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
                                    <Link to={`${el.url}`} target="_blank" className="flourish-hover skew-hover">
                                        {el.title}
                                        <span className="flourish-one aa-red--text">{el.title}</span>
                                    </Link>
                                ) : (
                                    <a href={el.url} className="flourish-hover skew-hover">
                                        {el.title}
                                        <span className="flourish-one aa-red--text">{el.title}</span>
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