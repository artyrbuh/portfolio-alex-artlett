import React from 'react';

const AAImage = ({image, hover}) => {
    return (
        <div className="aa-image">
            <img
                src={image.source_url} 
            />
        </div>
    )
}

export default AAImage;