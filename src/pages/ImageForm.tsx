import React, { useState } from 'react';
import { uploadAction } from '../uploadAction';

const ImageForm = ({ handleNewImage }: any) => {
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(false);

    const handleImageUpload = (e: any) => {
        setImage(e.target.files[0]);
        setPreview(true);
    }

    const clearImage = () => {
        setPreview(false);
        setImage('');
    }

    const handleSubmit = () => {
        uploadAction(image);
        setPreview(false);
        setImage('');
        handleNewImage();
    }

    return (
        <div>
            <h1>ImageForm</h1>
            {preview ?
                <>
                    <button onClick={clearImage}>x</button>
                    <h5>Image Preview</h5>
                    <img 
                        src={ URL.createObjectURL(image) }
                        alt="preview of upload" 
                    />
                    <button onClick={handleSubmit}>Upload!</button>
                </> :
                <>
                    <input 
                        type="file" 
                        onChange={handleImageUpload}
                        accept="png jpg jpeg"
                    />
                </>
            }
        </div>
    )
}

export default ImageForm;