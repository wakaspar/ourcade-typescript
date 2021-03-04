import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../url';

const ImageContainer = ({ newImage }: any) => {
    const [images, setImages] = useState([]);
    const [fallback, setFallback] = useState('');
    
    const getImages = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/avatars');
            if ( !res.data.files ) {
                setFallback(res.data.msg);
                return;
            } else {
                setImages(res.data.files);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getImages();
    },[newImage]);

    const configureImage = (image: any) => {
        return API_URL + image;
    }

    console.log('ImageContainer images: ', images);

    return (
        <div>
            <h1>ImageContainer</h1>
            { images.length > 0 ?
            (
                
                images.map(image => (
                    <img 
                        className="image"
                        src={configureImage(image)} 
                        key={image}
                        alt={image}
                        width="200"
                        height="200"
                    />
                ))
            )
            :
            <>
                <h1>
                    { fallback }
                </h1>
                <hr/>
                <h3>Upload images in the form below</h3>
            </>
            }
        </div>
    )
}

export default ImageContainer;