import ApiService from './api.service';

class PaymentService {
  constructor() {
    this.api = new ApiService('http://localhost:5080/api/payments/');
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

  async getById(id) {
    try {
      return await this.api.get(`${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateStatus(payload) {
    console.log(payload);
    try {
      return await this.api.put(
        `${payload?.id}/update-status`,
        payload?.payload
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new PaymentService();
