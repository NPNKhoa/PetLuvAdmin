import ApiService from './api.service';

class ServicesService {
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

  async getById(serviceId) {
    try {
      const response = await this.api.get(`${serviceId}`);
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

  //   async deleteAsync(serviceId) {
  //     try {
  //       const response = await this.api.delete(`${serviceId}`);
  //       return response;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

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

export default new ServicesService();
