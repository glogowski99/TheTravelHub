// FlightService.js
import flights from './flights-general';

class FlightService {
    searchAirport(query) {
        return flights.get('flights/searchAirport', { params: { query } });
    }

    searchFlights(params) {
        return flights.get('flights/searchFlights', { params });
    }
}

export default new FlightService();
