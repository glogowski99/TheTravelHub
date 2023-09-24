import instance from './service-general';

class BookingService {
    searchHotels(params) {
        return instance.get('/hotels/search', { params });
    }

    searchLocations(name, locale) {
        return instance.get('/hotels/locations', {
            params: {
                name,
                locale
            }
        });
    }
}

export default new BookingService();
