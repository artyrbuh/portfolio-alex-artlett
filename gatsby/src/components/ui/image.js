import React from 'react';

const AAImage = ({image, hover, className}) => {
    return (
        <div 
            className="aa-image"
            {... className ? {className: className} : {}}
        >
            <img
                src={image.localFile.publicURL} 
            />
        </div>
    )
}

export default AAImage;