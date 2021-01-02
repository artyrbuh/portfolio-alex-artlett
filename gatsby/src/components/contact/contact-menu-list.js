import React from 'react';
import {Link} from 'gatsby';

const ContactMenuList = ({menu}) => {
    console.log('contact menu')
    console.log(menu);
    return (
        <>
            {menu.length ? (
                <>
                    {menu.map((el, i) => (
                        <div className="column menu-item">
                            <Link to={el.object_slug}>
                                {el.title}
                            </Link>
                        </div>
                    ))}
                </>
                ) : (
                <>
                    Add Contact Menu items
                </>
            )}
        </>
    );
}

export default ContactMenuList;