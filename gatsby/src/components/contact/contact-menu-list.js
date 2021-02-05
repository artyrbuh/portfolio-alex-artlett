import React from 'react';
import {Link} from 'gatsby';

const ContactMenuList = ({menu}) => {
    return (
        <>
            {menu.length ? (
                <>
                    {menu.map((el, i) => (
                        <div 
                            className="column menu-item"
                            key={i}
                        >
                            {el.object_slug !== "email" ? (
                                <Link to={`${el.url}`} target="_blank" className="flourish-hover">
                                    {el.title}
                                    <span className="flourish-one aa-red--text">{el.title}</span>
                                </Link>
                            ) : (
                                <a href={el.url} className="flourish-hover">
                                    {el.title}
                                    <span className="flourish-one aa-red--text">{el.title}</span>
                                </a>
                            )}
                        </div>
                    ))}
                </>
                ) : (
                    <>
                        Add Contact Menu items
                    </>
                )
            }
        </>
    );
}

export default ContactMenuList;