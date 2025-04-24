import ApiService from './api.service';

class ServiceVariantService {
  constructor() {
    this.api = new ApiService('http://localhost:5020/api/service-variants/');
  }

  async getAll(params) {
    const { pageIndex = 1, pageSize = 10 } = params;
    const query = new URLSearchParams({ pageIndex, pageSize }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getByService(serviceId) {
    try {
      const response = await this.api.get(
        `/api/services/${serviceId}/service-variants`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createAsync(payload) {
    try {
      const response = await this.api.post(``, payload);
      return response;
    } catch (error) {
      console.error('Lỗi khi tạo dịch vụ:', error);
      throw error;
    }
  }

  async deleteAsync(payload) {
    const { serviceId, breedId, petWeightRange } = payload;
    try {
      return await this.api.delete(`${serviceId}/${breedId}/${petWeightRange}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAsync(payload) {
    const { serviceId, breedId, petWeightRange, body } = payload;

    try {
      const response = await this.api.put(
        `${serviceId}/${breedId}/${petWeightRange}`,
        body
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ServiceVariantService();
