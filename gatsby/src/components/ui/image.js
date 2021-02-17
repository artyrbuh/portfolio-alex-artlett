import React from 'react';

const AAImage = ({image, hover}) => {
    return (
        <div className="aa-image">
            <img
                src={image.localFile.publicURL} 
            />
        </div>
    )
}

export default AAImage;