import React from 'react';
import {Link} from 'gatsby';
import { textAsSpans } from '../../core/util/helpers';

const ContactMenuList = ({menu, email}) => {
    return (
        <>
            {menu.length ? (
                <>
                    {menu.map((el, i) => (
                        <div 
                            className="column menu-item"
                            key={i}
                        >
                            {el.classes !== "Email" ? (
                                <Link to={`${el.title}`} target="_blank">
                                    {textAsSpans(el.classes.toString())}
                                </Link>
                            ) : (
                                <a href={`mailto:${el.title}`}>
                                    {textAsSpans(el.classes.toString())}
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