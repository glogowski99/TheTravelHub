import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://booking-com.p.rapidapi.com/v1/',
    headers: {
        'X-RapidAPI-Key': '73843b6ab8msh7b5740722dabbbap157296jsnde3d81bb7556',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
    }
});

export default instance;
