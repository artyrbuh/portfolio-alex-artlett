import React from 'react'

const ContentBlock = ({children, heading, content}) => {
    return (
        <div className="content-block">
            {heading && (
                <div className="content-block--header">
                    <p>{heading}</p>
                </div>
            )}
            {children || content && (
                <div className="content-block--content">
                    {content && (
                        <div dangerouslySetInnerHTML={{__html: content}} />
                    )}

                    {children && (
                        <>
                            {children}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default ContentBlock;