import axios from 'axios';

const flights = axios.create({
    baseURL: 'https://tripadvisor16.p.rapidapi.com/api/v1/',
    headers: {
        'X-RapidAPI-Key': '73843b6ab8msh7b5740722dabbbap157296jsnde3d81bb7556',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
});

export default flights;
