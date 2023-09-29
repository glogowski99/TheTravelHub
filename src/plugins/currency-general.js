import axios from 'axios';

const currency = axios.create({
    baseURL: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': '73843b6ab8msh7b5740722dabbbap157296jsnde3d81bb7556',
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
});

export default currency;
