import ApiService from './api.service';

class PaymentStatusService {
  constructor() {
    this.api = new ApiService('http://localhost:5080/api/payment-statuses/');
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

export default new PaymentStatusService();
