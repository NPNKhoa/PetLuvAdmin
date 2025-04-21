import ApiService from './api.service';

class StatisticService {
  constructor() {
    this.api = new ApiService('http://localhost:5010/api/stats/');
  }

  // BOOKING STATS

  async getServicesBookedRatio(params) {
    const { startDate, endDate, month, year, serviceType = 'service' } = params;
    const query = new URLSearchParams({
      startDate: startDate ?? '',
      endDate: endDate ?? '',
      month: month ?? '',
      year: year ?? '',
      serviceType,
    }).toString();

    try {
      const response = await this.api.get(`bookings/services?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getBreedsBookedRatio(params) {
    const { startDate, endDate, month, year } = params;
    const query = new URLSearchParams({
      startDate: startDate ?? '',
      endDate: endDate ?? '',
      month: month ?? '',
      year: year ?? '',
    }).toString();

    try {
      const response = await this.api.get(`bookings/breeds?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRevenue(params) {
    const { startDate, endDate, month, year } = params;
    const query = new URLSearchParams({
      startDate: startDate ?? '',
      endDate: endDate ?? '',
      month: month ?? '',
      year: year ?? '',
    }).toString();

    try {
      const response = await this.api.get(`bookings/revenue?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getBreedRatio(params) {
    const { typeName = '' } = params;
    const query = new URLSearchParams({
      typeName: typeName,
    }).toString();

    try {
      const response = await this.api.get(
        `http://localhost:5040/api/stats/pet-breeds/?${query}`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new StatisticService();
