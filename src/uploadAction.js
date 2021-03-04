import axios from 'axios';
import { API_URL } from './url'

export const uploadAction = async (image) => {
    console.log('image.name: ', image.name);
    
    var fd = new FormData();
    fd.append('image', image);

    const config = {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    }

    try {
        const res = await axios.post(API_URL + 'api/avatars', fd, config);
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}