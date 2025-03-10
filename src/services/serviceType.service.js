import ApiService from './api.service';

class ServicesService {
  constructor() {
    this.api = new ApiService('http://localhost:5020/api/service-types/');
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
}

export default new ServicesService();
