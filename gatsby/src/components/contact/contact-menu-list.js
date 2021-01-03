import React from 'react';
import {Link} from 'gatsby';

const ContactMenuList = ({menu}) => {
    console.log('contact menu')
    console.log(menu);
    return (
        <>
            <a href="mailto:hello@alex.somc.as"></a>
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