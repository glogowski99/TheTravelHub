import currency from './currency-general';

class CurrencyService {
    getSymbols() {
        return currency.get('symbols');
    }

    convertCurrency(from, to, amount) {
        return currency.get('convert', {
            params: {
                from,
                to,
                amount
            }
        });
    }
}

export default new CurrencyService();