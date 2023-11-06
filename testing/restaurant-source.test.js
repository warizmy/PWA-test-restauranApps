import RestaurantDB from '../src/scripts/data/restaurant-source';
import API_ENDPOINT from '../src/scripts/global/api-endpoints';

describe('RestaurantDB', () => {
  const mockFetch = (response, status = 200) => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
      status,
    });
  };

  const mockErrorFetch = (error) => {
    global.fetch = jest.fn().mockRejectedValue(error);
  };

  afterEach(() => {
    global.fetch.mockClear();
  });

  describe('listRestaurant', () => {
    it('fetches and returns a list of restaurants', async () => {
      // TODO: Replace this mockResponse with actual API response for better accuracy
      const mockResponse = {
        restaurants: [
          { id: 1, name: 'Restaurant 1' },
          { id: 2, name: 'Restaurant 2' },
        ],
      };

      mockFetch(mockResponse);

      const restaurants = await RestaurantDB.listRestaurant();

      expect(fetch).toHaveBeenCalledWith(API_ENDPOINT.LIST_RESTAURANT);
      expect(restaurants).toEqual(mockResponse.restaurants);
    });

    it('handles errors when fetching restaurant list', async () => {
      const errorMessage = 'Failed to fetch data';
      mockErrorFetch(new Error(errorMessage));

      await expect(RestaurantDB.listRestaurant()).rejects.toThrow(errorMessage);
    });
  });

  describe('detailRestaurant', () => {
    it('fetches and returns restaurant details by ID', async () => {
      // TODO: Replace this mockResponse with actual API response for better accuracy
      const restaurantId = 1;
      const mockResponse = { id: restaurantId, name: 'Restaurant 1' };

      mockFetch(mockResponse);

      const restaurant = await RestaurantDB.detailRestaurant(restaurantId);

      expect(fetch).toHaveBeenCalledWith(API_ENDPOINT.DETAIL(restaurantId));
      expect(restaurant).toEqual(mockResponse);
    });

    it('handles errors when fetching restaurant details', async () => {
      const restaurantId = 1;
      const errorMessage = 'Failed to fetch data';
      mockErrorFetch(new Error(errorMessage));

      await expect(RestaurantDB.detailRestaurant(restaurantId)).rejects.toThrow(errorMessage);
    });
  });
});
