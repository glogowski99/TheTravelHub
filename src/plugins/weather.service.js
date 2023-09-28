import axios from 'axios';

const weatherAPI = axios.create({
    baseURL: 'https://forecast9.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': '73843b6ab8msh7b5740722dabbbap157296jsnde3d81bb7556',
        'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
    }
});

export const fetchWeather = async (city) => {
    try {
        const response = await weatherAPI.get(`rapidapi/forecast/${city}/summary/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default weatherAPI;
