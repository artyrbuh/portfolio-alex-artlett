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
                                <Link to={`${el.url}`} target="_blank">
                                    {el.title}
                                </Link>
                            ) : (
                                <a href={el.url}>{el.title}</a>
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