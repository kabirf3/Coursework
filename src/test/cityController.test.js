
// tests/cityController.test.js
const { listCities } = require('../controllers/cityController');
const City = require('../models/city');
const httpMocks = require('node-mocks-http');

jest.mock('../models/city', () => ({
    getAll: jest.fn().mockResolvedValue([[{ id: 1, name: 'Sample City' }], []])
}));

describe('City Controller - listCities', () => {
  it('should get all cities and render the view', async () => {
    // Arrange
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/cities'
    });
    const response = httpMocks.createResponse();
    City.getAll.mockResolvedValue([[{ Name: 'Oranjestad' }], []]);

    // Act
    await listCities(request, response);

    // Assert
    expect(City.getAll).toBeCalled();
    expect(response.statusCode).toBe(200);
    expect(response._getRenderView()).toBe('cities'); // Assumes your view is named 'cities'
    expect(response._getRenderData()).toStrictEqual({ cities: [{ Name: 'Oranjestad' }] });
  });

  it('should handle errors when retrieving cities', async () => {
    // Arrange
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/cities'
    });
    const response = httpMocks.createResponse();
    const errorMessage = { message: 'Error retrieving cities' };
    City.getAll.mockRejectedValue(errorMessage);

    // Act
    await listCities(request, response);

    // Assert
    expect(City.getAll).toBeCalled();
    expect(response.statusCode).toBe(500);
    expect(response._getData()).toBe('Error retrieving cities');
  });
});
