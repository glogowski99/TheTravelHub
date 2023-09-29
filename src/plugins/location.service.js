import axios from 'axios';

const locationsAPI = axios.create({
    baseURL: 'https://restcountries.com/v3.1/',
});

export const location = async (name) => {
    try {
        const response = await locationsAPI.get(`name/${name}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default locationsAPI;
